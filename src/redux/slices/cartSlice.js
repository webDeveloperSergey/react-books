import { createSlice } from '@reduxjs/toolkit'

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
      const findItem = state.items.find((obj) => obj.id === action.payload.id)

      if (findItem) {
        findItem.count++
      } else {
        state.items.push({ ...action.payload, count: 1 })
      }

      state.totalPrice = state.items.reduce((sum, obj) => sum + obj.price * obj.count, 0)

      state.totalCount = state.items.reduce((sum, obj) => sum + obj.count, 0)
    },

    minusItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload)
      if (findItem) findItem.count--
      state.totalCount = state.items.reduce((sum, obj) => sum + obj.count, 0)
    },

    removeItem(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload)
    },
  },
})

export const { addItem, removeItem, minusItem } = cartSlice.actions
export default cartSlice.reducer
