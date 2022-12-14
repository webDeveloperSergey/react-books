/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useDispatch } from 'react-redux'
import { setSearchValue } from '../../redux/slices/searchSlice'

import searchIc from '../../assets/img/search-ic.svg'
import closeIc from '../../assets/img/close-ic.svg'
import debounce from 'lodash.debounce'


const Search = () => {
  const dispatch = useDispatch()
  const [ value, setValue ] = React.useState('')
  const inputRef = React.useRef()


  const clearInput = () => {
    dispatch(setSearchValue(''))
    setValue('')
    inputRef.current.focus()
  }
  
  const updateSearchValue = React.useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str))
    }, 250),
    []
  )

  const onChangeInput = (event) => {
    setValue(event.target.value)
    updateSearchValue(event.target.value)
  }
  

  return (
    <div className="search">
      <input ref={inputRef} value={value} onChange={event => onChangeInput(event)} className="search__input" placeholder="Поиск ..."/>
      {
      value
      ? <img onClick={() => clearInput()} className="search__ic search__ic--close" src={closeIc} alt="close"/>
      : <img className="search__ic" src={searchIc} alt="search"/>
      }
    </div>
  )
}


export default Search