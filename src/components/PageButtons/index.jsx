import React from 'react'

export default function PageButtons({ tablePage, handlePreviousPage, handleNextPage, lastPageNumber }) {
  return (
    <div>
      <button 
        type="button"
        onClick={handlePreviousPage}
        disabled={tablePage === 1}>
        previous
      </button>

      <span>page {tablePage}</span>

      <button 
        type="button"
        onClick={handleNextPage}
        disabled={tablePage === lastPageNumber}>
        next
      </button>
    </div>
  )
}
