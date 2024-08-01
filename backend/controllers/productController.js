import slugify from "slugify";
import { deleteImageFromCloudinary, getImage, uploadCloudinary } from "../helpers/cloudinary.js";
import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";
import orderModel from "../models/orderModel.js"
import braintree from "braintree";
import dotenv from 'dotenv'

dotenv.config();

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox, 
  merchantId: process.env.BRAINTREE_MERCHANT_ID ,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY ,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY ,
});





export const createProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity } = req.body;
    if (
      [name, description, price, category, quantity].some((field) => !field?.trim())
    ) {

      return res.status(400).send({ success: false, message: 'All fields are required' });
    }

    // const prdcatagory= await categoryModel.findOne({name:category})
    // if(!prdcatagory){
    //   res.status(400).send({success:false,message:'category is not matched'})
    // }

    const prdCategory = await categoryModel.findOne({ name: category });
    if (!prdCategory) {
      return res.status(400).send({ success: false, message: 'Category does not exist' });
    }

    // Validate photo
    const filePath = req.files?.photo?.[0];
    if (!filePath) {
      return res.status(400).send({ success: false, message: 'Product photo is required' });
    }

    // Upload photo to Cloudinary
    const photo = await uploadCloudinary(filePath.path);

    if (!photo) {
      return res.status(500).send({ success: false, message: 'Error uploading photo' });
    }

    // Create new product
    const product = await productModel.create({
      name,
      description,
      slug: slugify(name),
      price,
      quantity,
      category: prdCategory._id,
      photo: photo.url,
    });

    return res.status(201).send({ message: 'Product created successfully', success: true, product });


  } catch (error) {
    console.error(error);

    return res.status(500).send({ success: false, message: 'Error creating product', error });

  }
};

export const getProductController = async (req, res) => {
  try {

    const products = await productModel.find({})
      .populate("category")
      // .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 })

    res.status(200).send({ success: true, total: products.length, message: 'all products', products })

  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "error while getting product", error })
  }
}

//single product fetch
export const getOneProductController = async (req, res) => {
  try {
    const product = await productModel.findOne({ slug: req.params.slug })
      // .select("-photo")
      .populate("category")

    res.status(200).send({ success: true, message: 'single product fetch successfully', product })
  } catch (error) {
    console.log(error)
    res.status(500).send({ success: false, message: 'error single product' })
  }
}


export const productPhotoController = async (req, res) => {
  try {

    const product = req.params.pid;
    const data = await productModel.findById(product);

    const imageUrl = getImage(data.photo);

    res.status(200).send({ imageUrl });

  } catch (error) {
    console.log(error)
    res.status(500).send({ success: false, message: "product photo error", error })
  }
}


export const productDeleteController = async (req, res) => {
  try {
    const data = await productModel.findById(req.params.pid);
    await deleteImageFromCloudinary(data.photo);
    await productModel.deleteOne(data);
    res.status(200).send({ success: true, message: "product deleted successfully" });

  } catch (error) {
    console.log(error, "delete product error ");
    res.status(500).send({ success: false, message: 'error while deleting' })
  }
}


export const updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity } = req.body;
    if (
      [name, description, price, category, quantity].some((field) => !field?.trim())
    ) {
      return res.status(400).send({ success: false, message: 'All fields are required' });
    }

    const prdCategory = await categoryModel.findOne({ name: category });
    if (!prdCategory) {
      return res.status(400).send({ success: false, message: 'Category does not exist' });
    }

    // Check if a new photo is uploaded
    let photoUrl = null;
    const filePath = req.files?.photo?.[0];

    if (filePath) {
      // Upload new photo to Cloudinary
      const photo = await uploadCloudinary(filePath.path);
      if (!photo) {
        return res.status(500).send({ success: false, message: 'Error uploading photo' });
      }
      photoUrl = photo.url;
    }

    // Update product
    const updateData = {
      name,
      description,
      slug: slugify(name),
      price,
      quantity,
      category: prdCategory._id,
    };

    if (photoUrl) {
      updateData.photo = photoUrl;
    }

    const product = await productModel.findByIdAndUpdate(req.params.pid, updateData, { new: true });

    return res.status(201).send({ message: 'Product updated successfully', success: true, product });

  } catch (error) {
    console.error(error);
    return res.status(500).send({ success: false, message: 'Error updating product', error });
  }
};


export const productFilterController = async (req, res) => {
  try {
    const { checked, radio } = req.body
    let args = {}
    if (checked.length > 0) args.category = checked
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] }

    const products = await productModel.find(args)
    res.status(200).send({ success: true, products });

  } catch (error) {
    console.log(error, "fileter")
    res.status(500).send({ success: false, messsage: "error while filtering", error })
  }
}


export const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount()
    res.status(200).send({ success: true, total })

  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "error in product count", error })
  }
}


export const productListController = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel.find({}).skip((page - 1) * perPage).limit(perPage).sort({ createdAt: -1 })
    res.status(200).send({ success: true, products })
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "error in per page ctrl", error })
  }
}


export const searchController = async (req, res) => {
  try {

    const { keyword } = req.params
    const result = await productModel.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } }
      ]
    })
    res.status(200).send({ succuss: true, message: "search product", result });

  } catch (error) {
    res.status(500).send({ success: false, message: 'error in search product api', error })
  }
}


export const reletedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params
    const products = await productModel.find({
      category: cid,
      _id: { $ne: pid }
    }).limit(3).populate('category');
    res.status(200).send({ success: true, message: "similar products", products })

  } catch (error) {
    res.status(500).send({ success: false, message: "error in releted api", error })
  }
}



export const productCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug })
    const products = await productModel.find({ category }).populate('category')

    res.status(200).send({ success: true, message: "succuss category wise product", category, products })
  } catch (error) {
    res.status(500).send({ success: false, message: 'error category wise product', error })
  }

}


// payment gayway api 

export const braintreeTokenController = async (req, res) => {
  try {
    const response = await gateway.clientToken.generate({});
    res.send({ clientToken: response.clientToken });
  } catch (error) {
    res.status(500).send(error);
  }
};

//payment 
export const braintreePaymentController = async (req, res) => {

  const { nonce, cart } = req.body;
  let totalAmount = cart.reduce((total, item) => total + item.price, 0);

  try {
    const saleRequest = {
      amount: totalAmount,
      paymentMethodNonce: nonce,
      options: {
        submitForSettlement: true,
      },
    };

    const result = await gateway.transaction.sale(saleRequest);

    if (result.success) {
        const order = new orderModel({
        products: cart,
        payment: result,
        buyer: req.user._id,
      });
      await order.save();
      res.json({ success: true, transaction: result.transaction });
    } else {
      res.status(500).send({ success: false, message: result.message });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: 'Error processing payment', error });
  }
};
