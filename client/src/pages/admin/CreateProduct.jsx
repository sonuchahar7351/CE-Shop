import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const { Option } = Select;

const CreateProduct = () => {
  const [category, setCategory] = useState([]);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [descripion, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [singleCategory, setSingleCategory] = useState("");
  const navigate = useNavigate();

  // get all categoy
  const getAllCTG = async () => {
    try {
      const { data } = await axios.get(
       `${import.meta.env.VITE_APP_API}/api/v1/category/get-category`
      );
      if (data.success) {
        setCategory(data?.category);
      }
    } catch (error) {
      console.log("frontend", error);
    }
  };
  useEffect(() => {
    getAllCTG();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", descripion);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", singleCategory);
      const { data } = await axios.post(`${import.meta.env.VITE_APP_API}/api/v1/product/create-product`,productData);
      if (data.success) {
        alert("created")
         toast.success("Product created successfully");

        setName("");
        setCategory("");
        setDescription("");
        setPhoto("");
        setQuantity("");
        setPrice("");

        navigate("/dashboard/admin/products");

      } else {
       toast.error("error while creating product")
      }
    } catch (error) {
      console.log("Something went wront", error);
    }
  };

  return (
    <Layout title={"Dashboard - create product"}>
      <div className="grid grid-cols-custom gap-4 p-3">
        <div>
          <AdminMenu />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Create Product</h2>
          <div className="mt-2 w-[50%]">
            <Select
              variant={false}
              placeholder="select a category"
              size="Large"
              showSearch
              className="w-full bg-gray-200 rounded-md h-10 font-extrabold"
              onChange={(value) => {
                setSingleCategory(value);
              }}
            >
              {category.map((c) => (
                <Option key={c._id} value={c.name} className=" mb-1 border-b  ">
                  {c.name}
                </Option>
              ))}
            </Select>
            <div className="mt-3">
              <label className="outline-none border-none py-2 px-3 text-white bg-blue-700 font-semibold rounded-md cursor-pointer">
                {photo ? photo.name : "Upload Photo"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  hidden
                />
              </label>
            </div>
            <div className="mt-2">
              {photo && (
                <div className="text-center">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="product photo "
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
              {/* <input
                type="text"
                value={descripion}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write a description"
                className="w-full rounded-md outline-none border-none bg-gray-200 font-semibold  py2- px-2"
              /> */}
              <textarea name="description" id="description"
              className="bg-gray-100 shadow-md outline-none p-2 text-lg"
              rows={5}
              cols={56}
              placeholder="tell us more about product or description"
              value={descripion}
              onChange={(e)=>setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="mt-2 w-[100%]">
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="enter Price value"
                className="w-full rounded-md outline-none border-none bg-gray-200 font-semibold  py-2 px-2"
              />
            </div>
            <div className="mt-2 w-[100%]">
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="enter quantity of product"
                className="w-full rounded-md outline-none border-none bg-gray-200 font-semibold  py-2 px-2"
              />
            </div>
            <div className="mt-2 w-[100%]">
              <Select
                variant={false}
                placeholder="Shipping Charge"
                size="Large"
                showSearch
                value={shipping || "0"}
                onChange={(value) => setShipping(value)}
                className="w-full rounded-md outline-none border-none bg-gray-200 font-semibold"
              >
                <Option value="0" className="font-semibold">
                  No Charge
                </Option>
                <Option value="1" className="font-semibold">
                  Charge
                </Option>
              </Select>
            </div>
            <div className="mt-2">
              <button
                className="py-2 px-2 rounded-md border-none outline-none bg-blue-800 font-semibold text-lg text-white"
                onClick={handleCreate}
              >
                Create Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;