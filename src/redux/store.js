import { configureStore } from '@reduxjs/toolkit'

import cart from './slices/cartSlice'
import filter from './slices/filterSlice'
import search from './slices/searchSlice'

export const store = configureStore({
  reducer: {
    filter,
    search,
    cart,
  },
})
