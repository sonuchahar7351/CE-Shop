import React from 'react'
import Layout from '../components/Layout/Layout'
import { Link } from 'react-router-dom'

const Pagenotfound = () => {
  return (
   <Layout title="pageNotFound">
     <div className='flex min-h-[65vh] flex-col items-center justify-center'>
       <h2 className='text-[100px] font-bold'>404</h2>
       <h2 className='font-normal'>Oops ! page not found</h2>
       <Link to='/' className='text-black decoration-[none] p-[10px] mt-[10px]' style={{border:'1px solid black',borderRadius:'5px'}}>
        Go Back
       </Link>
     </div>
   </Layout>
  )
}

export default Pagenotfound