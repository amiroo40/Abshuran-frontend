import { useContext, useRef, useState } from 'react';
import AdminContext from './adminContext';
import Swal from 'sweetalert2';
import NewsContext from './newsContext';
import { createNews, getAllNews } from '../services/newsService';

export const AdminProvider = ({ children }) => {

    const { setNewsState } = useContext(NewsContext);

    const [filesName, setFilesName] = useState([]);

    const fileInputRef = useRef(null);


    const [newNews, setNewNews] = useState({
        title: '',
        des: '',
        lead: '',
        overTitle: '',
        cat: '',
        tags: [],
        images: []
    });

    const handleImageUpload = (e) => {
        const files = e.target.files;
        if (!files) return;

        setNewNews((prevState) => ({
            ...prevState,
            images: Array.from(files)
        }));

        setFilesName(Array.from(files).map(file => file.name));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', newNews.title);
        formData.append('des', newNews.des);
        formData.append('lead', newNews.lead);
        formData.append('overTitle', newNews.overTitle);
        formData.append('cat', newNews.cat);
        formData.append('tags', newNews.tags);
        newNews.images.forEach((image) => {
            formData.append('images', image);
        });

        Swal.fire({
            title: "مطمئنید می خواهید خبر جدید را اضافه کنید؟",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "لغو",
            confirmButtonText: "اضافه"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {

                    await createNews(formData)

                    const response = await getAllNews()

                    setNewsState(prev => ({
                        ...prev,
                        news: response.data
                    }))

                    setNewNews({
                        title: '',
                        des: '',
                        lead: '',
                        overTitle: '',
                        cat: '',
                        tags: [],
                        images: []
                    });

                    setFilesName([])

                    if (fileInputRef.current) {
                        fileInputRef.current.value = '';
                    }

                    Swal.fire({
                        title: "اضافه شد",
                        icon: "success"
                    });
                } catch (error) {
                    console.error("خطا در افزودن خبر:", error);
                    Swal.fire({
                        title: "خطایی رخ داد",
                        text: "لطفاً دوباره تلاش کنید",
                        icon: "error"
                    });
                }
            }
        });
    };

    return (
        <AdminContext.Provider value={{ newNews, setNewNews, setNewsState, handleSubmit, handleImageUpload, filesName, setFilesName }}>
            {children}
        </AdminContext.Provider>
    );
};

export default AdminProvider;

