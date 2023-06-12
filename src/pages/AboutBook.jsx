import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const AboutBook = () => {
  const { id } = useParams()

  const [book, setBook] = useState()

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

  if (!book) {
    return 'Идет загрузка'
  }

  return (
    <div className='book-page'>
      <div className='book-page__img'>
        <img className='' src={book.imageUrl} alt={book.title} />
      </div>
      <div className='book-page__info'>
        <h2>{book.title}</h2>
        <h3 className='book-page__author'>{book.author}</h3>
        <p>{book.descr}</p>
      </div>
    </div>
  )
}

export default AboutBook
