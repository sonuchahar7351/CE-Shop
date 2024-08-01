import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { GiTargetPoster } from "react-icons/gi";
import { FaSleigh } from "react-icons/fa6";
import Loader from "../../components/Loader";

const { Option } = Select;

const UpdateProduct = () => {
  const [category, setCategory] = useState([]);
  const [photo, setPhoto] = useState(null); // Initialize as null
  const [existingPhoto, setExistingPhoto] = useState(""); // State to store existing photo URL
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [singleCategory, setSingleCategory] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const [id, setId] = useState("");
  const [loading,setLoading]=useState(false);
  // Get all categories
  const getAllCTG = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`${import.meta.env.VITE_APP_API}/api/v1/category/get-category`);
      if (data.success) {
        setCategory(data?.category);
        setLoading(false)
      }
    } catch (error) {
      console.log("frontend", error);
      setLoading(false)
    }
  };

  // Get single product
  const getSingleProduct = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`${import.meta.env.VITE_APP_API}/api/v1/product/get-product/${params.slug}`);
      setId(data.product._id);
      setName(data.product.name);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setSingleCategory(data.product.category.name);
      setExistingPhoto(data.product.photo); // Store the URL for initial display
      setLoading(false)
    } catch (error) {
      console.log(error, "single product");
      setLoading(false)
    }
  };

  useEffect(() => {
    getSingleProduct();
    getAllCTG();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("category", singleCategory);
      productData.append("shipping", shipping);

      if (photo) {
        productData.append("photo", photo); // Append the new photo file if selected
      } else {
        productData.append("photo", existingPhoto); // Append the existing photo URL if no new photo is selected
      }
        setLoading(true)
      const { data } = await axios.put(`${import.meta.env.VITE_APP_API}/api/v1/product/update-product/${id}`, productData);
      if (data.success) {
        setLoading(false)
        toast.success("updated successfully");
        
        // Reset state after successful update
        setName("");
        setSingleCategory("");
        setDescription("");
        setPhoto(null);
        setExistingPhoto("");
        setQuantity("");
        setPrice("");
        // Optionally navigate to another page
        navigate("/dashboard/admin/products");
      } else {
        setLoading(false)
        toast.error("error while updating")
       
      }
    } catch (error) {
      toast.error("something went wrong")
      setLoading(false)
    }
  };
  const handleDelete=async()=>{
        try {
          let asnwer = window.prompt("Are you sure to delete this product ? ");
          if(!asnwer) return
          setLoading(true)
          const {data}=await axios.delete(`${import.meta.env.VITE_APP_API}/api/v1/product/delete-product/${id}`)
          setLoading(false)
            toast.success("Deleted succussfully");
            navigate('/dashboard/admin/products')
        } catch (error) {
           console.log(error);
           toast.error("something went wrong")
           setLoading(false)
        }
  }

  return (
    <Layout title={"Dashboard - Update Product"}>
      <div className="grid grid-cols-custom gap-3 p-3">
        <div>
          <AdminMenu />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Update Product</h2>
          {loading && <Loader/>}
          <div className="mt-2 w-[60%]">
            <Select
              placeholder="Select a category"
              size="large"
              showSearch
              className="w-full bg-gray-200 rounded-md h-10 font-extrabold"
              onChange={(value) => setSingleCategory(value)}
              value={singleCategory}
            >
              {category.map((c) => (
                <Option key={c._id} value={c.name} className="mb-1 border-b">
                  {c.name}
                </Option>
              ))}
            </Select>
            <div className="mt-3">
              <label className="outline-none border-none py-2 px-3 text-white bg-blue-700 font-semibold rounded-md cursor-pointer">
                {"Change Photo"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])} // Store the file directly
                  hidden
                />
              </label>
            </div>
            <div className="mt-2">
              {photo ? (
                <div className="text-center">
                  <img
                    src={URL.createObjectURL(photo)} // Use createObjectURL for preview
                    alt="product"
                    height={"100px"}
                    width={"100px"}
                  />
                </div>
              ) : (
                <div className="text-center">
                  <img
                    src={existingPhoto} // Show the existing photo URL if no new photo is selected
                    alt="product"
                    height={"100px"}
                    width={"100px"}
                  />
                </div>
              )}
            </div>
            <div className="mt-3 w-[100%]">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Product Name"
                className="w-full rounded-md outline-none border-none bg-gray-200 font-semibold py-2 px-2"
              />
            </div>
            <div className="mt-2 w-[100%]">
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write a description"
                className="w-full rounded-md outline-none border-none bg-gray-200 font-semibold py-2 px-2"
              />
            </div>
            <div className="mt-2 w-[100%]">
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter Price value"
                className="w-full rounded-md outline-none border-none bg-gray-200 font-semibold py-2 px-2"
              />
            </div>
            <div className="mt-2 w-[100%]">
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Enter quantity of product"
                className="w-full rounded-md outline-none border-none bg-gray-200 font-semibold py-2 px-2"
              />
            </div>
            <div className="mt-2 w-[100%]">
              <Select
                placeholder="Shipping Charge"
                size="large"
                showSearch
                value={shipping ? "yes" : "no"}
                onChange={(value) => setShipping(value)}
                className="w-full rounded-md outline-none border-none bg-gray-200 font-semibold"
              >
                <Option value="0" className="font-semibold">No</Option>
                <Option value="1" className="font-semibold">Yes</Option>
              </Select>
            </div>
            <div className="mt-2">
              <button
                className="py-2 px-2 rounded-md border-none outline-none bg-blue-800 font-semibold text-lg text-white"
                onClick={handleUpdate}
              >
                Update Product
              </button>
              
            </div>
            <div className="mt-2">
            <button
                className="py-2 px-2 rounded-md border-none outline-none bg-red-800 font-semibold text-lg text-white"
                onClick={handleDelete}
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
