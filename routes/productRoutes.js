import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { braintreePaymentController, braintreeTokenController, createProductController, getOneProductController, getProductController, productCategoryController, productCountController, productDeleteController, productFilterController, productListController, productPhotoController, reletedProductController, searchController, updateProductController } from '../controllers/productController.js';
import upload from '../middlewares/multer.js';
import braintree from 'braintree';




const router = express.Router();
// create product ***********************************************************************************

router.post('/create-product',requireSignIn,isAdmin,upload.fields([{name:'photo',maxCount:1}]),createProductController);


// update product ************************************************************************************

router.put('/update-product/:pid',requireSignIn,isAdmin,upload.fields([{name:'photo'}]),updateProductController);

// product get ***************************************************************************************
router.get('/get-product',getProductController);

// single product get ********************************************************************************
router.get('/get-product/:slug',getOneProductController);

// get photo *****************************************************************************************
router.get('/product-photo/:pid',productPhotoController)

// delete product ************************************************************************************
router.delete('/delete-product/:pid',requireSignIn,productDeleteController)

//filter product 
router.post('/product-filters',productFilterController)

//product counter 
router.get('/product-count',productCountController)

//product per pageBreakAfter: 
router.get('/product-list/:page',productListController)

//search productModel
router.get('/search/:keyword',searchController);

//similar Products
router.get('/releted-product/:pid/:cid',reletedProductController)

//categories wise Products 
router.get('/product-category/:slug',productCategoryController)


//payment routes 
router.get('/braintree/token',braintreeTokenController)

//payment
router.post('/braintree/payment',requireSignIn,braintreePaymentController)

export default router;