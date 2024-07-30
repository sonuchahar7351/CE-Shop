import React from 'react'
import Layout from '../components/Layout/Layout'

const Policy = () => {
  return (
    <Layout title="privacy policy">
      <div className='px-24 py-5'>
         <div className='contactus gap-5 mt-2'>
        <div className='p-6'>
           <img
            src='images/contact-us.jpg'
            alt='contact Us'
            style={{width:'80%'}}
           />
        </div>
         <div className='flex flex-col justify-center'>
          <p className='text-justify text-[25px] '>privacy policy</p>
          <p className='m-2 text-lg flex items-center gap-2 '> privacy policy</p>
          <p className='m-2 text-lg flex items-center gap-2 '>privacy policy</p>
          <p className='m-2 text-lg flex items-center gap-2 '>privacy policy</p>
         </div>
      </div>
         </div>
    </Layout>
  )
}

export default Policy