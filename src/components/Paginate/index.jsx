import React from 'react'
import ReactPaginate from 'react-paginate'

import styles from './Paginate.module.scss'

const Paginate = ({ onChangePage }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel='...'
      nextLabel='>'
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={5}
      pageCount={3}
      previousLabel='<'
      renderOnZeroPageCount={null}
    />
  )
}

export default Paginate
