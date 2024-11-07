import React, { useContext } from 'react'
import moment from 'moment-jalaali'
import { useNavigate } from 'react-router-dom';
import NewsContext from '../context/newsContext';

moment.loadPersian({ dialect: 'persian-modern', usePersianDigits: true });

const SecondToFourthNews = () => {

    const { news, getSummary } = useContext(NewsContext)

    const navigate = useNavigate()

    const handleShowNews = (cat, id) => {
        navigate(`/${cat}/${id}`)
    }

    return (

        <>
            <div className='grid grid-cols-1 md:grid-cols-3 border-y-2 mt-10 py-8 mx-10 md:gap-3 md:pb-32'>
                {news && news.slice(1, 4).map((item) => (
                    <div key={item._id} className='mt-4 md:p-1 flex-1'>

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
        </>
    )
}

export default SecondToFourthNews
