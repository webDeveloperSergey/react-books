import qs from 'qs'
import React from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { useNavigate } from 'react-router-dom'

import BookItem from '../components/BookItem'
import Sceleton from '../components/BookItem/Sceleton'
import Categories from '../components/Categories'
import Paginate from '../components/Paginate'
import Sort, { sortList } from '../components/Sort'

import { fetchBooks } from '../redux/slices/bookSlice'
import { selectFilter, setCurrentPage, setFilters } from '../redux/slices/filterSlice'

import '../scss/app.scss'

function Home() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const isSearch = React.useRef(false)
  const isMounted = React.useRef(false)

  const { categoryId, sort, currentPage } = useSelector(selectFilter)

  const { bookItems, status } = useSelector((state: any) => state.book)

  const searchValue = useSelector((state: any) => state.search.searchValue)

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page))
  }

  const getBooks = async () => {
    const sortBy = sort.sortProperty.replace('-', '')
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
    const category = categoryId > 0 ? `category=${categoryId}` : ''
    const search = searchValue ? `&search=${searchValue}` : ''

    //@ts-ignore need to fix
    dispatch(fetchBooks({ sortBy, order, category, search, currentPage }))
  }

  // Забираем инфу с поисковой строки и записываем в стейт
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))

      const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty)

      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      )

      isSearch.current = true
    }
  }, [])

  React.useEffect(() => {
    window.scrollTo(0, 0)

    if (!isSearch.current) {
      getBooks()
    }

    isSearch.current = false
  }, [categoryId, sort.sortProperty, searchValue, currentPage])

  // Берем данные из стейта и генерируем строку запроса
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      })

      navigate(`?${queryString}`)
    }

    isMounted.current = true
  }, [categoryId, sort.sortProperty, currentPage])

  const books = bookItems.map((obj: IBook) => <BookItem key={obj.id} {...obj} />)
  const skeletons = [...new Array(4)].map((_, index) => <Sceleton key={index} />)

  return (
    <div className='Home'>
      <div className='container'>
        <div className='filter'>
          <Categories />
          <Sort />
        </div>

        {status === 'error' ? (
          <div>
            <h2>
              Произошла ошибка <span>😕</span>
            </h2>
            <br />
            <p>
              К сожалению, не удалось получить книги. <br /> Попробуйте повторить попытку позже.
            </p>
          </div>
        ) : (
          <div className='content-book'>{status === 'loading' ? skeletons : books}</div>
        )}

        <Paginate onChangePage={onChangePage} currentPage={currentPage} />
      </div>
    </div>
  )
}

export default Home
