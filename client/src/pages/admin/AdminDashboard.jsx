import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import { useAuth } from '../../context/Auth'

const AdminDashboard = () => {
  const [auth,setAuth]=useAuth()
  return (
    <Layout>
       
         <div className=" grid grid-cols-custom gap-1 p-3 m-3">
            <div className="">
               <AdminMenu/>
            </div>
            <div className="">
               <div className="card">
                <h3>Admin Name: {auth?.user?.name} </h3>
                <h3>Admin Email {auth?.user?.email} </h3>
                <h3>Admin Contact {auth?.user?.phone} </h3>
               </div>
            </div>
         </div>
       
    </Layout>
  )
}

export default AdminDashboard