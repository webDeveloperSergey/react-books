import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { IBook, ISort } from '../../@types/types'

export interface ISearchBookParams {
  sortBy: string
  order: string
  category: string
  search: string
  currentPage: string
}

interface IBookState {
  bookItems: IBook[]
  status: 'loading' | 'success' | 'error'
}
export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export const fetchBooks = createAsyncThunk<IBook[], ISearchBookParams>(
  'book/fetchBooksStatus',
  async (params) => {
    const { sortBy, order, category, search, currentPage } = params
    const { data } = await axios.get<IBook[]>(
      `https://62df14f79c47ff309e813ee0.mockapi.io/books?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    )
    return data
  },
)

const initialState: IBookState = {
  bookItems: [],
  status: Status.LOADING, // loading | success | error
}

export const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<IBook[]>) {
      state.bookItems = action.payload
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchBooks.pending, (state, action) => {
      state.status = Status.LOADING
      state.bookItems = []
    })

    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.status = Status.SUCCESS
      state.bookItems = action.payload
    })

    builder.addCase(fetchBooks.rejected, (state, action) => {
      state.status = Status.ERROR
      state.bookItems = []
    })
  },

  // extraReducers: {
  //   [fetchBooks.pending]: (state) => {
  //     state.status = 'loading'
  //     state.bookItems = []
  //   },
  //   [fetchBooks.fulfilled]: (state, action) => {
  //     state.status = 'success'
  //     state.bookItems = action.payload
  //   },
  //   [fetchBooks.rejected]: (state) => {
  //     state.status = 'error'
  //     state.bookItems = []
  //   },
  // },
})

export const { addItem } = bookSlice.actions
export default bookSlice.reducer
