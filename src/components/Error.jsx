import React from 'react';

const Error = ({ title = "خطایی رخ داده", error, onRetry }) => {
    return (
        <div  style={{ minHeight: 'calc(100vh - 123px)', minWidth: 'calc(100vw - 20px)' }} className="sl:mt-32 mt-16 flex items-center justify-center px-4">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
                <h2 className="text-2xl font-bold text-red-600 mb-4">{title}</h2>
                <p className="text-red-700 mb-6">{error}</p>
                {onRetry && (
                    <button
                        // onClick={onRetry}
                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-500"
                    >
                        تلاش دوباره
                    </button>
                )}
            </div>
        </div>
    );
};

export default Error;
