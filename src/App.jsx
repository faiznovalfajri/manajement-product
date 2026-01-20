import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './page/Home'
import DashboardLayout from './layout/DashboardLayout'
import Product from './page/Product'
import Profile from './page/Profile'

const App = () => {
  return (
    <Routes>
      <Route element={<DashboardLayout/>}>
        <Route path='/' element={<Home/>}/>
        <Route path='/product' element={<Product/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='*' element={
          <div className='w-full h-screen flex items-center justify-center flex-col bg-emerald-600 text-white text-center'>
            <h1 className='text-4xl font-bold mb-3'>404</h1>
            <p>Page Tidak Tersedia</p>
          </div>
        }/>
      </Route>
    </Routes>
  )
}

export default App