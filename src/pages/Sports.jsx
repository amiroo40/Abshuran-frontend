import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { Error, FirstNewsItem, Loading, NewsNotFound, OtherNewsItem } from '../components';
import NewsContext from '../context/newsContext';

const Sports = () => {

    const { news, error, loading } = useContext(NewsContext)

    const sportsNews = news.filter(item => item.cat === 'sports')

    const navigate = useNavigate()

    const handleShowNews = (cat, id) => {
        navigate(`/${cat}/${id}`)
    }

    const firstNews = sportsNews[0]
    const otherNews = sportsNews.slice(1)

    return (
        <>
            {loading && <Loading />}

            {error && <Error error={error} />}

            {(news && !loading) &&
                (sportsNews.length === 0 ? <NewsNotFound />
                    :
                    <div className='sl:mt-36 mt-16'>

                        <div className='xl:mx-12'>
                            <div className='xl:mx-8'>
                                <FirstNewsItem
                                    firstNews={firstNews}
                                    handleShowNews={handleShowNews}
                                />
                            </div>
                            <OtherNewsItem
                                otherNews={otherNews}
                                handleShowNews={handleShowNews}
                            />
                        </div>
                    </div>
                )}
        </>
    )
}

export default Sports
