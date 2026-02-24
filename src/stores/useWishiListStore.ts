import { DEFAULT_SEARCH_DATA } from '@/constants/constants'
import type { Document } from '@/types/types'
import { create } from 'zustand'
import { combine, persist, subscribeWithSelector } from 'zustand/middleware'

const initialState = { wishList: DEFAULT_SEARCH_DATA }

export const useWishiListStore = create(
	persist(
		subscribeWithSelector(
			combine(initialState, set => ({
				setWishList: (document: Document) =>
					set(state => {
						const documents = [...state.wishList.documents, document]

						return {
							wishList: {
								meta: {
									...state.wishList.meta,
									total_count: documents.length,
								},
								documents,
							},
						}
					}),
				removeWishList: (isbn: string) =>
					set(state => {
						const documents = state.wishList.documents.filter(item => item.isbn !== isbn)

						return {
							wishList: {
								meta: {
									...state.wishList.meta,
									total_count: documents.length,
								},
								documents,
							},
						}
					}),
			})),
		),
		{
			name: 'wishList',
		},
	),
)
