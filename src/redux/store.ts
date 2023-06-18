import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import book from './slices/bookSlice'
import cart from './slices/cartSlice'
import filter from './slices/filterSlice'
import search from './slices/searchSlice'

export const store = configureStore({
  reducer: {
    filter,
    search,
    cart,
    book,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
