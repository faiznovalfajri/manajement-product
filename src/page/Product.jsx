import { Button, Form, Input, InputNumber, Modal, Select, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import supabase from '../utils/supabase';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const Product = () => {

  // menyimpan nilai dan membaca ui
  const [data, setData] = useState([]);
  const [isOpen, SetIsOpen] = useState(false);

  // untuk menghubungkan Form Ant Design dengan variabel form
  const [form] = Form.useForm();

  // membuat tabel
  const columns = [
    {
      title: 'No',
      dataIndex: '',
      key: 'no',
      // yang di pakai hanya parameter 3
      render: (_, __, index) => <p>{index + 1}</p>
    },
    {
      title: 'Name Product',
      dataIndex: 'name_product',
      key: 'name_product'
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock'
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price'
    },
    {
      title: 'Status Product',
      dataIndex: 'status_product',
      key: 'status_product',
      render: (status) => <p>{status ? "Tersedia" : "Belum Tersedia"}</p>
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'action',
      width: 100,
      render: (data) => (
        <div className='flex items-center gap-3'>
          <Button type='primary'>
            <EditOutlined />
          </Button>
          <Button danger type='primary' onClick={() => handleDeleted(data.id)}>
            <DeleteOutlined />
          </Button>
        </div>
      )
    }
  ];

  // untuk mengambil data, dan juga membutuhkan waktu untuk mengambil data
  const fetchData = async () => {
    const { data, error } = await supabase.from("products").select("*")

    // untuk mengecek error
    if (error) {
      console.error(error.message)
    } else {
      setData(data);
    }
  };

  // tombol hapus
  const handleDeleted = async (id) => {
    if (!confirm("are you sure, delete this product ?")) return;

    // 2 id untuk menyamakan apakah ketika tombol yang di tekan ada atau tidak ada data di supabase
    const { error } = await supabase.from("products").delete().eq("id", id)

    if (error) {
      console.error(error.message);
    } else {
      fetchData();
      alert("delete product succesfully")
    }
  }

  // untuk bisa menangani insert dan update
  // bagian kiri di ambil dari tabel di supabase dan di bagian kanan di ambil dari name form
  const handleSubmit = async (values) => {
    const payload = {
      name_product: values.nameProduct,
      stock: values.stockProduct,
      price: values.priceProduct,
      status_product: values.statusProduct
    }

    const { error } = await supabase.from("products").insert(payload);

    if (error) return console.error(error.message);
    fetchData();
    SetIsOpen(false);

    // ketika form di tutup dan dibuka lagi form akan kembali kosong
    form.resetFields();
  }


  // dijalankan ketika pertama kali di render, dependency [] = hanya di jalankan 1 kali
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className='w-full h-full'>
      <div className='flex items-center justify-between'>
        <h1 className='text-lg text-gray-700 font-semibold'>Product Table</h1>
        <Button onClick={() => SetIsOpen(true)} variant='outlined' color='primary'>
          Create Product
        </Button>
      </div>

      <Table
        dataSource={data}
        columns={columns}
      />

      {/* modal untuk bagian tambah produk */}
      <Modal
        open={isOpen}
        onCancel={() => SetIsOpen(false)}
        onOk={() => form.submit()}
        okText="submit"
      >
        <Form
          form={form}
          layout='vertical'
          onFinish={handleSubmit}
        >
          {/* input name product */}
          <Form.Item
            label="Name Product"
            name={"nameProduct"}
            rules={[{
              required: true,
              message: "input name product can not be empty"
            }]}
          >
            <Input placeholder='input name product' />
          </Form.Item>

          {/* input price product */}
          <Form.Item
            label="Price Product"
            name={"priceProduct"}
            rules={[{
              required: true,
              message: "input price product can not be empty"
            }]}
          >
            <InputNumber style={{ width: "100%" }} placeholder='input price product' />
          </Form.Item>

          {/* input stock product */}
          <Form.Item
            label="Stock Product"
            name={"stockProduct"}
            rules={[{
              required: true,
              message: "input stock product can not be empty"
            }]}
          >
            <InputNumber style={{ width: "100%" }} placeholder='input stock product' />
          </Form.Item>

          {/* select status product */}
          <Form.Item
            label="Status Product"
            name={"statusProduct"}
            rules={[{
              required: true,
              message: "select status product"
            }]}
          >
            <Select
              placeholder="select status product"
            >
              <Select.Option
                value={true}
              >
                Available
              </Select.Option>
              <Select.Option
                value={false}
              >
                Not Available
              </Select.Option>
            </Select>
          </Form.Item>


        </Form>
      </Modal>
    </div>
  )
}

export default Product