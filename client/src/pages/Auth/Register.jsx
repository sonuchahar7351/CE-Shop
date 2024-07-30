import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import  toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import '../../styles/AuthStyles.css';
const Register = () => {
      const [name,setName]=useState('');
      const [email,setEmail]=useState('');
      const [password,setPassword]=useState('');
      const [phone,setPhone]=useState('');
      const [address,setAddress]=useState('');
      const [answer,setAnswer]=useState('');
      const navigate=useNavigate();

      const handleSubmit=async(e)=>{
           e.preventDefault();
           try {
             const res= await axios.post(`http://localhost:8000/api/v1/auth/register`,
              {
                name,
                email,
                password,
                phone,
                address,
                answer,
              }
            );
            if(res && res.data.success){
             
              navigate("/login");
              toast.success(res.data.message)
            }
            else{
              toast.error(res.data.message)
            }
           } catch (error) {
             console.log(error);
             toast.error("something went wrong")
           }
      }

  return (
    <Layout title="Register">
      <Toaster/>
      <div className="form-container">
        <div className="w-full max-w-xs px-2 py-2">
          <form className="bg-white shadow-md rounded px-6 py-6" onSubmit={handleSubmit}>
          <h4 className="title">Register form</h4>
            <div className="mb-3">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                required
                value={name}
                onChange={(e)=>setName(e.target.value)}
                placeholder="name"
              />
            </div>
            <div className="mb-3">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                required
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                placeholder="email"
              />
            </div>
            <div className="mb-3">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                required
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                placeholder="password"
              />
            </div>
            <div className="mb-3">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="phone"
                type="text"
                required
                value={phone}
                onChange={(e)=>setPhone(e.target.value)}
                placeholder="phone number"
              />
            </div>
            <div className="mb-3">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="address"
                type="text"
                required
                value={address}
                onChange={(e)=>setAddress(e.target.value)}
                placeholder="address"
              />
            </div>
            <div className="mb-3">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="answer"
                type="text"
                required
                value={answer}
                onChange={(e)=>setAnswer(e.target.value)}
                placeholder="what is your favorite sports"
              />
            </div>
            
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-auto flex items-center justify-center w-full"
                type="submit"
              >
                Sign up
              </button>
            
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
