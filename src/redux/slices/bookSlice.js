import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchBooks = createAsyncThunk('book/fetchBooksStatus', async (params) => {
  const { sortBy, order, category, search, currentPage } = params
  const { data } = await axios.get(
    `https://62df14f79c47ff309e813ee0.mockapi.io/books?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
  )
  return data
})

const initialState = {
  bookItems: [],
  status: 'loading', // loading | success | error
}

export const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    addItem(state, action) {
      state.bookItems = action.payload
    },
  },

  extraReducers: {
    [fetchBooks.pending]: (state) => {
      state.status = 'loading'
      state.bookItems = []
    },
    [fetchBooks.fulfilled]: (state, action) => {
      state.status = 'success'
      state.bookItems = action.payload
    },
    [fetchBooks.rejected]: (state) => {
      state.status = 'error'
      state.bookItems = []
    },
  },
})

export const { addItem } = bookSlice.actions
export default bookSlice.reducer
