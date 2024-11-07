import React, { useEffect, useState } from 'react';
import NewsContext from './newsContext';
import useNewsState from '../hooks/useNewsState';
import { getSummary } from '../utils/newsHelper';
import { getGallery } from '../services/galleryService';

const NewsProvider = ({ children }) => {
    const [gallery, setGallery] = useState([])
    const [loadingGallery, setLoadingGallery] = useState(false)
    const [errorGallery, setErrorGallery] = useState(null)

    useEffect(() => {
        const fetchGallery = async () => {

            try {
                setLoadingGallery(true)
                
                const response = await getGallery()
                setGallery(response.data)
                setLoadingGallery(false)
                setErrorGallery(null)

            } catch (err) {
                setErrorGallery(err.message)
                setLoadingGallery(false)
            }
        }

        fetchGallery()
    }, [])

    const {
        newsState,
        setNewsState,
        menuState,
        setMenuState,
        openSidebar,
        closeSidebar,
        handleScroll,

    } = useNewsState();

    return (
        <NewsContext.Provider
            value={{
                loadingGallery,
                setLoadingGallery,
                errorGallery,
                setErrorGallery,
                gallery,
                setGallery,
                ...newsState,
                setNewsState,
                ...menuState,
                setMenuState,
                openSidebar,
                closeSidebar,
                handleScroll,
                getSummary,
            }}
        >
            {children}
        </NewsContext.Provider>
    );
};

export default NewsProvider;
