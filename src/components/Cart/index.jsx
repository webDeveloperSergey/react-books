import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import styles from './Cart.module.scss'

import baskIc from '../../assets/img/bask-ic.svg'
import rubIc from '../../assets/img/rub-ic.svg'

const Cart = () => {
  const { totalPrice, totalCount, items } = useSelector((state) => state.cart)

  return (
    <div className={styles.cart}>
      <div className={styles.cart__item}>
        <span className={styles.cart__price}>{totalPrice}</span>
        <img src={rubIc} alt='ruble' />
      </div>

      <hr className={styles.cart__line} />

      <Link to='cart'>
        <div className={styles.cart__item}>
          <img src={baskIc} alt='ruble' />
          <span className={styles.cart__count_ofproduct}>{totalCount}</span>
        </div>
      </Link>
    </div>
  )
}

export default Cart
