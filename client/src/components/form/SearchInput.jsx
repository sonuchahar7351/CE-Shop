import React, { useState } from 'react'
import { useSearch } from '../../context/Search.jsx'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SearchInput = () => {

      const [value,setValue]=useSearch();
      const navigate=useNavigate()
      const [loading,setLoading]=useState(false);

      const handleSubmit=async(e)=>{
            try {
                  e.preventDefault();
                  setLoading(true)
                  const {data}=await axios.get(`http://localhost:8000/api/v1/product/search/${value.keyword}`)
                  setLoading(false)
                  setValue({...value,result:data.result});
                  navigate('/search');
            } catch (error) {
                   console.log(error);
                   setLoading(false)
            }
      }
  return (
    <div>
      
      <form action="" onSubmit={handleSubmit}>
            <div className='rounded-3xl bg-gray-300 overflow-hidden flex '>
            <input
            className='w-full outline-none border-none bg-transparent py-2 px-4 text-black text-base'
             type="search"
             placeholder='Search'
            
             value={value.keyword}
             onChange={(e)=>setValue({...value,keyword:e.target.value})}
            />
            <button 
            className='bg-black text-white px-2 py-1  border-none outline-none'
            type='submit'
            >Search</button>
            </div>
           
      </form>
    </div>
  )
}

export default SearchInput