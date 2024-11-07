import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import moment from 'moment-jalaali'
import NewsContext from '../context/newsContext';

moment.loadPersian({ dialect: 'persian-modern', usePersianDigits: true });

const FirstNews = () => {

    const navigate = useNavigate()

    const { news, getSummary, gallery } = useContext(NewsContext)

    const handleShowNews = (cat, id) => {
        navigate(`/${cat}/${id}`)
    }

    return (

        <div className='sl:mx-12 md:flex p-10 sl:p-0 sl:gap-4'>

            <div className="hidden sl:block" style={{ width: 'calc(16.666% + 60px)' }}>

                {gallery && gallery.slice(0, 1).map(item => (
                    <img
                        key={item._id}
                        src={item.image}
                        alt="تصویر ماهنامه"
                        className='w-full h-full cursor-pointer rounded object-cover'
                        onClick={() => navigate('/gallery')}
                    />
                ))}
            </div>

            <div className='flex-1 flex'>

                {news && news.slice(0, 1).map((item) => (
                    <div key={item._id} className='flex flex-col sl:flex-row-reverse sl:justify-between flex-1'>
                        <img
                            src={item.images[0]}
                            alt="تصویر خبری"
                            className='cursor-pointer rounded-l block w-full sl:w-3/4 h-auto sl:h-full object-cover'
                            onClick={() => { handleShowNews(item.cat, item._id) }}
                        />

                        <div className='bg-black rounded-r sl:h-full sl:w-1/4 sl:p-4 p-2 flex flex-col'>
                            <h3 className='text-gray-400'>{item.overTitle}</h3>
                            <h2 className='my-2 cursor-pointer sl:text-3xl text-2xl text-white' onClick={() => { handleShowNews(item.cat, item._id) }}>{item.title}</h2>
                            <h3 className='text-gray-400'>{item.lead}</h3>
                            <span className='my-1 sl:my-6 text-blue-700 text-xs sl:text-sm'>{moment(item.date).format('jD jMMMM jYYYY ، ساعت HH:mm')}</span>
                            <p className="cursor-pointer text-sm sl:text-xl text-gray-300" onClick={() => { handleShowNews(item.cat, item._id) }}>{getSummary(item.des, 15)}...</p>
                        </div>
                    </div>
                ))}
            </div>

        </div>

    )
}

export default FirstNews
