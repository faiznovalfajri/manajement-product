import React from 'react'
import Sidebar from '../components/SIdebar'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'

const DashboardLayout = () => {
  return (
    <div className='w-screen h-screen flex'>
        <Sidebar/>

        <div className='flex flex-1 flex-col'>
            <Header/>
            <div className='flex-1 p-5 overflow-y-auto'>
              <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default DashboardLayout