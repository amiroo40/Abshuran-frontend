import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import moment from 'moment-jalaali'
import NewsContext from '../context/newsContext';
import Slider from './Slider';
import { getNews } from '../services/newsService';
import Loading from './Loading';
import Error from './Error';

moment.loadPersian({ dialect: 'persian-modern', usePersianDigits: true });

const ShowNews = () => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [news, setNews] = useState(null)
    const { id } = useParams()
    const { handleScroll, scrolled, gallery } = useContext(NewsContext)
    const navigate = useNavigate()

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    useEffect(() => {
        const fetchNews = async () => {
            try {

                setLoading(true)
                const response = await getNews(id)
                setNews(response.data)
                setLoading(false)
                setError(null)

            } catch (err) {
                setError(err.message)
                setLoading(false)
            }

        }

        fetchNews()

    }, [id, setNews])

    return (

        <>

            {loading && <Loading />}

            {error && <Error error={error} />}

            <div className='sl:mt-36 md:ml-4 mt-20 md:flex md:justify-between'>

                {!error && <div className='hidden md:block'>
                    <div onClick={() => navigate('/gallery')} className={`${scrolled ? 'sl:top-20' : 'sl:top-36'} transition-all duration-300 fixed md:top-20 left-auto w-1/6 right-2 cursor-pointer`}>
                        {gallery && gallery.slice(0, 1).map(item => (
                            <img
                                key={item._id}
                                src={item.image}
                                alt=""
                                className='w-11/12 h-5/6 rounded'
                            />
                        ))}
                    </div>
                </div>
                }
                {news &&
                    <div className='md:border-r border-gray-500 md:flex-initial md:w-5/6'>


                        <div>

                            <h4 className='font-bold text-center text-xl text-gray-700 mb-2'>{news.overTitle}</h4>

                            <h2 className='font-extrabold text-center text-4xl mb-2 text-gray-900'>{news.title}</h2>

                            <h4 className="font-bold text-center text-gray-700">{news.lead}</h4>

                            <div className='text-center my-1 xl:my-3 text-gray-600 text-lg'>
                                <span>{moment(news.date).format('jD jMMMM jYYYY ، ساعت HH:mm')}</span>
                            </div>

                            {news.images.length > 1 ?
                                <Slider newsId={news._id} />
                                :
                                <img
                                    src={news.images[0]}
                                    alt="تصویر خبری"
                                    className='w-4/6 rounded mx-auto h-3/4'
                                />
                            }

                            <p className='m-4'>{news.des}</p>

                            <div className="m-4">
                                {news.tags.map((tag, index) => (
                                    <span key={index} className='ml-auto m-1'>#{tag}</span>
                                ))}

                            </div>

                        </div>

                    </div>
                }

            </div>
        </>
    )
}

export default ShowNews