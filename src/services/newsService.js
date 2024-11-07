import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL_NEWS;

export const getAllNews = () => axios.get(API_URL)

export const getNews = (id) => axios.get(`${API_URL}/${id}`)

export const createNews = (newsData) => {
    const token = localStorage.getItem('token');
    const options = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    }
    return axios.post(API_URL, newsData, options)
}

export const updateNews = (id, newsData) => {
    const token = localStorage.getItem('token');
    const options = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    }
    return axios.put(`${API_URL}/${id}`, newsData, options)
}

export const deleteNews = (id) => {
    const token = localStorage.getItem('token');
    const options = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    return axios.delete(`${API_URL}/${id}`, options);
};


