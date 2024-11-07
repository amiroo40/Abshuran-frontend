import React from 'react'
import { NavLink } from 'react-router-dom'

const TabBar = () => {
    return (
        <div className="border-b border-gray-300 mb-10 mx-4">
            <div className="flex space-x-6 justify-start">
                <NavLink
                    className={({ isActive }) =>
                        `relative px-4 py-2 text-xl font-semibold transition duration-300 ease-in-out rounded-t-lg ${isActive
                            ? 'text-blue-500 bg-white border border-b-0 border-gray-300'
                            : 'text-gray-600 hover:text-blue-500 hover:bg-gray-100'
                        }`
                    }
                    to='/admin/new-news'>
                    خبر جدید
                </NavLink>
                <NavLink
                    className={({ isActive }) =>
                        `relative px-4 py-2 text-xl font-semibold transition duration-300 ease-in-out rounded-t-lg ${isActive
                            ? 'text-blue-500 bg-white border border-b-0 border-gray-300'
                            : 'text-gray-600 hover:text-blue-500 hover:bg-gray-100'
                        }`
                    }
                    to='/admin/new-monthly-journal'>
                    ماهنامه جدید
                </NavLink>
            </div>
        </div>


    )
}

export default TabBar
