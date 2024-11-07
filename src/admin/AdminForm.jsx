import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import NewsList from './NewsList';
import { GrClear } from "react-icons/gr";

const AdminForm = ({ handleSubmit, setFilesName, newNews, setNewNews, handleImageUpload, filesName }) => {

    const [isFileUpload, setIsFileUpload] = useState(true);

    const textareaRef = useRef(null);
    const fileInputRef = useRef(null);

    const { id } = useParams()
    const isEditMode = Boolean(id)

    const handleInput = () => {
        const textarea = textareaRef.current;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
    };

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

    const handleInputChange = (e) => {
        setNewNews({
            ...newNews,
            [e.target.name]: e.target.value,
        });

    };

    const handleTagsChange = (e) => {
        setNewNews({
            ...newNews,
            tags: e.target.value.split(','),
        });
    };

    const handleFileClick = () => {
        fileInputRef.current.click();
        setNewNews(
            {
                ...newNews,
                images: []
            }
        )
        setFilesName([])
    };

    const handleClearFields = () => {
        setNewNews({
            title: '',
            des: '',
            lead: '',
            overTitle: '',
            cat: '',
            tags: [],
            images: []
        })
        setFilesName([])
    }

    const activeSubmitButton = (newNews.title && newNews.des && newNews.cat && Array.isArray(newNews.images) && newNews.images.length > 0 && newNews.tags.length > 0)


    return (
        <>
            <form className='p-6 border-2 shadow-2xl bg-gray-100 rounded mb-8' onSubmit={handleSubmit}>
                <label className='font-bold'>عنوان خبر</label>
                <input
                    type="text"
                    value={newNews.title}
                    name="title"
                    placeholder="عنوان خبر"
                    onChange={handleInputChange}
                    className="border border-slate-500 rounded p-2 mb-6 w-full"
                />
                <label className='font-bold'>روتیتر</label>
                <input
                    type="text"
                    value={newNews.overTitle}
                    name="overTitle"
                    placeholder="روتیتر خبر"
                    onChange={handleInputChange}
                    className="border border-slate-500 rounded p-2 mb-6 w-full"
                />
                <label className='font-bold'>لید</label>
                <input
                    type="text"
                    value={newNews.lead}
                    name="lead"
                    placeholder="لید"
                    onChange={handleInputChange}
                    className="border border-slate-500 rounded p-2 mb-6 w-full"
                />

                <label className='font-bold'>متن خبر</label>
                <textarea
                    name="des"
                    value={newNews.des}
                    style={{ resize: 'none', overflow: 'hidden' }}
                    rows={3}
                    ref={textareaRef}
                    placeholder="توضیحات"
                    onChange={handleInputChange}
                    className="border border-slate-500 rounded p-2 mb-6 w-full"
                ></textarea>

                <div className="flex flex-col md:flex-row justify-center md:justify-between items-center mb-10 gap-3">
                    <div className='flex flex-col w-full'>
                        <label className='font-bold'>دسته بندی</label>
                        <input
                            type="text"
                            value={newNews.cat}
                            name="cat"
                            placeholder="دسته‌بندی"
                            onChange={handleInputChange}
                            className="border border-slate-500 mb-4 md:mb-0 rounded p-2 w-full"
                        />
                    </div>
                    <div className='flex flex-col w-full'>
                        <label className='font-bold'>تگ ها</label>
                        <input
                            type="text"
                            name="tags"
                            value={newNews.tags}
                            placeholder="تگ‌ها (با کاما جدا شوند)"
                            onChange={handleTagsChange}
                            className="border border-slate-500 rounded p-2 w-full"
                        />
                    </div>
                </div>
                <div className="mb-4 md:w-80 w-full flex flex-col md:flex-row md:justify-between items-start">
                    <div className=''>
                        <input
                            type="radio"
                            checked={isFileUpload}
                            onChange={() => setIsFileUpload(true)}
                            className='ml-2'
                        />
                        <label>
                            آپلود تصویر
                        </label>
                    </div>
                    <div className="flex justify-center items-center">
                        <input
                            type="radio"
                            checked={!isFileUpload}
                            onChange={() => setIsFileUpload(false)}
                            className='ml-2'
                        />
                        <label>
                            وارد کردن آدرس تصویر
                        </label>
                    </div>
                </div>
                {isFileUpload ? (
                    <div>
                        <div className="relative w-full sm:w-28">
                            <input
                                ref={fileInputRef}
                                multiple
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
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

                        {filesName.length > 0 && (
                            <div className=" mt-4">
                                فایل های انتخاب شده: {filesName.map((item, index) => <span key={index} className='text-sm text-green-500 ml-2  font-medium'>{` ${item} `}</span>)}
                            </div>
                        )}
                    </div>
                ) : (
                    <input
                        type="text"
                        value={newNews.image}
                        name="image"
                        placeholder="آدرس تصویر"
                        onChange={handleInputChange}
                        className="border border-slate-500 rounded p-2 w-full sm:w-52"
                    />
                )}


                <div className='flex items-center justify-between'>

                    <button type="submit" disabled={!activeSubmitButton} className={`${!activeSubmitButton && 'bg-gray-400'}  bg-blue-500 block rounded-lg mt-4 w-full sm:w-28 text-white p-2 `}>{isEditMode ? 'ویرایش خبر' : 'افزودن خبر'}</button>

                    <GrClear
                        className='hidden sm:block text-3xl text-red-500 transition-all duration-200 hover:text-red-800 cursor-pointer mt-4'
                        title='ریست کردن همه فرم ها'
                        onClick={handleClearFields}
                    />

                </div>

            </form>


            {!isEditMode && <NewsList />}
        </>
    )
}

export default AdminForm
