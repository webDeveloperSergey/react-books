import React from 'react'
import { useLocation } from 'react-router-dom'

import logoSvg from '../../assets/img/BookMark-logo.svg'
import Cart from '../Cart'
import Search from '../Search'

const Header = () => {
  let { pathname } = useLocation()

  console.log(pathname)
  return (
    <div className='header'>
      <div className='header__wrap'>
        <div className='header__item'>
          <a href='/'>
            <img src={logoSvg} alt='BookMark' />
          </a>
          {pathname !== '/cart' && <Search />}
        </div>

        <div className='header__item'>
          <Cart />
        </div>
      </div>
    </div>
  )
}

export default Header
