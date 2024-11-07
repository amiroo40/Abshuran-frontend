import React, { useContext } from 'react'
import moment from 'moment-jalaali'
import NewsContext from '../context/newsContext';
import Loading from '../components/Loading';
import { Error } from '../components';
moment.loadPersian({ dialect: 'persian-modern', usePersianDigits: true });

const Gallery = () => {
    const { gallery, loadingGallery, errorGallery } = useContext(NewsContext)
    return (

        <>
            {loadingGallery && <Loading />}

            {errorGallery && <Error error={errorGallery} />}

            <div className='mt-20 px-4 sl:mt-36 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 sl:grid-cols-4 gap-2 '>
                {gallery && gallery.map(item => (
                    <div key={item._id} className='w-full h-full'>
                        <img
                            src={item.image}
                            className='object-cover w-full height-90 mt-3 rounded'
                            alt=""
                        />
                        <span className='text-gray-700 mb-1 mt-auto text-sm sl:text-xl '>{moment(item.date).format('jD jMMMM jYYYY')}</span>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Gallery
