import React from 'react'

const CategoryForm = ({handleSubmit,value,setValue,button}) => {
  return (
    <>
        <form onSubmit={handleSubmit}>
            <div className='mb-3 w-[40%]'>
                  <input type="text" className='form-control outline-none border-none w-[100%] bg-gray-200 py-2 rounded-md px-3 font-semibold text-xl' placeholder='Enter new category' value={value}
                   onChange={(e)=>setValue(e.target.value)}
                   />
            </div>
              <button type='submit' className='hover:bg-blue-500 py-2 px-4 border-none outline-none bg-blue-700 text-white font-semibold rounded-md text-lg'>{button?"Update":"Create"}</button>
        </form>
    </>
  )
}

export default CategoryForm