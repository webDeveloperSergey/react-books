import React from 'react'
import { Link } from 'react-router-dom'

import cartEmptyImg from '../assets/img/empty-cart.webm'

export const CartEmpty: React.FC = () => (
  <div className='cart cart--empty'>
    <h2>
      Корзина пустая <span>😕</span>
    </h2>
    <p>
      Вероятней всего, вы не ещё добавили книгу.
      <br />
      Для того, чтобы заказать книгу, перейди на главную страницу.
    </p>
    {/* <img src={cartEmptyImg} alt='Empty cart' /> */}
    <video className='cart-video' width='400' height='300' autoPlay={true} loop={true}>
      <source src={cartEmptyImg} type='video/webm; codecs="vp8, vorbis"' />
    </video>
    <Link to='/' className='button button--black'>
      <span>Вернуться назад</span>
    </Link>
  </div>
)
