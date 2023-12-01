import React from 'react'
import { Pagination } from 'rsuite'
import './Paginations.css'

function Paginations() {
  const [activePage, setActivePage] = React.useState(1);
  return (
    <div>
      <Pagination className='custom-pagination' total={60} limit={10} activePage={activePage} onChangePage={setActivePage} />
    </div>
  )
}

export default Paginations
