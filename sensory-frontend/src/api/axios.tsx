import axios from 'axios';

const BASE_URL = 'http://localhost:3000'
export default axios.create({
	baseURL: BASE_URL,
})

export const axiosPrivate= axios.create({
	baseURL: BASE_URL,
	headers: {"x-access-token":  localStorage.getItem("accessToken")},
	withCredentials: true
})

// export const axiosHeader = axios.create({
// 	baseURL: BASE_URL, { headers:authHeader() }
// })