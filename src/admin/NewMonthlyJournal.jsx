import React, { useContext, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import moment from 'moment-jalaali';
import NewsContext from '../context/newsContext';
import { createMagazine, deleteMagazine, getGallery } from '../services/galleryService';
import { FaTrash } from 'react-icons/fa';

const NewMonthlyJournal = () => {
    const fileInputRef = useRef(null);
    const [fileName, setFileName] = useState('');
    const [fileData, setFileData] = useState(null);
    const { gallery, setGallery } = useContext(NewsContext);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileName(file.name);
            setFileData(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!fileData) {
            Swal.fire({
                title: "فایلی انتخاب نشده است",
                icon: "error",
            });
            return;
        }

        Swal.fire({
            title: "مطمئنید می خواهید ماهنامه را اضافه کنید؟",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "لغو",
            confirmButtonText: "اضافه"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {

                    const formData = new FormData();
                    formData.append("image", fileData);
                    formData.append("date", new Date().toISOString());

                    await createMagazine(formData)

                    const response = await getGallery()


                    setGallery(response.data)

                    Swal.fire({
                        title: "اضافه شد",
                        icon: "success"
                    });
                    setFileName('');
                    setFileData(null);
                } catch (error) {
                    Swal.fire({
                        title: "خطا در اضافه کردن ماهنامه",
                        text: error.message,
                        icon: "error",
                    });
                }
            }
        });
    };

    const handleDelete = async (id) => {
        Swal.fire({
            title: "مطمئنید می خواهید ماهنامه را حذف کنید؟",
            text: "بعد از حذف ماهنامه دسترسی دوباره به آن ممکن نیست",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "لغو",
            confirmButtonText: "حذف"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {

                    await deleteMagazine(id)

                    setGallery(gallery.filter(item => item._id !== id));
                    Swal.fire({
                        title: "حذف شد",
                        icon: "success"
                    });
                } catch (error) {
                    Swal.fire({
                        title: "خطا در حذف ماهنامه",
                        text: error.message,
                        icon: "error",
                    });
                }
            }
        });
    };

    const handleFileClick = () => {
        fileInputRef.current.click();
        setFileData(null);
        setFileName('');
    };

    const activeSubmitButton = fileData ? true : false;

    return (
        <>
            <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
                <h2 className="text-2xl font-bold text-blue-600 text-center">آپلود ماهنامه جدید</h2>
                <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
                    <p className="text-gray-600">تصویر ماهنامه خود را انتخاب کنید</p>
                    <div className="relative w-full">
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept=".pdf,image/*"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        <button
                            type="button"
                            onClick={handleFileClick}
                            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition ease-in-out duration-300"
                        >
                            انتخاب فایل
                        </button>
                    </div>
                    {fileName && (
                        <div className="text-sm text-green-500 font-medium">
                            فایل انتخاب شده: {fileName}
                        </div>
                    )}
                    <button
                        disabled={!activeSubmitButton}
                        type="submit"
                        className={`${activeSubmitButton ? "bg-green-500 hover:bg-green-700" : "bg-gray-500"} w-full py-2 px-4  text-white font-semibold rounded-lg shadow-md  focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 transition ease-in-out duration-300`}
                    >
                        آپلود ماهنامه
                    </button>
                </form>
            </div>
            <div className='mt-10 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 sl:grid-cols-4'>
                {gallery.map(item => (
                    <div key={item._id} className='w-4/6 h-10/12 mt-8'>
                        <img src={item.image} className='object-cover w-full height-90 mt-3' alt="" />
                        <div className='flex justify-between mt-2'>
                            <span className='text-gray-700 mb-1 mt-auto text-sm sl:text-xl '>{moment(item.date).format('jD jMMMM jYYYY')}</span>
                            <div
                                className='text-xl transition-all duration-200 cursor-pointer border p-2 border-red-600 rounded hover:bg-red-600 hover:text-white text-red-600'
                                onClick={() => handleDelete(item._id)}
                            >
                                <FaTrash />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default NewMonthlyJournal;
