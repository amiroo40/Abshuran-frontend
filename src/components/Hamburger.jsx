import React, { useContext } from 'react'
import './navigationPanel.css'
import NewsContext from '../context/newsContext'

const Hamburger = () => {

    const { isActiveMenu, openSidebar } = useContext(NewsContext)
    return (
        <div className='mr-2 flex items-center md:justify-start z-50'>
            <div className={`nav-btn cursor-pointer  ${isActiveMenu ? 'change' : ''}`} onClick={openSidebar}>
                <div className='line1 bg-slate-500'></div>
                <div className='line2 bg-slate-500'></div>
                <div className='line3 bg-slate-500'></div>
            </div>
        </div>
    )
}

export default Hamburger
