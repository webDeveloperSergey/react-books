
import React from 'react'

import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import BookBlock from '../components/BookBlock';
import Sceleton from '../components/BookBlock/Sceleton';
import Paginate from '../components/Paginate';

import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {setCurrentPage, setFilters} from '../redux/slices/filterSlice'
import { useNavigate } from 'react-router-dom';
import qs from 'qs';

import '../scss/app.scss'




function Home() {

  const [books, setBooks] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)

  const isSearch = React.useRef(false)
  const isMounted = React.useRef(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { categoryId, sort, currentPage } = useSelector((state) => state.filter)
  const searchValue = useSelector(state => state.search.searchValue)

  const onChangePage = number => {
    dispatch(setCurrentPage(number))
  }

  const fetchBooks = () => {
    setIsLoading(true)

    const sortBy = sort.sortProperty.replace('-', '')
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
    const category = categoryId > 0 ? `category=${categoryId}` : ''
    const search = searchValue ? `&search=${searchValue}` : ''

    axios
    .get(`https://62df14f79c47ff309e813ee0.mockapi.io/books?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
    .then((res) => {
      setBooks(res.data)
      setIsLoading(false)
    })
  }

  React.useEffect(() => {
    if(window.location.search) {
      const params = qs.parse(window.location.search.substring(1))

      const sort = sortList.find(obj => obj.sortProperty === params.sortProperty)

      dispatch(
        setFilters({
          ...params,
          sort
        })
      )

      isSearch.current = true
    }
  }, [])

  React.useEffect(() => {
    window.scrollTo(0, 0)

    if(!isSearch.current) {
      fetchBooks()
    }

    isSearch.current = false
  }, [categoryId, sort.sortProperty, searchValue, currentPage])


  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage
      })
  
      navigate(`?${queryString}`)
    }

    isMounted.current = true

  }, [categoryId, sort.sortProperty, currentPage])

  return (
    <div className="Home">

      <div className="container">

        <div className="filter">
          <Categories/>
          <Sort />
        </div>

        <div className="content-book">
          {
            isLoading
            ? [...new Array(4)].map((_, index) => <Sceleton key={index}/>)
            : books.map((obj) => <BookBlock key={obj.id} {...obj}/>)
          }
        </div>

        <Paginate onChangePage={onChangePage}/>
        
      </div>

    </div>
  );
}

export default Home;
