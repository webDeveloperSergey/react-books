import React from 'react'

import Search from '../Search'
import Cart from '../Cart'

import logoSvg from '../../assets/img/BookMark-logo.svg'

const Header = () => {
  return (
    <div className="header">
      <div className="header__wrap">
        <div className="header__item">
          <a href="/"><img src={logoSvg} alt="BookMark" /></a>
          <Search/>
        </div>

        <div className="header__item">
          <Cart/>
        </div>
      </div>
    </div>
  )
}


export default Header