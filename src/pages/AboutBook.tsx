import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import { IBook } from '../@types/types'
import { addItem } from '../redux/slices/cartSlice'

const AboutBook: React.FC = () => {
  const { id } = useParams()

  const [book, setBook] = React.useState<IBook>()

  const dispatch = useDispatch()
  const cartItem = useSelector((state: any) => state.cart.items.find((obj: IBook) => obj.id === id))

  useEffect(() => {
    async function fetchBook() {
      try {
        const { data } = await axios.get(`https://62df14f79c47ff309e813ee0.mockapi.io/books/${id}`)
        setBook(data)
      } catch (err) {
        alert('Ошибка при получении книги!')
      }
    }

    fetchBook()
  }, [])

  const addOnClick = () => {
    const item = { ...book }
    dispatch(addItem(item))
  }

  const addedCount: number = cartItem ? cartItem.count : 0

  if (!book) {
    return <>'Идет загрузка'</>
  }

  return (
    <div className='book-page'>
      <div className='book-page__img'>
        {addedCount >= 1 && <div className='book__count'>{addedCount}</div>}
        <img className='' src={book.imageUrl} alt={book.title} />
      </div>
      <div className='book-page__info'>
        <h2>{book.title}</h2>
        <h3 className='book-page__author'>{book.author}</h3>
        {/* <span>{book.rating}</span> */}
        <p>{book.descr}</p>
        <button onClick={addOnClick} className='button button--black book-page__button'>
          В корзину
        </button>
      </div>
    </div>
  )
}

export default AboutBook
