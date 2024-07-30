import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/Auth";
import moment from "moment";
import { Select } from "antd"; // Ensure you import Select correctly
const { Option } = Select;

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "not_process",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
  ]);
  const [changeStatus, setChangeStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  // console.log(orders);
  // console.log(orders[0].products.length,"fskflfffksklfkssf")

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/v1/auth/all-orders"
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange =async(orderId,value)=>{
      try {
            const {data}=await axios.put(`http://localhost:8000/api/v1/auth/order-status/${orderId}`,{status:value})
            getOrders()
      } catch (error) {
            
      }

  }
  return (
    <Layout title={"All order Data"}>
      <div className="grid grid-cols-custom gap-2 mt-3">
        <div>
          <AdminMenu />
        </div>
        <div className="w-full pr-8 h-[85vh] overflow-y-scroll">
          <h1 className="text-2xl font-bold text-center my-2">All orders</h1>
          {orders.map((o, i) => {
            return (
              <div
                className="flex items-center justify-center flex-col "
                key={o._id}
              >
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
                      <td className=" py-2 border-r border-b">
                        <Select
                          variant ={false}
                        //   style={{ border: 'none', backgroundColor: 'transparent' }}
                          onChange={(value) => handleChange(o._id,value)}
                          defaultValue={o.status}
                        >
                          {status.map((s, i) => (
                            <Option key={i} value={s}>
                              {s}
                            </Option> // Use Option and ensure to return it
                          ))}
                        </Select>
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
                {o?.products.map((p, i) => (
                  <div
                    key={p._id}
                    className="px-3 py-2 h-[10rem]  flex items-center shadow-md justify-between gap-6 w-full  border mb-2 border-slate-300"
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

export default AdminOrders;
