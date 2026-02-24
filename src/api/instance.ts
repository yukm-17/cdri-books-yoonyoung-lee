import axios from 'axios'

export const apiInstance = axios.create({
	baseURL: import.meta.env.VITE_KAKAO_API_URL,
	headers: { Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_API_KEY}` },
})
