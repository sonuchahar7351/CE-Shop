import React from 'react'
import Layout from '../components/Layout/Layout'
import useCategory from '../hooks/UseCategory'
import { Link } from 'react-router-dom'
const Categories = () => {
   
      const categories = useCategory()

  return (
    <Layout title={'All Categories'}> 
     
        <div className='grid grid-cols-3 px-48 py-16 gap-12'>
        {categories.map((c) => (
            <div className="" key={c._id}>
                <Link to={`/categories/${c.slug}`}
                >
              <div className="px-3 py-5 text-xl text-center border-2 border-gray-500 font-medium hover:bg-gray-400">
              {c.name}
              </div>
                </Link>
            </div>
          ))}
        </div>
     
    </Layout>
  )
}

export default Categories