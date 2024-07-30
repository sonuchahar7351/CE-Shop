import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      
        <div className="w-full ">
          <h4 className="text-2xl font-bold  text-center">Admin Panel</h4>
          <ul className="flex flex-col mt-3 gap-1">
            <li className="flex justify-center border-2 border-slate-200 hover:bg-gray-300">
              <NavLink to="/dashboard/admin/create-category" className="font-semibold text-xl w-[100%]  py-1 text-center">
                Create Category
              </NavLink>
            </li>
            <li className="flex justify-center border-gray-200 border-2 hover:bg-gray-300">
              <NavLink to="/dashboard/admin/create-product" className=" font-semibold text-xl w-[100%]  py-1 text-center">
                Create Product
              </NavLink>
            </li>
            <li className="flex justify-center  border-gray-200 border-2 hover:bg-gray-300">
              <NavLink to="/dashboard/admin/products" className=" font-semibold text-xl w-[100%]  py-1 text-center">
                All Product
              </NavLink>
            </li>
            <li className="flex justify-center  border-gray-200 border-2 hover:bg-gray-300">
              <NavLink to="/dashboard/admin/orders" className=" font-semibold text-xl w-[100%]  py-1 text-center">
                Orders
              </NavLink>
            </li>
            <li className="  flex justify-center border-gray-200 border-2 hover:bg-gray-300">
              <NavLink to="/dashboard/admin/users" className=" font-semibold text-xl w-[100%]  py-1 text-center">
                Users
              </NavLink>
            </li>
          </ul>
        </div>
      
    </>
  );
};

export default AdminMenu;
