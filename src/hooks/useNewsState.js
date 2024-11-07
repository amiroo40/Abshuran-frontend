import { useState, useEffect } from 'react';
import { getAllNews } from '../services/newsService';

const useNewsState = () => {
    const [newsState, setNewsState] = useState({
        searchQuery: '',
        filteredNews: [],
        news: [],
        loading: false,
        error: null,
    });

    const [menuState, setMenuState] = useState({
        isSearchActive: false,
        isActiveMenu: false,
        scrolled: false,
    });

    useEffect(() => {
        const fetchNews = async () => {
            try {
                setNewsState((prev) => ({
                    ...prev,
                    loading: true,
                }))

                const response = await getAllNews()

                setNewsState((prev) => ({ ...prev, news: response.data, loading: false, error: null }));

            }
            catch (err) {
                console.log(err)
                setNewsState((prev) => ({ ...prev, error: err.message, loading: false }));
            }
        };

        fetchNews();

    }, []);

    useEffect(() => {
        document.body.style.overflow = menuState.isActiveMenu ? 'hidden' : 'auto';

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [menuState.isActiveMenu]);

    const openSidebar = () => {
        const newState =
            menuState.isActiveMenu === menuState.isSearchActive
                ? !menuState.isActiveMenu
                : menuState.isSearchActive;
        setMenuState({ ...menuState, isActiveMenu: newState, isSearchActive: newState });
    };

    const closeSidebar = () => {
        setMenuState({ ...menuState, isActiveMenu: false, isSearchActive: false });
    };

    const handleScroll = () => {
        const offset = window.scrollY;
        setMenuState((prev) => ({ ...prev, scrolled: offset > 150 }));
    };

    return {
        newsState,
        setNewsState,
        menuState,
        setMenuState,
        openSidebar,
        closeSidebar,
        handleScroll,
    };
};

export default useNewsState;
