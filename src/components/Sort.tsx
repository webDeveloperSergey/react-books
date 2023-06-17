import React, { useRef } from 'react'

import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setSort } from '../redux/slices/filterSlice'

export const sortList: ISort[] = [
  { name: 'популярности (DESC)', sortProperty: 'rating' },
  { name: 'популярности (ASC)', sortProperty: '-rating' },
  { name: 'цене (DESC)', sortProperty: 'price' },
  { name: 'цене (ASC)', sortProperty: '-price' },
  { name: 'алфавиту (DESC)', sortProperty: 'title' },
  { name: 'алфавиту (ASC)', sortProperty: '-title' },
]

const Sort: React.FC = () => {
  const sort = useSelector((state: any) => state.filter.sort)
  const dispatch = useDispatch()

  const sortRef = useRef<HTMLDivElement>(null)

  const [isOpen, setIsOpen] = React.useState<boolean>(false)

  const defaultClass = 'sort__list'
  const activeClass = `${defaultClass} sort-active`

  useEffect(() => {
    const isShowHandler = (event: MouseEvent) => {
      if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
        setIsOpen(false)
      }
    }

    document.body.addEventListener('click', isShowHandler)

    return () => document.body.removeEventListener('click', isShowHandler)
  }, [])

  const clickOptions = (obj: ISort) => {
    dispatch(setSort(obj))
    setIsOpen(false)
  }

  return (
    <div ref={sortRef} className='sort'>
      <div className='sort__label' onClick={() => setIsOpen(!isOpen)}>
        <svg
          width='10'
          height='6'
          viewBox='0 0 10 6'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z'
            fill='#2C2C2C'
          />
        </svg>
        <h2 className='sort__title'>Сортировка по:</h2>
        <span className='sort__selected'>{sort.name}</span>
      </div>

      {isOpen && (
        <div className='sort__popup'>
          <ul className='sort__lists'>
            {sortList.map((obj, index) => (
              <li
                key={index}
                onClick={() => clickOptions(obj)}
                className={sort.sortProperty === obj.sortProperty ? activeClass : defaultClass}
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Sort
