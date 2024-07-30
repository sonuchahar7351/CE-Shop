import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";

const Users = () => {
  return (
    <Layout title={'Dashboard - All Users'}>
      <div className="grid grid-cols-custom  p-3 m-3">
        <div>
          <AdminMenu />
        </div>
        <div>
          <h2>All Users</h2>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
