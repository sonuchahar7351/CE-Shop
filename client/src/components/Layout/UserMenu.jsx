import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <>
      <div className="w-full">
        <h4 className="text-2xl font-bold  text-center">Dashboard</h4>
        <ul className="flex flex-col mt-3 gap-1">
          <li className="flex justify-center">
            <NavLink
              to="/dashboard/user/profile"
              className="hover:bg-slate-200 font-semibold text-xl w-[100%]  py-1 text-center rounded "
            >
              Profile
            </NavLink>
          </li>
          <li className="flex justify-center py-1">
            <NavLink
              to="/dashboard/user/orders"
              className=" hover:bg-slate-200 font-semibold text-xl w-[100%]  py-1 text-center rounded"
            >
             Orders
            </NavLink>
          </li>
          
        </ul>
      </div>
    </>
  );
};

export default UserMenu;
