import { createSlice } from '@reduxjs/toolkit'

import { calcTotal } from '../../utils/calcTotal'
import { findItem } from '../../utils/findItem'

const initialState = {
  totalPrice: 0,
  totalCount: 0,
  items: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const currentItem = findItem(state.items, action.payload.id)

      if (currentItem) {
        currentItem.count++
      } else {
        state.items.push({ ...action.payload, count: 1 })
      }

      state.totalPrice = calcTotal(state.items, true)
      state.totalCount = calcTotal(state.items, false)
    },

    minusItem(state, action) {
      const currentItem = findItem(state.items, action.payload)
      if (currentItem) currentItem.count--

      state.totalPrice = calcTotal(state.items, true)
      state.totalCount = calcTotal(state.items, false)
    },

    removeItem(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload)

      state.totalPrice = calcTotal(state.items, true)
      state.totalCount = calcTotal(state.items, false)
    },

    clearCart(state) {
      state.items = []
      state.totalPrice = 0
      state.totalCount = 0
    },
  },
})

export const { addItem, removeItem, minusItem, clearCart } = cartSlice.actions
export default cartSlice.reducer
