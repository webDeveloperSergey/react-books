import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { IBook } from '../../@types/types'
import rubIc from '../../assets/img/rub-ic.svg'
import { addItem } from '../../redux/slices/cartSlice'

interface BookProps extends IBook {}

const BookItem: React.FC<BookProps> = (props) => {
  let { id, imageUrl, title, author, price } = props

  const dispatch = useDispatch()
  const cartItem = useSelector((state: any) => state.cart.items.find((obj: IBook) => obj.id === id))

  const addOnClick = () => {
    const item = { ...props, count: 0 }
    dispatch(addItem(item))
  }

  const addedCount = cartItem ? cartItem.count : 0

  return (
    <div className='book__item'>
      <div className='book__top'>
        {addedCount >= 1 && <div className='book__count'>{addedCount}</div>}
        <Link to={`/book/${id}`}>
          <img className='book__img' src={imageUrl} alt='' />
        </Link>
        <h2 className='book__title'>{title}</h2>
        <h3 className='book__author'>{author}</h3>
      </div>

      <div className='book__bottom'>
        <div className='book__price'>
          <span>{price}</span>
          <img src={rubIc} alt='ruble' />
        </div>

        <div onClick={addOnClick} className='book__add'>
          <div className='book__plus'>plus</div>
        </div>
      </div>
    </div>
  )
}

export default BookItem
