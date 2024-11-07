import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import TabBar from './TabBar';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { MdPowerSettingsNew } from "react-icons/md";
import Swal from 'sweetalert2';

const AdminPage = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const { logout } = useAuth()

    useEffect(() => {
        if (location.pathname === '/admin') {
            navigate('/admin/new-news');
        }
    }, [location.pathname, navigate]);

    const handleLogout = () => {
        Swal.fire({
            title: "مطمئنید می خواهید خارج شوید؟",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "خیر",
            confirmButtonText: "بله"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    logout();
                    navigate('/login');
                    Swal.fire({
                        title: "خارج شدید",
                        icon: "success"
                    });
                } catch (error) {
                    console.error("خطا در ویرایش خبر:", error);
                    Swal.fire({
                        text: "خروج با مشکل مواجه شد",
                        icon: "error"
                    });
                }
            }
        });
    };

    return (
        <>
            <div className='sl:mt-36 mt-20 flex items-center justify-between'>
                <h2 className='font-semibold text-3xl  pr-4 mr-4'> مدیریت خبر ها و ماهنامه ها</h2>

                <MdPowerSettingsNew
                    className="text-3xl  mr-8 text-red-500 hover:text-red-800 ml-8 rounded cursor-pointer transition-all duration-200"
                    onClick={handleLogout}
                    title='خروج'
                />

            </div>

            <div className='p-4 m-4'>

                <TabBar />

                <Outlet />

            </div>
        </>
    );
};

export default AdminPage;
