/**
 * 책 리스트 조회 메타 데이터
 */
export interface Meta {
	total_count: number
	pageable_count: number
	is_end: boolean
}

/**
 * 책 리스트 아이템 데이터 타입
 */
export interface Document {
	title: string
	contents: string
	url: string
	isbn: string
	datetime: string
	authors: string[]
	publisher: string
	translators: string[]
	price: number
	sale_price: number
	thumbnail: string
	status: string
}
