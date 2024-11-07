import React from 'react';
import { Link } from 'react-router-dom';

const NewsNotFound = () => {
    return (
        <div style={{ minHeight: 'calc(100vh - 123px)', minWidth: 'calc(100vw - 20px)' }} className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold mt-4 text-gray-800">خبر یافت نشد</h1>
            <p className="mt-2 text-gray-600 text-xs sm:text-lg ">متأسفیم، خبری که به دنبال آن هستید وجود ندارد.</p>
            <Link to='/'
                className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
                بازگشت به صفحه اصلی
            </Link>
        </div>
    );
}

export default NewsNotFound;
