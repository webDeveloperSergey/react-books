import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { selectFilter, setCategoryId } from '../../redux/slices/filterSlice'

const Categories = () => {
  const categories = ['Все', 'Фантастика', 'Классика', 'Приключения', 'Детектив']

  const dispatch = useDispatch()
  const { categoryId } = useSelector(selectFilter)

  const activeItem = (index) => {
    dispatch(setCategoryId(index))
  }

  const defaultClass = 'categories__list'
  const activeClass = `${defaultClass} categories-active`

  return (
    <div className='categories'>
      <ul className='categories__lists'>
        {categories.map((item, index) => (
          <li
            key={index}
            onClick={() => activeItem(index)}
            className={categoryId === index ? activeClass : defaultClass}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Categories
