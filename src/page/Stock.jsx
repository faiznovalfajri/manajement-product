import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import supabase from '../utils/supabase';

const Stock = () => {

  // menyimpan nilai dan membaca ui
   const [data, setData] = useState([]);
  

  // mengambil data dari supabase (membuat variabel yang berisi arrow function)
  const fetchData = async () => {

    // untuk mengambil data dari tabel products, kalau mau ambil data dari tabel luar harus di isi satu satu
    // order = untuk menampilkan data baru berada di atas
    const {data, error} = await supabase.from("history_products").select(`
      id,
      qty,
      type,
      products (
        name_product
      ),
      created_at,
      updated_at
      `).order("created_at", {ascending : false});

      // jika error maka akan tampilkan pesan error
      // return = kode yang berada di bawah kode tersebut tidak akan di jalankan
      if(error) return console.error(error.message);

      setData(data);
  }


  // membuat tabel
  const columns = [
    {
      title: 'No',
      dataIndex: '',
      key: 'no',
      render: (_, __, index) => <p>{index + 1}</p>
    },
    {
      title: 'Name Product',
      render: (data) => <p>{data.products?.name_product}</p>,
      key: '',
    },
    {
      title: 'Qty',
      dataIndex: 'qty',
      key: 'qty',
    },
    {
      title: 'Type',
      render: (data) => <p>{data.type === "out" ? "Masuk" : "keluar"} </p>,
      key: 'type',
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'action',
      width: 100,
      render: () => {
        return (
          <div className='flex items-center gap-3'>
            <Button type='primary'>
              <EditOutlined />
            </Button>
            <Button danger type='primary'>
              <DeleteOutlined />
            </Button>
          </div>

        )
      }
    },
  ];

  // useEffect = dijalankan ketika halaman pertama kali dibuka / dijalankan, gunakan [] dependency list = hanya di jalankan 1 kali
  // kalau di bagian dependency list di tambahkan [data] maka setia ada perubahan data maka akan di render terus
  useEffect(() => {
    fetchData()
  }, [])


  return (
    <div className='w-full h-full'>
      <div className='flex items-center justify-between mb-5'>
        <h1 className='text-lg text-gray-700 font-semibold'>Stock History Product</h1>
        <Button variant='outlined' color='primary'>
          Create Stock Product
        </Button>
      </div>

      <Table
        dataSource={data} 
        columns={columns} />;


    </div>
  )
}

export default Stock