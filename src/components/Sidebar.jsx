import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import NewsContext from '../context/newsContext'

const Sidebar = () => {

    const { isActiveMenu, scrolled, closeSidebar } = useContext(NewsContext)


    const normalLink = 'text-white w-full border-b p-2 block text-right pr-2 hover:bg-white hover:text-gray-800 hover:-translate-y-0.5 duration-200 mt-2'

    const activeLink = 'text-gray-800 bg-gray-300 w-full border-b p-2 block text-right pr-2'

    return (
        <>
            <ul className={`${isActiveMenu ? 'w-56' : 'w-0 overflow-hidden'} ${scrolled ? 'md:mt-16 mt-16' : 'mt-16 sl:mt-32'} transition-all duration-300 h-screen flex flex-col fixed right-0 top-0 bg-gray-800 text-white z-50`}>
                <li>
                    <NavLink onClick={closeSidebar} className={({ isActive }) => isActive ? activeLink : normalLink} to='/'>خانه</NavLink>
                </li>
                <li>
                    <NavLink onClick={closeSidebar} className={({ isActive }) => isActive ? activeLink : normalLink} to='/political'>سیاسی</NavLink>
                </li>
                <li>
                    <NavLink onClick={closeSidebar} className={({ isActive }) => isActive ? activeLink : normalLink} to='/social'>اجتماعی</NavLink>
                </li>
                <li>
                    <NavLink onClick={closeSidebar} className={({ isActive }) => isActive ? activeLink : normalLink} to='/economic'>اقتصادی</NavLink>
                </li>
                <li>
                    <NavLink onClick={closeSidebar} className={({ isActive }) => isActive ? activeLink : normalLink} to='/cultural'>فرهنگی</NavLink>
                </li>
                <li>
                    <NavLink onClick={closeSidebar} className={({ isActive }) => isActive ? activeLink : normalLink} to='/sports'>ورزشی</NavLink>
                </li>
                <li>
                    <NavLink onClick={closeSidebar} className={({ isActive }) => isActive ? activeLink : normalLink} to='/urban-management'>مدیریت شهری</NavLink>
                </li>
                <li>
                    <NavLink onClick={closeSidebar} className={({ isActive }) => isActive ? activeLink : normalLink} to='/ir-world'>ایران و جهان</NavLink>
                </li>
                <li>
                    <NavLink onClick={closeSidebar} className={({ isActive }) => isActive ? activeLink : normalLink} to='/gallery'>ماهنامه ها</NavLink>
                </li>
                <li>
                    <NavLink onClick={closeSidebar} className={({ isActive }) => isActive ? activeLink : normalLink} to='/admin'>صفحه ادمین</NavLink>
                </li>
            </ul>
        </>
    )
}

export default Sidebar
