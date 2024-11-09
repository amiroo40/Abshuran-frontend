import axios from "axios"

const API_URL = `${process.env.REACT_APP_API_URL}/api/gallery`;

export const getGallery = () => axios.get(API_URL)

export const getMagazine = (id) => axios.get(`${API_URL}/${id}`)

export const createMagazine = (magazineData) => {
    const token = localStorage.getItem('token');
    const options = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    }
    return axios.post(API_URL, magazineData, options)
}

export const deleteMagazine = (id) => {
    const token = localStorage.getItem('token');
    const options = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    return axios.delete(`${API_URL}/${id}`, options)
}