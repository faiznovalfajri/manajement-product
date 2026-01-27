import { SettingOutlined, UserOutlined } from '@ant-design/icons'
import { Dropdown } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'


const Header = () => {

    const navigate = useNavigate();

    const onClick = ({ key }) => {
        if (key === "2") {
            if (confirm("keluar ?")) {
                navigate("*")
            }
        } else {
            navigate(key)
        }

    }

    // menu dropdown
    const items = [
        {
            key: "/profile",
            label: "Profile",
            icon: <UserOutlined />
        },
        {
            key: 2,
            label: "Log Out",
            icon: <SettingOutlined />
        }
    ]

    return (
        <div className='w-full p-5 shadow-md bg-white flex items-center justify-between'>
            <h1 className=' text-xl font-bold text-gray-700'>Ghania Dashboard</h1>
            <Dropdown
                menu={{ items, onClick }}
                placement='bottom'
            >
                <h1 className='hover:cursor-pointer'>Andi Budi</h1>
            </Dropdown>
        </div>
    )
}

export default Header