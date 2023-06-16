import React from 'react'
import { Routes, Route } from 'react-router-dom'

import './scss/app.scss'

import Header from './components/Header'
import AboutBook from './pages/AboutBook'
import Cart from './pages/Cart'
import Home from './pages/Home'

function App() {
  return (
    <div className='App'>
      <div className='container'>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/book/:id' element={<AboutBook />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
        {/* <Header />
        <Home /> */}
      </div>
    </div>
  )
}

export default App
