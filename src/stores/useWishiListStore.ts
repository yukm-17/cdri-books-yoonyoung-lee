import { DEFAULT_SEARCH_DATA } from '@/consistent/consistent'
import type { Document } from '@/types/types'
import { create } from 'zustand'
import { combine, persist, subscribeWithSelector } from 'zustand/middleware'

const initialState = { wishList: DEFAULT_SEARCH_DATA }

export const useWishiListStore = create(
	persist(
		subscribeWithSelector(
			combine(initialState, set => ({
				setWishList: (document: Document) =>
					set(state => ({
						wishList: {
							meta: state.wishList.meta,
							documents: [...state.wishList.documents, document],
						},
					})),
				removeWishList: (isbn: string) =>
					set(state => ({
						wishList: {
							meta: state.wishList.meta,
							documents: state.wishList.documents.filter(item => item.isbn !== isbn),
						},
					})),
			})),
		),
		{
			name: 'wishList',
		},
	),
)
