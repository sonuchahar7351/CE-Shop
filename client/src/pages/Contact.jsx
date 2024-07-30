import React from 'react'
import Layout from '../components/Layout/Layout'
import { BiMailSend, BiPhoneCall, BiSupport} from 'react-icons/bi'

const Contact = () => {
  return (
    <Layout title="Contact us">
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
          <p className='text-justify text-[25px] '>any query and info about product free to call anytime we 24x7 available</p>
          <p className='m-2 text-lg flex items-center gap-2 '> <BiMailSend/>: amitchahar9837@gmail.com</p>
          <p className='m-2 text-lg flex items-center gap-2 '><BiPhoneCall/>: 8171697502</p>
          <p className='m-2 text-lg flex items-center gap-2 '><BiSupport/>: 9837991258 ( toll free )</p>
         </div>
          <div>
             <p className='text-base font-medium my-2'>If Anyone want to one to one discusion about products and services our Address is given below :-</p>
             <address className="">
          <h4 className="font-bold text-2xl">Address:-</h4>
          <p>NAME : CHAHAR ELECTRONIC SHOP & SERVICES</p>
          <p>SHOP : Kagarol, Kheraghar(283119)</p>
          <p>City : Agra</p>
          <p>State : UTTAR PRADESH</p>
        </address>
          </div>
      </div>
         </div>
    </Layout>
  )
}

export default Contact