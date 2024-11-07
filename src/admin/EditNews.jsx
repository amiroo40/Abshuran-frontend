import React, { useContext, useEffect, useRef, useState } from 'react';
import NewsContext from '../context/newsContext';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import AdminForm from './AdminForm';
import { deleteNews, getAllNews, updateNews } from '../services/newsService';
import { FaTrash } from 'react-icons/fa';

const EditNews = ({ filesName, setFilesName }) => {

    const [editedNews, setEditedNews] = useState({
        title: '',
        des: '',
        lead: '',
        overTitle: '',
        cat: '',
        tags: [],
        images: []
    });

    const { news, setNewsState } = useContext(NewsContext);
    const textareaRef = useRef(null);
    const { id } = useParams();
    const navigate = useNavigate();

    const handleInput = () => {
        const textarea = textareaRef.current;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
    };

    useEffect(() => {
        const newsItem = news.find(item => item._id === id);
        if (newsItem) {
            setEditedNews({
                ...newsItem,
                images: newsItem.images || []
            });
            setFilesName(newsItem.images.map(image => image.name || image));
        }

        return () => {
            setFilesName([])
        }

    }, [id, news, setFilesName]);

    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.addEventListener('input', handleInput);
            handleInput();
        }

        return () => {
            if (textarea) {
                textarea.removeEventListener('input', handleInput);
            }
        };
    }, []);

    const handleImageUpload = (e) => {
        const files = e.target.files;
        if (!files) return;

        setEditedNews((prevState) => ({
            ...prevState,
            images: [...prevState.images, ...Array.from(files)],
        }));

        setFilesName(Array.from(files).map(file => file.name));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', editedNews.title);
        formData.append('des', editedNews.des);
        formData.append('lead', editedNews.lead);
        formData.append('overTitle', editedNews.overTitle);
        formData.append('cat', editedNews.cat);
        formData.append('tags', editedNews.tags);
        editedNews.images.forEach((image) => {
            formData.append('images', image);
        });

        Swal.fire({
            title: "مطمئنید می خواهید خبر را ویرایش کنید؟",
            text: "بعد از تایید نمی توانید به خبر قبلی بازگردید",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "لغو",
            confirmButtonText: "ویرایش"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {

                    await updateNews(id, formData)

                    setNewsState(prev => ({
                        ...prev,
                        news: news.map(item => item._id === id ? { ...item, ...editedNews } : item)
                    }));

                    const response = await getAllNews()

                    setNewsState(prev => ({
                        ...prev,
                        news: response.data
                    }))

                    setFilesName([])

                    navigate('/admin');

                    Swal.fire({
                        title: "ویرایش شد",
                        icon: "success"
                    });
                } catch (error) {
                    console.error("خطا در ویرایش خبر:", error);
                    Swal.fire({
                        title: "خطا در ویرایش",
                        text: "ویرایش خبر با مشکل مواجه شد.",
                        icon: "error"
                    });
                }
            }
        });
    };

    const handleDeleteNews = async () => {
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

                navigate('/admin')
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

    return (
        <div className='mt-20 sl:mt-36'>
            <AdminForm
                handleSubmit={handleSubmit}
                newNews={editedNews}
                setNewNews={setEditedNews}
                handleImageUpload={handleImageUpload}
                filesName={filesName}
                setFilesName={setFilesName}
            />
            <div className='flex justify-between items-center mx-8'>
                <Link to='/admin' className='py-2 px-3 bg-blue-600 text-white rounded'>صفحه ادمین</Link>

                <div
                    className='text-2xl transition-all duration-200 cursor-pointer border p-2 border-red-600 rounded hover:bg-red-600 hover:text-white text-red-600'
                    onClick={handleDeleteNews}
                >
                    <FaTrash />
                </div>
            </div>
        </div>
    );
};

export default EditNews;
