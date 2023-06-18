import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { ICartItem } from '../../@types/types'
import { calcTotal } from '../../utils/calcTotal'
import { findItem } from '../../utils/findItem'
import { RootState } from '../store'

interface ICartState {
  totalPrice: number
  totalCount: number
  items: ICartItem[]
}

const initialState: ICartState = {
  totalPrice: 0,
  totalCount: 0,
  items: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<ICartItem>) {
      const currentItem = findItem(state.items, action.payload.id)

      if (currentItem) {
        currentItem.count++
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        })
      }

      state.totalPrice = calcTotal(state.items, true)
      state.totalCount = calcTotal(state.items, false)
    },

    minusItem(state, action: PayloadAction<string>) {
      const currentItem = findItem(state.items, action.payload)
      if (currentItem) currentItem.count--

      state.totalPrice = calcTotal(state.items, true)
      state.totalCount = calcTotal(state.items, false)
    },

    removeItem(state, action: PayloadAction<string>) {
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

export const selectCart = (state: RootState) => state.cart

export const { addItem, removeItem, minusItem, clearCart } = cartSlice.actions
export default cartSlice.reducer
