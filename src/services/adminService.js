import axios from "axios"

const API_URL = `${process.env.REACT_APP_API_URL}/api/admin/login`;

export const postAdmin = (data) => axios.post(API_URL, data)