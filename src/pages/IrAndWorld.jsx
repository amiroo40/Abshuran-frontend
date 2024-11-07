import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { Error, FirstNewsItem, Loading, NewsNotFound, OtherNewsItem } from '../components';
import NewsContext from '../context/newsContext';

const IrAndWorld = () => {

    const { news, error, loading } = useContext(NewsContext)

    const irAndWorldNews = news.filter(item => item.cat === 'ir-world')

    const navigate = useNavigate()

    const handleShowNews = (cat, id) => {
        navigate(`/${cat}/${id}`)
    }

    const firstNews = irAndWorldNews[0]
    const otherNews = irAndWorldNews.slice(1)

    return (
        <>
            {loading && <Loading />}

            {error && <Error error={error} />}

            {(news && !loading) &&
                (irAndWorldNews.length === 0 ? <NewsNotFound />
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

export default IrAndWorld
