import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading,setLoading]=useState(false)

  const getAllProducts = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_API}/api/v1/product/get-product`
      );
      setLoading(false)
      setProducts(data.products);
    } catch (error) {
      console.log(error, "product error");
      setLoading(false)
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout>
      <div className="grid grid-cols-custom gap-2 p-6">
        <div>
          <AdminMenu />
        </div>
        {loading && <Loader/>}
        <div className="w-full flex flex-col md:justify-center">
          <h3 className="text-center font-bold text-2xl">Products list</h3>
          <div className="flex flex-wrap justify-between mt-3 gap-3">
            {products.map((p) => (
              <Link to={`/dashboard/admin/product/${p.slug}`} key={p._id}>
                <div className="md:max-w-60 rounded overflow-hidden shadow-lg sm:w-[100%] flex items-center flex-col">
                <div className="w-full h-56 ">
                <img
                  className="w-full content-center"
                  src={p.photo}
                  alt="Product Image"
                    //   width={'300px'}
                    //  height={'200px'}
                />
                </div>
                  <div className="px-2 py-4">
                    <div className="font-bold text-lg mb-2">{p.name}</div>
                    <p className="text-gray-700 text-base w-full overflow-hidden">
                     {p.description.substring(0,25)}...
                    </p>
                    <p className="text-gray-700 text-base mt-2">${p.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
