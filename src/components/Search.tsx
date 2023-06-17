/* eslint-disable react-hooks/exhaustive-deps */
import debounce from 'lodash.debounce'
import React from 'react'
import { useDispatch } from 'react-redux'

import closeIc from '../assets/img/close-ic.svg'
import searchIc from '../assets/img/search-ic.svg'
import { setSearchValue } from '../redux/slices/searchSlice'

const Search: React.FC = () => {
  const dispatch = useDispatch()
  const [value, setValue] = React.useState<string>('')
  const inputRef = React.useRef<HTMLInputElement>(null)

  const clearInput = () => {
    dispatch(setSearchValue(''))
    setValue('')
    inputRef.current?.focus()
  }

  const updateSearchValue = React.useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str))
    }, 250),
    [],
  )

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
    updateSearchValue(event.target.value)
  }

  return (
    <div className='search'>
      <input
        ref={inputRef}
        value={value}
        onChange={(event) => onChangeInput(event)}
        className='search__input'
        placeholder='Поиск ...'
      />
      {value ? (
        <img
          onClick={() => clearInput()}
          className='search__ic search__ic--close'
          src={closeIc}
          alt='close'
        />
      ) : (
        <img className='search__ic' src={searchIc} alt='search' />
      )}
    </div>
  )
}

export default Search
