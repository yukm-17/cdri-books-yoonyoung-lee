import axios from 'axios'

export const apiInstance = axios.create({
	baseURL: 'https://dapi.kakao.com/v3',
	headers: { Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_API_KEY}` },
})
