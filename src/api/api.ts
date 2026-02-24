import { apiInstance } from '@/api/instance'
import type { SearchReponse, SearchRequest } from '@/api/types'

export const searchBook = ({ query, sort, page, size, target }: SearchRequest) =>
	apiInstance.get<SearchReponse>('/search/book', {
		params: { query, sort, page, size, target },
	})
