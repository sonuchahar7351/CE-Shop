import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/Cart";
import { useAuth } from "../context/Auth";
import { useNavigate } from "react-router-dom";
import DropIn from 'braintree-web-drop-in-react';
import axios from "axios";
import toast from "react-hot-toast";

const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-us", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {}
  };

  const removeItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
    } catch (error) {
      console.log(error);
    }
  };

  const gatToken = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_APP_API}/api/v1/product/braintree/token`);
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(`${import.meta.env.VITE_APP_API}/api/v1/product/braintree/payment`, {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem('cart');
      setCart([])
      navigate('/dashboard/user/orders');
      toast.success("Payment Completed Successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    gatToken();
  }, [auth?.token]);
  return (
    <Layout>
      <div>
        <h3 className="text-center text-3xl font-bold m-3">
          {`HELLO ${
            auth?.token && auth?.user?.name ? auth.user.name.toUpperCase() : ""
          }`}
        </h3>
        <h4 className="text-center font-medium text-xl m-2">
          {cart?.length
            ? `You have ${cart.length} items in your cart ${
                auth?.token ? "" : "Please login to checkout"
              }`
            : "Your cart is empty"}
        </h4>
      </div>
      <div className="grid grid-cols-cart px-10 py-4">
        <div className="">
          {cart.map((p) => (
            <div
              key={p._id}
              className="px-3 py-2 flex items-center shadow-md justify-between gap-6 w-full  border mb-1 border-slate-300"
            >
              <div className="w-[30%]">
                <img src={p.photo} alt={p.name} width={"100%"} />
              </div>
              <div className="w-[100%]">
                <h3 className="text-lg my-1 font-medium">{p.name}</h3>
                <h3 className="text-lg my-1">
                  {p.description.substring(0, 70)}...
                </h3>
                <h3 className="text-lg my-1 font-medium">${p.price}</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <button className="bg-gray-400 rounded outline-none border-none py-1 px-2 font-medium">
                      Add +
                    </button>
                    <span className="mx-3 font-medium text-lg">{1}</span>
                    <button className="bg-yellow-200 outline-none border-none py-1 px-2  rounded font-medium">
                      Remove -
                    </button>
                  </div>
                  <div>
                    <button
                      className="border-none outline-none py-1 px-2 rounded bg-red-700 text-white"
                      onClick={() => {
                        removeItem(p._id);
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center px-12">
          <h2 className="font-medium text-lg ">Cart Summary</h2>
          <p className="font-medium text-xl">Total | Checkout | Payment</p>
          <hr />
          <h4 className="font-bold text-xl">Total : {totalPrice()} </h4>
          {auth?.user?.address ? (
            <>
              <div>
                <h4 className="text-lg font-medium">{auth?.user?.address}</h4>
                <button
                  onClick={() => {
                    navigate("/dashboard/user/profile");
                  }}
                  className="border-none outline-none bg-blue-700 rounded px-2 py-1 text-white font-medium"
                >
                  Update Address
                </button>
              </div>
            </>
          ) : (
            <div>
              {auth?.token ? (
                <button
                  onClick={() => navigate("/dashboard/user/profile")}
                  className="border-none outline-none bg-blue-700 rounded px-2 py-1 text-white font-medium"
                >
                  Update Address
                </button>
              ) : (
                <button
                  onClick={() =>
                    navigate("/login", {
                      state: "/cartpage",
                    })
                  }
                  className="border-none outline-none bg-blue-700 rounded px-2 py-1 text-white font-medium"
                >
                  Please Login to checkout
                </button>
              )}
            </div>
          )}
          <div className="mt-2">
          {!clientToken || !cart?.length ? (" "):(
            <>
            <React.StrictMode>
                <DropIn
                  options={{
                    authorization: clientToken,
                    // paypal: { flow: 'vault' },
                  }}
                  onInstance={(instance) => setInstance(instance)}
                />
              </React.StrictMode>
              <button className="py-2 px-3 border-none outline-none mb-2 bg-blue-600 text-white font-medium rounded" onClick={handlePayment} disabled={!instance || loading || !auth?.user?.address}>
              {loading ? "Processing..." : "Make Payment"}
            </button>
            </>
          )
              
            }
           
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
