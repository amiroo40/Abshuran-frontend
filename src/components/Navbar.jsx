import { brand } from '../constants/index'
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Search from './Search';
import Hamburger from './Hamburger';
import NewsContext from '../context/newsContext';


const Navbar = () => {

    const { isActiveMenu, scrolled, handleScroll } = useContext(NewsContext)

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    const navigate = useNavigate()

    const navigateToHome = () => {
        navigate('/')
    }

    return (
        <div className=" fixed top-0 w-full z-50 bg-white">
            <div className={`text-gray-800 transition-all hidden sl:block duration-300 ${scrolled ? 'h-0 py-0 overflow-hidden' : 'h-16 '}`}>
                <div className="banner  flex justify-center items-center ">
                    <img
                        onClick={navigateToHome}
                        src={brand}
                        alt="logo"
                        className='w-20 h-16 cursor-pointer'
                    />
                </div>
            </div>

            <div className={`text-gray-900 h-16 transition-all duration-300 flex justify-between mt border border-t-2 items-center  ${scrolled ? 'mt-0' : ''}`}>

                <Hamburger />

                <div className={`cursor-pointer md:mr-2 transition-all duration-300 ${scrolled ? 'md:w-20 md:h-16' : 'md:w-0 h-0 md:overflow-hidden'} ${isActiveMenu ? 'w-0 h-0 overflow-hidden' : 'w-20 h-16'}`}>
                    <img
                        onClick={navigateToHome}
                        src={brand}
                        alt="logo"
                    />
                </div>

                <Search />

            </div>
        </div>
    )
}

export default Navbar
