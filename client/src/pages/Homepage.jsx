import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { Checkbox, Radio } from "antd";
import axios from "axios";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { useCart } from "../context/Cart";
import toast from "react-hot-toast";
const Homepage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [catLoading, setCatLoading] = useState(false);
  const navigate = useNavigate();
  const [cart, setCart] = useCart();

  //get produts
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_APP_API}/api/v1/product/product-list/${page}`);
    console.log(data)
      const uniqueProducts = await data.products?.filter(
        (product, index, self) =>
          index === self.findIndex((p) => p._id === product._id)
      );

       setProducts((prevProducts) => [
        ...prevProducts,
        ...uniqueProducts.filter(
          (product) => !prevProducts.some((p) => p._id === product._id)
        ),
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilter = (value, id) => {
    let all = value ? [...checked, id] : checked.filter((c) => c !== id);
    setChecked(all);
  };

  const getAllCTG = async () => {
    try {
      const { data } = await axios.get(
       `${import.meta.env.VITE_APP_API}/api/v1/category/get-category`
      );

      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log("frontend", error);
    }
  };

  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_API}/api/v1/product/product-filters`,
        {
          checked,
          radio,
        }
      );

      setProducts(data?.products || []);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCTG();
  }, []);

  useEffect(() => {
    getTotal();
  }, []);

  useEffect(() => {
    if (!checked.length && !radio.length) {
      getAllProducts();
    } else {
      filterProduct();
    }
  }, [checked, radio]);

  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_API}/api/v1/product/product-count`
      );

      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  const loadMore = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_API}/api/v1/product/product-list/${page}`
      );

      const uniqueProducts = data.products.filter(
        (product, index, self) =>
          index === self.findIndex((p) => p._id === product._id)
      );

      setProducts((prevProducts) => [
        ...prevProducts,
        ...uniqueProducts.filter(
          (product) => !prevProducts.some((p) => p._id === product._id)
        ),
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page > 1) loadMore();
  }, [page]);

  const resetFilters = () => {
    setChecked([]);
    setRadio([]);
    setPage(1);
    setProducts([]); // Clear products to fetch all again
    getAllProducts(); // Fetch all products again
  };

  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item._id);
    if (existingProduct) {
      const updatedCart = cart.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      const newProduct = { ...product, quantity: 1 };
      const updatedCart = [...cart, newProduct];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
    toast.success("item added to cart");
  };

  return (
    <Layout title="All Products-best offers">
      {/* banner image */}
      <img
        src="/images/banner.png"
        className="mt-6 mb-4"
        alt="bannerimage"
        width={"100%"}
      />
      <div className="grid grid-cols-home gap-1 p-2 mt-2">
        <div >
          <div className="h-[78vh] overflow-y-scroll">
            <h4 className="text-center font-bold text-2xl mb-2 bg-gray-200">
              Filter By category
            </h4>
            {catLoading && <Loader />}
            <div className="flex flex-col px-8 gap-3">
              {categories.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                  checked={checked.includes(c._id)}
                >
                  {c.name}
                </Checkbox>
              ))}
            </div>
            <h4 className="text-center font-bold text-2xl mt-2 bg-gray-200">
              Filter By Price
            </h4>
            <div className="flex flex-col px-8 gap-3">
              <Radio.Group
                onChange={(e) => setRadio(e.target.value)}
                value={radio}
              >
                {Prices?.map((p) => (
                  <div key={p._id} className="text-lg p-1">
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
          </div>
          <div>
            <button
              className="bg-black border-none outline-none px-2 py-2 rounded font-medium text-xl mt-3 text-white w-full"
              onClick={() => resetFilters()}
            >
              Reset Filter
            </button>
          </div>
        </div>
        <div>
          <h4 className="text-center font-bold text-2xl border-b-pink-200">
            All Products
          </h4>
          {loading && <Loader />}
          <div className="flex flex-wrap mt-5 gap-4 px-2 justify-start w-full">
            {products.map((p) => (
              <div
                className="md:max-w-60 rounded overflow-hidden shadow-lg sm:w-[100%] flex items-center flex-col"
                key={p._id}
              >
                <div className="w-full h-56 ">
                  <img
                    className="w-full content-center"
                    src={p.photo}
                    alt="Product Image"
                    //   width={'300px'}
                    //  height={'200px'}
                  />
                </div>

                <div className="px-2 py-5">
                <div className="">
                  <p className=" text-green-600 font-medium">${p.price}</p>
                  <div className="font-bold text-lg">{p.name}</div>
                  <p className="text-gray-700 text-base w-full overflow-hidden">
                    {p.description.substring(0, 25)}...
                  </p>
                  </div>
                  <button
                    className="border-none outline-none px-2 py-1 bg-green-500 font-semibold text-white rounded mr-2"
                    onClick={() => navigate(`/product-Detail/${p.slug}`)}
                  >
                    More Details
                  </button>
                  <button
                    className="border-none outline-none px-2 py-1 bg-gray-700 font-semibold text-white rounded"
                    onClick={() => addToCart(p)}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="px-3 mt-2">
            {" "}
            {products.length < total && (
              <button
                className="border-none outline-none px-2 py-1 rounded bg-yellow-600 font-semibold"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading..." : "Load More"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Homepage;
