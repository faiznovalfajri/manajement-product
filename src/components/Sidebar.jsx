import { HomeOutlined, ProductFilled, UserOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Sidebar = () => {

    // navigasi ketika di menu tekan
    const navigate = useNavigate();

    // untuk mengetahui lokasi berada di mana secara otomatis
    const location = useLocation();

    // untuk buka dan tutup
    const [togle, setTogle] = useState(false)


    // tombol menu
    const items = [
        {
            key: "/",
            icon: <HomeOutlined />,
            label: "Home"
        },
        {
            key: "/product",
            icon: <ProductFilled />,
            label: "Product"
        },
        {
            key: "/profile",
            icon: <UserOutlined />,
            label: "Profile"
        },
    ];

    return (
        <div className={`${togle ? "w-[80px]": "w-[200px]"} transition-all duration-600 h-full flex flex-col items-center py-5 bg-[#001529]`}>

            <h1 onClick={() => setTogle(!togle)} className='text-xl font-bold text-shadow-md text-white mb-5 cursor-pointer'>
                {togle ? "GT" : " Ghania Toko"}
            </h1>

            <Menu
                items={items}
                mode='inline'
                className='w-full p-2!'
                theme='dark'
                defaultSelectedKeys={"/"}
                onClick={({ key }) => navigate(key)}
                selectedKeys={[location.pathname]}
                inlineCollapsed={togle}
            />
        </div>
    )
}

export default Sidebar