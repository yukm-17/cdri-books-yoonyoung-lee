import type { Document, Meta } from '@/types/types'

export interface SearchRequest {
	query: string
	sort?: string
	page?: number
	size?: number
	target?: string
}

export interface SearchReponse {
	meta: Meta
	documents: Document[]
}
