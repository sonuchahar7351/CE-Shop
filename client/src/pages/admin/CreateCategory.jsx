import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import CategoryForm from "../../components/form/CategoryForm";
import {Modal} from 'antd';
import toast from "react-hot-toast";


const CreateCategory = () => {
  const [category, setCategory] = useState([]);
  const [name,setName]=useState("");
  const [visible,setVisible]=useState(false)
  const [selected,setSelected]=useState(null)
  const [updateName,setUpdateName]=useState("");


  const handleUpdate = async(e)=>{
      e.preventDefault();
      try {
        const {data}=await axios.put(`${import.meta.env.VITE_APP_API}/api/v1/category/update-category/${selected._id}`,{name:updateName})
        if(data.success){
          toast.success(data.message);
          setSelected(null);
          setUpdateName("");
          setVisible(false);
          getAllCTG();
        }
        else{
          console.log(data.message)
        }

      } catch (error) {
        toast.error("something went wrong")
      }
  }

  const handleDelete = async(id)=>{
     try {
      const {data}=await axios.delete(`${import.meta.env.VITE_APP_API}/api/v1/category/delete-category/${id}`);
       
      if(data.succes){
       getAllCTG();
        toast.success(data.category.name+" is deleted");
      }
      else{
        console.log("not deleted")
      }
     } catch (error) {
       toast.error("something went wrong")
     }
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    try {
      const {data}= await axios.post(`${import.meta.env.VITE_APP_API}/api/v1/category/create-category`,{name})
      if(data.success){
        toast.success(data.category.name+" is created");
        setName("")
        getAllCTG()
      }
      else{
        toast.error(data.message);
      }
    } catch (error) {
      
    }
  }

  const getAllCTG = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_API}/api/v1/category/get-category`
      );
      if (data.success) {
        setCategory(data.category);
      }
    } catch (error) {
      console.log("frontend", error);
    }
  };
  useEffect(() => {
    getAllCTG();
  }, [handleDelete,handleSubmit,handleUpdate]);

  return (
    <Layout title={"Dashboard - create category"}>
      <div className="grid grid-cols-custom gap-10 p-3">
        <div>
          <AdminMenu />
        </div>
        <div className="category ">
          <h2 className="pl-3 font-bold text-2xl">Manage Category</h2>
          <div className="p-3">
            <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName}/>
          </div>
          <div className="w-full pl-3">
            <table className="table-auto w-[70%]">
              <thead className="border-b-2 border-gray-500">
                <tr className="">
                  <th className="text-xl font-semibold py-1">Name</th>
                  <th className="text-xl font-semibold py-1">Action</th>
                </tr>
              </thead>
              <tbody className="text-center">
                 {
                  category?.map((c)=>(
                    <React.Fragment key={c._id}>
                         <tr className="border-b border-gray-500"  key={c._id}>
                          <td key={c._id} className=" py-2 text-lg font-semibold">{c.name}</td>
                          <td><button
                          onClick={()=>{setVisible(true);
                            setUpdateName(c.name);
                            setSelected(c)
                          }}
                           className="hover:bg-blue-500 py-1 px-3 rounded-md border-none outline-none bg-blue-700 text-white font-semibold">Edit</button>
                         <button
                          onClick={()=>{handleDelete(c._id)}}
                          className="hover:bg-red-300 py-1 px-2 rounded-md border-none outline-none bg-red-700 text-white font-semibold ml-2"
                          >Delete</button>
                          </td>
                         </tr>
                    </React.Fragment>
                  ))
                 }
              </tbody>
            </table>
          </div>
          <Modal onCancel={()=>setVisible(false)} footer={null} open={visible}><CategoryForm value={updateName} setValue={setUpdateName} handleSubmit={handleUpdate} button={"Update"}/></Modal>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
