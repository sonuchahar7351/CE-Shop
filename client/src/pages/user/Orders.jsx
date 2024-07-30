import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import axios from "axios";
import { useAuth } from "../../context/Auth";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  // console.log(orders);
  // console.log(orders[0].products.length,"fskflfffksklfkssf")

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/v1/auth/orders"
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title={"your orders"}>
      <div className="grid grid-cols-custom gap-1 m-3 p-3">
        <div>
          <UserMenu />
        </div>
        <div>
          <h3 className="text-center font-bold text-xl mb-2">All Orders</h3>

          {orders.map((o, i) => {
            return (
              <div className="flex items-center justify-center flex-col" key={o._id}>
                <table className="table-auto border-collapse w-full">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="px-4 py-2 border-r">#</th>
                      <th className="px-4 py-2 border-r">Status</th>
                      <th className="px-4 py-2 border-r">Buyer</th>
                      <th className="px-4 py-2 border-r">Date</th>
                      <th className="px-4 py-2 border-r">Payment</th>
                      <th className="px-4 py-2 border-r">Product Qnt</th>
                    </tr>
                  </thead>
                  <tbody className="text-center font-medium">
                    <tr className="bg-white hover:bg-gray-100">
                      <td className="px-4 py-2 border-r border-b">{i + 1}</td>
                      <td className="px-4 py-2 border-r border-b">
                        {o?.status}
                      </td>
                      <td className="px-4 py-2 border-r border-b">
                        {o?.buyer?.name}
                      </td>
                      <td className="px-4 py-2 border-r border-b">
                        {moment(o?.createdAt).fromNow()}
                      </td>
                      <td className="px-4 py-2 border-r border-b">
                        {o?.payment.success ? "Success" : "Failed"}
                      </td>
                      <td className="px-4 py-2 border-r border-b">
                        {o?.products.length}
                      </td>
                    </tr>
                  </tbody>
                </table>

                {o?.products.map((p,i) => (
                  <div
                    key={p._id}
                    className="px-3 py-2 h-[10rem]  flex items-center shadow-md justify-between gap-6 w-full  border my-2 border-slate-300"
                  >
                    <div className="w-[20%]">
                      <img src={p.photo} alt={p.name} width={"100%"} />
                    </div>
                    <div className="w-[100%]">
                      <h3 className="text-lg my-1 font-medium">{p.name}</h3>
                      <h3 className="text-lg my-1">
                        {p.description.substring(0, 70)}...
                      </h3>
                      <h3 className="text-lg my-1 font-medium">${p.price}</h3>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
