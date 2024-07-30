import React, { useEffect, useState } from "react";
import { useNavigate, useLocation} from "react-router-dom";

const Spinner = ({path= "login" }) => {
  
    const [count,setCount]=useState(3);
    const navigate=useNavigate();
    const location=useLocation();
    
    useEffect(()=>{
      const interval=setInterval(()=>{
            setCount((pre)=>--pre)
      },1000)

      count===0 && navigate(`/${path}`,{
            state: location.pathname
      })
      return ()=>{
            clearInterval(interval)
      }
    },[count,navigate,location,path])

  return (
    <>
    {/* {<div className=" w-full h-[100vh] flex items-center flex-col justify-center">
      <h3 className="text-center font-bold text-xl">redirection to you in {count} second</h3>
      <div className="" role="status">
          <span className="text-xl font-bold">Loading...</span>
      </div>
      </div>} */}
       <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
        </div>
      
    </>
  );
};

export default Spinner;