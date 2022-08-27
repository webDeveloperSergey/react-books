import React from 'react'

import rubIc from '../../assets/img/rub-ic.svg'


const BookBlock = ({imageUrl, title, author, price}) => {

  return (
    <div className="book__item">
      <div className="book__top">
        <img className="book__img" src={imageUrl} alt="" />
        <h2 className="book__title">{title}</h2>
        <h3 className="book__author">{author}</h3>
      </div>

      <div className="book__bottom">
        <div className="book__price">
          <span>{price}</span>
          <img src={rubIc} alt="ruble" />
        </div>

        <div className="book__add">
          <div className="book__plus">plus</div>
        </div>
      </div>
    </div>
  )
}

export default BookBlock