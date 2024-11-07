import React, { useContext, useEffect, useRef } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { CiSearch } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import NewsContext from '../context/newsContext';
import useScreenSize from '../hooks/useScreenSize';

const Search = () => {
    const screenSize = useScreenSize();
    const sm = screenSize < 768;
    const { isSearchActive, setNewsState, setMenuState, news, isActiveMenu, searchQuery } = useContext(NewsContext);
    const inputRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (isSearchActive) inputRef.current.focus();
    }, [isSearchActive]);

    const toggleSearchInput = () => {
        setMenuState(prev => ({
            ...prev,
            isSearchActive: sm && isActiveMenu ? true : !isSearchActive
        }));
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const trimmedQuery = searchQuery.trim().toLowerCase().replace(/\s+/g, ' ');

        if (trimmedQuery) {
            const filtered = news.filter(item =>
                item.title.includes(trimmedQuery) || item.des.includes(trimmedQuery)
            );

            setNewsState(prev => ({
                ...prev,
                filteredNews: filtered,
                searchQuery: ''
            }));

            setMenuState(prev => ({ ...prev, isActiveMenu: false, isSearchActive: false }));
            navigate('/search-results');
        }
    };

    return (
        <div className={`${isSearchActive ? 'md:w-72 w-64' : 'w-0 md:w-10 overflow-hidden'} flex items-center justify-between ml-3 transition-all duration-300`} dir="rtl">
            {isSearchActive && (
                <AiOutlineClose onClick={toggleSearchInput} className="hidden md:block cursor-pointer font-extrabold text-2xl ml-2" />
            )}
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    ref={inputRef}
                    value={searchQuery}
                    onChange={(e) => setNewsState(prev => ({ ...prev, searchQuery: e.target.value }))}
                    className={`transition-all duration-300 outline-none ${isSearchActive ? 'md:w-60 px-3 py-2' : 'w-0 px-0 py-0'}`}
                    placeholder="جستجو..."
                />
            </form>
            <CiSearch onClick={toggleSearchInput} className="cursor-pointer font-extrabold text-2xl mr-2" />
        </div>
    );
};

export default Search;
