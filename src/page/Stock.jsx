import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Select, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import supabase from '../utils/supabase';

const Stock = () => {

  // menyimpan nilai dan membaca ui, karena react susah membaca variabel asli dan data selalu bertambah
  const [data, setData] = useState([]);
  const [dataProduct, setDataProduct] = useState([]);
  const [isOpen, SetIsOpen] = useState(false);

  // untuk pagination = curent (untuk menangkap halaman), pageSize (untuk menampilkan berapa data yang akan di tampilkan) 
  const [pagination, setPagination] = useState({
    curent: 1,
    pageSize: 10
  })

  // jika true akan edit, jika false akan create
  const [isEdit, setIsEdit] = useState(false);

  // untuk menangkap data yang di update
  const [selected, setSelected] = useState(null)

  // untuk ambil data dari form
  const [form] = Form.useForm();

  // mengambil data dari supabase (membuat variabel yang berisi arrow function)
  const fetchData = async () => {

    // untuk mengambil data dari tabel products, kalau mau ambil data dari tabel luar harus di isi satu satu
    // order = untuk menampilkan data baru berada di atas
    const { data, error } = await supabase.from("history_products").select(`
      *,
      products (
        id,
        name_product
      )
      `).order("created_at", { ascending: false });

    // jika error maka akan tampilkan pesan error
    // return = kode yang berada di bawah kode tersebut tidak akan di jalankan
    if (error) return console.error(error.message);

    setData(data);
  }

  // untuk menghapus data, mengambil data id
  const handleDeleted = async (id) => {
    // bagian id = untuk mengecek apakah id di parameter ada di id supabase
    if (!confirm("are you sure deleted this data ?")) return;
    const { error } = await supabase.from("history_products").delete().eq("id", id);

    if (error) return console.error(error.message);

    // untuk mengambil data terbaru
    fetchData();
  }

  // membuat tabel
  const columns = [
    {
      title: 'No',
      dataIndex: '',
      key: 'no',
      // jika halaman curent = 1 dan pagesize = 10 === (1 - 1) * 10 + 0 + 1 = 0 * 10 + 1 = 0 + 1 = 1 
      // index dimulai dari 0
      render: (_, __, index) => <p>{(pagination.curent - 1) * pagination.pageSize + index + 1}</p>
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
      dataIndex : "type",
      render: (data) => <p>{data ? "IN" : "OUT"} </p>,
      key: 'type',
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'action',
      width: 100,
      render: (data) => {
        return (
          <div className='flex items-center gap-3'>
            <Button onClick={() => handleUpdated(data)} type='primary'>
              <EditOutlined />
            </Button>
            <Button onClick={() => handleDeleted(data.id)} danger type='primary'>
              <DeleteOutlined />
            </Button>
          </div>

        )
      }
    },
  ];

  // untuk mengambil data dari tabel produk
  const fetchProduct = async () => {
    const { data, error } = await supabase.from("products").select("*");
    // console.log("ini data", data)

    if (error) return console.error(error.message);

    setDataProduct(data);
  }

  // untuk tambah data
  const handleSubmit = async (values) => {
    const { products_id, qty, type } = values;
    // di ubah menjadi number
    const qtyNum = Number(qty);

    // menggunakan method find = mencari berbentuk array
    const product = dataProduct.find((prev) => prev.id === products_id);
    let newStock = product.stock;

    if (type) {
      newStock += qtyNum;
    } else {
      newStock -= qtyNum;
    }

    // dibuat if
    if (isEdit) {
      // untuk mencari id yang sesuai, jika sesuai maka akan update
      await supabase.from("history_products").update({ products_id, qty, type }).eq("id", selected.id)
      // yang di update hanya bagian stok, jika ada stok qty akan bertambah / berkurang, di tabel produk dengan mengecek id
      await supabase.from("products").update({ stock: qty }).eq("id", products_id);
    } else {
      await supabase.from("history_products").insert({ products_id, qty, type })
      await supabase.from("products").update({ stock: newStock }).eq("id", products_id);
    }

    // await supabase.from("history_products").insert({ products_id, qty, type })
    // // yang di update hanya bagian stok, jika ada stok qty akan bertambah / berkurang, di tabel produk dengan mengecek id
    // await supabase.from("products").update({ stock: newStock }).eq("id", products_id);

    fetchData();

    // ketika form di tutup dan dibuka lagi form akan kembali kosong
    form.resetFields();

    // menutup modal
    SetIsOpen(false);
  }

  // untuk update data
  const handleUpdated = (values) => {
    // buka modal
    SetIsOpen(true)
    // untuk menangkap semua data
    setSelected(values)
    // untuk membuka form edit
    setIsEdit(true)

    // untuk menangkap data dari supabase ke form
    // kiri = dari form, kanan = dari supabase
    form.setFieldsValue({
      products_id: values.products.id,
      qty: values.qty,
      type: values.type
    })
  }


  // useEffect = dijalankan ketika halaman pertama kali dibuka / dijalankan, gunakan [] dependency list = hanya di jalankan 1 kali
  // kalau di bagian dependency list di tambahkan [data] maka setia ada perubahan data maka akan di render terus
  // di jalankan ketika halaman ketika pertama kali di render
  useEffect(() => {
    fetchData()
    fetchProduct()
  }, [])


  return (
    <div className='w-full h-full'>
      <div className='flex items-center justify-between mb-5'>
        <h1 className='text-lg text-gray-700 font-semibold'>Stock History Product</h1>
        <Button onClick={() => SetIsOpen(true)} variant='outlined' color='primary'>
          Create Stock Product
        </Button>
      </div>

      <Table
        dataSource={data}
        columns={columns}
        pagination={{
          current: pagination.curent,
          pageSize: pagination.pageSize,
          onChange: (current, pageSize) => setPagination({
            curent: current, pageSize
          })
        }}
      />

      {/* modal untuk bagian tambah stok produk */}
      <Modal
        open={isOpen}
        onCancel={() => SetIsOpen(false)}
        onOk={() => form.submit()}
      >
        <Form
          layout='vertical'
          form={form}
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Name Product"
            // kalau tidak pakai objek seperti di halaman produk untuk bagian name di form item harus sama dengan kolom di supabase
            name={"products_id"}
          >
            <Select
              placeholder="Select the product"
            >
              {/* di mapping */}

              {
                dataProduct.map((data) => (
                  <Select.Option
                    key={data.id}
                    value={data.id}
                  >
                    {data.name_product}
                  </Select.Option>
                ))
              }

            </Select>

          </Form.Item>

          {/* input QTY */}
          <Form.Item
            label="QTY"
            name={"qty"}
          >
            <Input placeholder='enter the stock amount' />
          </Form.Item>

          {/* pilih tipe */}
          <Form.Item
            label="Type Stock"
            name={"type"}
          >
            <Select
              placeholder="Select Type Stock"
            >
              <Select.Option value={true}>IN</Select.Option>
              <Select.Option value={false}>OUT</Select.Option>
            </Select>

          </Form.Item>
        </Form>
      </Modal>

    </div>
  )
}

export default Stock