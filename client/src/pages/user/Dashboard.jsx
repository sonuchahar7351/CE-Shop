import React from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../context/Auth'

const Dashboard = () => {
   const[auth]=useAuth()
  return (
    <Layout title="Dashboard - ecommerce app">
          <div className='grid grid-cols-custom m-3 p-3'>
              <div>
                <UserMenu/>
              </div>
              <div>
                <div className="card">
                   <h3>{auth?.user?.name}</h3>
                   <h3>{auth?.user?.email}</h3>
                   <h3>{auth?.user?.address}</h3>
                </div>
              </div>
          </div>
    </Layout>
  )
}

export default Dashboard