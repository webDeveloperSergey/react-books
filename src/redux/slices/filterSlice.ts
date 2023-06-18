import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { ISort, SortPropertyEnum } from '../../@types/types'
import { RootState } from '../store'

export interface IFilterState {
  categoryId: number
  currentPage: number
  sort: ISort
}

const initialState: IFilterState = {
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: 'популярности',
    sortProperty: SortPropertyEnum.RATING_DESC,
  },
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload
    },
    setSort(state, action: PayloadAction<ISort>) {
      state.sort = action.payload
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload
    },
    setFilters(state, action: PayloadAction<IFilterState>) {
      if (Object.keys(action.payload).length) {
        state.currentPage = Number(action.payload.currentPage)
        state.categoryId = Number(action.payload.categoryId)
        state.sort = action.payload.sort
      } else {
        state.currentPage = 1
        state.categoryId = 0
        state.sort = {
          name: 'популярности',
          sortProperty: SortPropertyEnum.RATING_DESC,
        }
      }
    },
  },
})

export const selectFilter = (state: RootState) => state.filter

export const { setCategoryId, setSort, setCurrentPage, setFilters } = filterSlice.actions
export default filterSlice.reducer
