import React from 'react'
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const Home = () => {

  // data dummy
  const data = [
    {
      key: 1,
      product: "beng-beng",
      stock: 14
    },
    {
      key: 2,
      product: "momogi",
      stock: 19
    },
    {
      key: 3,
      product: "choklatos",
      stock: 8
    },
    {
      key: 4,
      product: "nabati",
      stock: 12
    },
    {
      key: 5,
      product: "coklat dilan",
      stock: 24
    }
  ]


  return (
    <div className='p-5 w-full bg-blue-300/30 rounded-md'>
      <h2 className='text-lg font-semibold text-gray-600 mb-10'>Product</h2>
      <ResponsiveContainer width={"100%"} height={300}>
        <BarChart
          data={data}
        >
          <XAxis dataKey={"product"} />
          <YAxis />
          <Tooltip/>
          <Bar dataKey="stock" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Home