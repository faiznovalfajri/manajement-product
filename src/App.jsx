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
      </Route>
    </Routes>
  )
}

export default App