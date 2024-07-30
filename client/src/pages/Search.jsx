import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/Search";
import Loader from '../components/Loader'

const Search = () => {
  const [value, setValue] = useSearch();
  const [loading,setLoading]=useState(true);
   setTimeout(()=>{
      setLoading(false)
   },2000)
  return (
    <Layout title={"Search results"}>
      {loading && <Loader/>}
      <div>
        <div>
          <h3 className="text-2xl font-semibold text-center">Search Result</h3>
          <h5 className="text-lg text-center mt-2">
            {value?.result.length < 1
              ? "no product found"
              : `Found ${value?.result.length}`}
          </h5>
          <div className="flex flex-wrap mt-5 gap-4 px-2 justify-start w-full">
            {value.result.map((p) => (
              <div
                className="md:max-w-60 rounded overflow-hidden shadow-lg sm:w-[100%] flex items-center flex-col"
                key={p._id}
              >
                <img
                  className="w-full content-center"
                  src={p.photo}
                  alt="Product Image"
                  width={"300px"}
                  height={"200px"}
                />
                <div className="px-2 py-2">
                  <div className="font-bold text-lg mb-2">{p.name}</div>
                  <p className="text-gray-700 text-base w-full overflow-hidden">
                    {p.description.substring(0, 25)}...
                  </p>
                  <p className="text-gray-700 text-base mt-2">${p.price}</p>
                  <button className="border-none outline-none px-2 py-1 bg-blue-800 font-semibold text-white rounded mr-2">
                    More Details
                  </button>
                  <button className="border-none outline-none px-2 py-1 bg-lime-500 font-semibold text-white rounded">
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
