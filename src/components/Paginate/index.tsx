import React from 'react'
import ReactPaginate from 'react-paginate'

import styles from './Paginate.module.scss'

interface PaginateProps {
  currentPage: number
  onChangePage: (page: number) => void
}

const Paginate: React.FC<PaginateProps> = ({ onChangePage, currentPage }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel='...'
      nextLabel='>'
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={5}
      pageCount={3}
      previousLabel='<'
      forcePage={currentPage - 1}
    />
  )
}

export default Paginate
