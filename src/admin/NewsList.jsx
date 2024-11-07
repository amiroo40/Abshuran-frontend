import React, { useContext } from 'react'
import NewsContext from '../context/newsContext'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import useScreenSize from '../hooks/useScreenSize'
import { deleteNews } from '../services/newsService'
import { FaEdit, FaTrash } from "react-icons/fa";

const NewsList = () => {

    const { news, setNewsState, getSummary } = useContext(NewsContext)

    const navigate = useNavigate()

    const screenSize = useScreenSize();
    const sm = screenSize < 640

    const handleDeleteNews = async (id) => {
        const result = await Swal.fire({
            title: "مطمئنید می خواهید خبر را حذف کنید؟",
            text: "بعد از حذف خبر دسترسی دوباره به آن ممکن نیست",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "لغو",
            confirmButtonText: "حذف"
        });

        if (result.isConfirmed) {
            try {

                await deleteNews(id)

                setNewsState(prev => ({
                    ...prev,
                    news: prev.news.filter(item => item._id !== id)
                }));

                Swal.fire({
                    title: "حذف شد",
                    icon: "success"
                });
            } catch (error) {
                console.error("خطا در حذف خبر:", error);
                Swal.fire({
                    title: "خطا",
                    text: "حذف خبر با مشکل مواجه شد.",
                    icon: "error"
                });
            }
        }
    };

    const navigateToEditPage = (id) => {
        navigate(`/admin/new-news/${id}`)
    }

    return (
        <>
            <div className="news-list">
                <h3 className="text-xl font-semibold mb-2">لیست خبرها</h3>
                {news.length === 0 ? (
                    <p>خبری موجود نیست</p>
                ) : (
                    news.map((item) => (
                        <div key={item._id} className="flex justify-between items-center p-2 border mb-2">
                            <div>
                                <h4 className="font-bold">{sm ? getSummary(item.title, 5) : getSummary(item.title, 20)}...</h4>
                            </div>
                            <div className='flex justify-between items-center gap-2'>

                                <div className='transition-all duration-200 cursor-pointer border p-1 border-red-600 rounded hover:bg-red-600 hover:text-white text-red-600'>
                                    <FaTrash
                                        onClick={() => handleDeleteNews(item._id)}
                                    />
                                </div>

                                <div className='transition-all duration-200  cursor-pointer border p-1 border-blue-600 rounded hover:bg-blue-600 hover:text-white text-blue-600'>
                                    <FaEdit
                                        onClick={() => navigateToEditPage(item._id)}
                                    />
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </>
    )
}

export default NewsList
