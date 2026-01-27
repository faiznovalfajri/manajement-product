import React, { useEffect, useState } from 'react'
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import supabase from '../utils/supabase';

const Home = () => {

  // untuk ambil data
  const [data, setData] = useState([]);

  // ambil data dari supabase
  const fetchData = async () => {
    const {data, error} = await supabase.from("products").select("*");

    if (error) {
      console.error(error.message)
    } else {
      setData(data)
    }
  }

  // untuk menampilkan data
  useEffect(() => {
    fetchData()
  }, [])
   


  return (
    <div className='p-5 w-full bg-blue-300/30 rounded-md'>
      <h2 className='text-lg font-semibold text-gray-600 mb-10'>Product</h2>
      <ResponsiveContainer width={"100%"} height={300}>
        <BarChart
          data={data}
        >
          <XAxis dataKey="name_product" />
          <YAxis />
          <Tooltip/>
          <Bar dataKey="stock" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Home