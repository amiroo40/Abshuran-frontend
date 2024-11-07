import { useContext } from 'react'
import './navigationPanel.css'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import NewsContext from '../context/newsContext'

const NavigationPanel = () => {
    const { isActiveMenu } = useContext(NewsContext)
    return (
        <>
            {isActiveMenu && <div className="overlay" />}
            <Navbar />
            <Sidebar />
        </>
    )
}

export default NavigationPanel
