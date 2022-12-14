import React from 'react'
import { Link } from 'react-router-dom'

import rubIc from '../../assets/img/rub-ic.svg'
import baskIc from '../../assets/img/bask-ic.svg'
import styles from './Cart.module.scss'

const Cart = () => {
  return (
    <div className={styles.cart}>
      <div className={styles.cart__item}>
        <span className={styles.cart__price}>1024</span>
        <img src={rubIc} alt="ruble" />
      </div>

      <hr className={styles.cart__line}/>

      <Link to="cart">
        <div className={styles.cart__item}>
          <img src={baskIc} alt="ruble" />
          <span className={styles.cart__count_ofproduct}>2</span>
        </div>
      </Link>
      
    </div>
  )
}


export default Cart
