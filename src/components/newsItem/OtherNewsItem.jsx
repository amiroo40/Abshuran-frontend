import moment from 'moment-jalaali'
import React, { useContext } from 'react'
import NewsContext from '../../context/newsContext';
import useScreenSize from '../../hooks/useScreenSize';
moment.loadPersian({ dialect: 'persian-modern', usePersianDigits: true });

const OtherNewsItem = ({ otherNews, handleShowNews }) => {

    const screenSize = useScreenSize()

    const { getSummary } = useContext(NewsContext)

    const sl = screenSize < 1024

    return (
        <>
            {otherNews && otherNews.length > 0 && (
                <div>

                    <div className='grid grid-cols-1 border-y-2 mt-10 py-8 mx-10 md:grid-cols-3 gap-3 md:pb-32'>

                        {otherNews.slice(0, 3).map((item) => (
                            <div key={item._id} className={`mt-4 md:p-1 flex-1 ${otherNews.length > 2 ? '' : ''}`}>

                                <img
                                    src={item.images[0]}
                                    alt="تصویر خبری"
                                    className=' cursor-pointer rounded md:w-full md:h-full object-cover'
                                    onClick={() => { handleShowNews(item.cat, item._id) }}
                                />

                                <h3 className='mt-2 cursor-pointer text-xl' onClick={() => { handleShowNews(item.cat, item._id) }}>{getSummary(item.lead, 40)}</h3>

                                <span className='text-gray-800 mt-2 text-lg'>{moment(item.date).format('jD jMMMM jYYYY')}</span>

                            </div>
                        ))}

                    </div>

                    {otherNews.length > 3 && (
                        <div className='mt-12 md:grid md:grid-cols-2'>

                            {otherNews.slice(3).map((item) => (
                                <div key={item._id} className='mt-6 flex flex-col ml-2 mr-4'>

                                    <div className='flex justify-start'>

                                        <img
                                            src={item.images[0]}
                                            alt="تصویر خبری"
                                            className='cursor-pointer rounded w-20 h-20 sl:w-32 sl:h-32'
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
                    )}
                </div>
            )}
        </>
    )
}

export default OtherNewsItem;
