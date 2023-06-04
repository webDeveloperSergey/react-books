import React from 'react'

import logoSvg from '../../assets/img/BookMark-logo.svg'
import Cart from '../Cart'
import Search from '../Search'

const Header = () => {
  return (
    <div className='header'>
      <div className='header__wrap'>
        <div className='header__item'>
          <a href='/'>
            <img src={logoSvg} alt='BookMark' />
          </a>
          <Search />
        </div>

        <div className='header__item'>
          <Cart />
        </div>
      </div>
    </div>
  )
}

export default Header
