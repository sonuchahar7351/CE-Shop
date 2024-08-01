import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from '../components/Loader'

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [releted, setReleted] = useState([]);
  const [loading,setLoading]=useState(false)
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params.slug]);

  const getProduct = async () => {
    try { 
        setLoading(true)
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_API}/api/v1/product/get-product/${params.slug}`
      )
      await setProduct(data?.product);
        setLoading(false)
      getSimilarProduct(data?.product._id,data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

   const getSimilarProduct=async(pid,cid)=>{
           try {
              const {data}=await axios(`${import.meta.env.VITE_APP_API}/api/v1/product/releted-product/${pid}/${cid}`)
              setReleted(data?.products);
           } catch (error) {
              console.log(error)
           }
   }

  return (
    <Layout>
      {loading && <Loader/> }
      <div className="grid grid-cols-product grid-rows-1 p-10 gap-1">
        <div className="w-full mt-3">
          <img
            src={product.photo}
            alt={product.slug}
            // width={'100%'}
            // // width={400}
             height={500}
          />
        </div>
        <div className="">
          <h3 className="text-center font-semibold text-4xl">
            Product Details
          </h3>
          <h4 className="mt-4 font-semibold text-xl">Name: {product.slug}</h4>
          <h4 className="mt-2">Descripton: {product.description}</h4>
          <h4 className="mt-2" >price: {product.price}</h4>
          <h4>Category : {product.category?.name}</h4>
         
          <div className="mt-2">
            <button className="border-none outline-none rounded bg-gray-700 text-white font-semibold py-1 px-2">
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
      <hr />
      <div className="px-10 mt-2">
        <h3 className="text-center font-semibold text-2xl my-2">Similar Products</h3>
        {releted.length < 1  && (<p>No similar products</p>)}
        <div className="flex flex-wrap mt-4 mb-3 gap-4 px-2 justify-start w-full">
            {releted?.map((p) => (
              <div
                className="md:max-w-60 rounded overflow-hidden shadow-lg sm:w-[100%] flex items-center flex-col"
                key={p._id}
              >
                <img
                  className="w-full content-center"
                  src={p.photo}
                  alt="Product Image"
                      width={'300px'}
                     height={'200px'}
                />
                <div className="px-2 py-2">
                  <div className="font-bold text-lg mb-2">{p.name}</div>
                  <p className="text-gray-700 text-base w-full overflow-hidden">
                    {p.description.substring(0, 25)}...
                  </p>
                  <p className="text-gray-700 text-base mt-2">${p.price}</p>
                  {/* <button className="border-none outline-none px-2 py-1 bg-blue-800 font-semibold text-white rounded mr-2"
                  // onClick={()=>navigate(`/product-Detail/${p.slug}`)}
                  >
                    More Details
                  </button> */}
                  <button className="mx-auto block border-none outline-none px-2 py-1 bg-lime-500 font-semibold text-white rounded">
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
