import React, { useContext } from 'react';
import moment from 'moment-jalaali';
import { useNavigate } from 'react-router-dom';
import { Error, Loading, NewsNotFound } from '../components';
import NewsContext from '../context/newsContext';
import useScreenSize from '../hooks/useScreenSize';

moment.loadPersian({ dialect: 'persian-modern', usePersianDigits: true });

const SearchResults = () => {

    const screenSize = useScreenSize()

    const { filteredNews, getSummary, error, loading } = useContext(NewsContext);

    const navigate = useNavigate();

    const sl = screenSize < 1024

    const handleShowNews = (cat, id) => {
        navigate(`/${cat}/${id}`);
    };

    return (
        <>
            {loading && <Loading />}

            {error && <Error error={error} />}

            <div className='sl:mt-36 mt-16 md:grid md:grid-cols-2'>
                {filteredNews.length === 0 ? <NewsNotFound /> : filteredNews && filteredNews.map((item) => (
                    <div key={item._id} className='mt-6 flex flex-col ml-2 mr-4'>
                        <div className="flex justify-start">
                            <img
                                src={item.images[0]}
                                alt="تصویر خبری"
                                className='cursor-pointer w-20 h-20 sl:w-32 sl:h-32'
                                onClick={() => handleShowNews(item.cat, item._id)}
                            />
                            <div className='flex flex-col mr-4'>
                                <h2 className='cursor-pointer font-semibold text-xl sl:text-2xl' onClick={() => handleShowNews(item.cat, item._id)}>
                                    {getSummary(item.title, 3)}...
                                </h2>
                                <p className='mt-2 cursor-pointer text-xs sl:text-sm text-gray-800' onClick={() => handleShowNews(item.cat, item._id)}>
                                    {sl ? getSummary(item.des, 12) : getSummary(item.des, 20)}...
                                </p>
                                <span className='text-gray-700 mb-1 mt-auto text-xs sl:text-sm'>
                                    {moment(item.date).format('jD jMMMM jYYYY')}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default SearchResults;
