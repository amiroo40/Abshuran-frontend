
import React, { useEffect, useState } from 'react'
import '../style/slider.css'
import { MdCircle } from "react-icons/md";
import { getNews } from '../services/newsService';
import Loading from './Loading';
import Error from './Error';

const Slider = ({ newsId }) => {

    const [news, setNews] = useState(null)
    const [slide, setSlide] = useState(0)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchNews = async () => {

            try {

                setLoading(true)
                const { data } = await getNews(newsId)
                setNews(data)
                setLoading(false)
                setError(null)

            } catch (err) {
                setError(err.message)
                setLoading(false)
            }
        }
        fetchNews()
    }, [newsId, setNews])

    useEffect(() => {
        if (news?.images) {
            const timeout = setTimeout(() => {
                setSlide(prev => (prev < news.images.length - 1 ? prev + 1 : 0))
            }, 5000)

            return () => clearTimeout(timeout)
        }
    }, [slide, news?.images])

    const handleChangeSlide = (index) => {
        setSlide(index)
    }

    if (!news?.images) {
        return <div>تصویری موجود نیست</div>
    }

    return (
        <>
            {loading && <Loading />}
            
            {error && <Error error={error} />}

            <div className='slider relative mx-auto'>
                <div className="slides">
                    {news && news.images && news.images.map((item, index) => (
                        <div
                            key={index}
                            className={`w-full h-full item ${index === slide ? 'block' : 'hidden'}`}
                        >
                            <img
                                src={item}
                                alt=""
                                className='mx-auto rounded'
                            />
                        </div>
                    ))}
                </div>
                <div className='hidden md:flex text-center justify-center gap-1 mt-2'>
                    {news.images && news.images.map((_, index) => (
                        <div className='' key={index}>
                            <MdCircle className={`${index === slide ? 'text-gray-600' : 'text-gray-400'}  cursor-pointer hover:text-gray-300 duration-200 transition-all`} onClick={() => handleChangeSlide(index)} />
                        </div>
                    ))}
                </div>

            </div>
        </>
    )
}

export default Slider
