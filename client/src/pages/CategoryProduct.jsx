import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const CategoryProduct = () => {

  const [products,setProducts]=useState([]);
  const [category,setCategory]=useState([]);
  const navigate=useNavigate();
  const params = useParams()

  useEffect(()=>{
    if(params?.slug)getProductByCTG();
  },[])
  const getProductByCTG = async()=>{
    try {
      const {data}=await axios.get(`${import.meta.env.VITE_APP_API}/api/v1/product/product-category/${params.slug}`)
      setProducts(data?.products)
      setCategory(data?.category)
 
    } catch (error) {
      
    }
  }
  return (
    <Layout className='mt-3'>
       <h3 className='text-center text-lg'>
          Category - {category?.name}
       </h3>
       <h3 className='text-center text-sm mt-3'>
        {products?.length} product Found
       </h3>
       <div className="flex flex-wrap mt-5 gap-4 px-5 justify-start w-full">
           
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
                 <div className="font-bold text-lg mb-2">{p.name}</div>
                 <p className="text-gray-700 text-base w-full overflow-hidden">
                   {p.description.substring(0, 25)}...
                 </p>
                 <p className="text-gray-700 text-base mt-2">${p.price}</p>
                 <button className="border-none outline-none px-2 py-1 bg-blue-800 font-semibold text-white rounded mr-2"
                 onClick={()=>navigate(`/product-Detail/${p.slug}`)}>
                   More Details
                 </button>
                 <button className="border-none outline-none px-2 py-1 bg-lime-500 font-semibold text-white rounded">
                   Add to cart
                 </button>
               </div>
             </div>
           ))}
         </div>
        
    </Layout>
  )
}

export default CategoryProduct