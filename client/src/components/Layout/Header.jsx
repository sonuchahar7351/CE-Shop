import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { GiShoppingBag } from "react-icons/gi";
import { useAuth } from "../../context/Auth";
import toast from "react-hot-toast";
import { useState } from "react";
import { FaCircleUser } from "react-icons/fa6";
import { BsFillCartFill } from "react-icons/bs";
import SearchInput from "../form/SearchInput";
import useCategory from "../../hooks/UseCategory";
import { useCart } from "../../context/Cart";


const Header = () => {
  const [auth, setAuth] = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropMenuOpen, setDropMenuOpen] = useState(false);
  const [cart]=useCart();
  const categories = useCategory();

  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("logout succussfully");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
    setDropMenuOpen(false);
  };
  const toggleMenu = () => {
    setDropMenuOpen((prev) => !prev);
    setDropdownOpen(false);
  };

  return (
    <>
      <nav className="w-full px-10 py-3 flex items-center justify-between sticky top-0 left-0 bg-white z-10">
        <div className="">
          <Link
            to="/"
            className="navbar-brand flex items-center justify-between gap-4"
          >
            <GiShoppingBag />
            <h3>CHAHAR ELECTRONICS</h3>
          </Link>
        </div>
        <div>
          <SearchInput />
        </div>
        <div className="">
          <ul className="flex items-center gap-8 w-full">
            <li>
              <NavLink
                to="/"
                className="outline-none border-none font-medium bg-black text-white  rounded-3xl py-[6px] px-3"
              >
                Home
              </NavLink>
            </li>
            <li className="relative">
              <button
                onClick={toggleMenu}
                className="outline-none border-none  bg-black text-white rounded-3xl px-3 py-[6px] "
              >
                Category
              </button>

              {dropMenuOpen && (
                <ul className="w-[23rem] min-h-32 absolute right-0 top-[3rem] bg-gray-100  text-black text-base font-normal shadow-md  flex flex-wrap justify-start gap-5  py-3 px-5">
                  <li className="bg-gray-200 py-1 px-2 text-base hover:bg-gray-300">
                    <Link to="/categories">All Categories</Link>
                  </li>
                  {categories.map((c) => (
                    <li key={c._id} className="bg-gray-200 py-1 px-2 text-base hover:bg-gray-300">
                      <Link to={`/categories/${c.slug}`}>{c.name}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            {!auth.user ? (
              <>
                <li>
                  <NavLink
                    to="/register"
                    className="outline-none border-none  bg-black text-white  rounded-2xl py-1 px-3"
                  >
                    signup
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/login"
                    className="outline-none border-none  bg-black text-white  rounded-2xl py-1 px-3"
                  >
                    login
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                {/* <li>
                  <NavLink  onClick={handleLogout} to="/login">logout</NavLink>
                </li> */}

                {/* *********************************************************** */}

                <li className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="outline-none border-none flex items-center flex-col bg-white text-black "
                  >
                    <FaCircleUser className="w-[28px] h-[28px] outline-none" />
                  </button>

                  {dropdownOpen && (
                    <ul className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  )}
                </li>

                {/*  ********************************************************** */}
              </>
            )}
            <li className=" w-[28px] h-[28px] relative">
              <NavLink to="/cartpage">
                <BsFillCartFill className="w-[100%] h-[100%]" />
                <span className="absolute top-[-6px] right-[-9px] font-semibold text-black z-10">
                  {cart?.length}
                </span>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
