
import React from 'react'

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import BookBlock from '../components/BookBlock';
import Sceleton from '../components/BookBlock/Sceleton';
import Paginate from '../components/Paginate';

import { useSelector, useDispatch } from 'react-redux';
import {setCurrentPage} from '../redux/slices/filterSlice'

import '../scss/app.scss'
import axios from 'axios';




function Home() {
  const [books, setBooks] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)

  console.log(books)

  const dispatch = useDispatch()

  const {categoryId, sort, currentPage } = useSelector((state) => state.filter)

  const searchValue = useSelector(state => state.search.searchValue)

  const onChangePage = number => {
    dispatch(setCurrentPage(number))
  }

  React.useEffect(() => {
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

  }, [categoryId, sort.sortProperty, searchValue, currentPage])

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
