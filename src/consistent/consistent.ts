import type { SearchReponse } from '@/api/types'

export const DEFAULT_SEARCH_DATA: SearchReponse = {
	meta: {
		total_count: 0,
		pageable_count: 0,
		is_end: true,
	},
	documents: [],
}

export const PAGE_SIZE = 10
