import React, { useContext } from 'react'
import moment from 'moment-jalaali'
import { useNavigate } from 'react-router-dom';
import useScreenSize from '../hooks/useScreenSize'
import NewsContext from '../context/newsContext';

moment.loadPersian({ dialect: 'persian-modern', usePersianDigits: true });

const FifthToLastNews = () => {

    const screenSize = useScreenSize();
    const navigate = useNavigate()

    const sl = screenSize < 1024

    const handleShowNews = (cat, id) => {
        navigate(`/${cat}/${id}`)
    }

    const { news, getSummary } = useContext(NewsContext)

    return (
        <div className='mt-12 md:grid md:grid-cols-2'>

            {news && news.slice(4, 14).map((item) => (
                <div key={item._id} className=' mt-6 flex flex-col ml-2 mr-4'>

                    <div className="flex justify-start">

                        <img
                            src={item.images[0]}
                            alt="تصویر خبری"
                            className=' cursor-pointer rounded w-20 h-20 sl:w-32 sl:h-32 '
                            onClick={() => { handleShowNews(item.cat, item._id) }}
                        />

                        <div className='flex flex-col mr-4'>

                            <h3 className='hidden sl:block font-bold text-sm text-gray-600'>{item.overTitle}</h3>

                            <h2 className='sl:my-3 cursor-pointer font-semibold text-xl sl:text-2xl' onClick={() => { handleShowNews(item.cat, item._id) }}>{getSummary(item.title, 3)}...</h2>

                            <h3 className='cursor-pointer text-xs sl:text-sm text-gray-800' onClick={() => { handleShowNews(item.cat, item._id) }}>{sl ? getSummary(item.lead, 12) : getSummary(item.lead, 20)}...</h3>

                            <span className='text-gray-700 mb-1 mt-auto text-xs sl:text-sm '>{moment(item.date).format('jD jMMMM jYYYY')}</span>

                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default FifthToLastNews
