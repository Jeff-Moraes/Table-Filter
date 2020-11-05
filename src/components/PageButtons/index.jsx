import React from 'react'

export default function PageButtons({ tablePage, handlePreviousPage, handleNextPage, lastPageNumber }) {
  return (
    <div className="d-flex justify-content-center align-items-center mt-5 mb-5">
      <button 
        className="btn btn-outline-secondary"
        type="button"
        onClick={handlePreviousPage}
        disabled={tablePage === 1}>
        previous
      </button>

      <span className="mr-3 ml-3">page {tablePage}</span>

      <button
        className="btn btn-outline-secondary"
        type="button"
        onClick={handleNextPage}
        disabled={tablePage === lastPageNumber}>
        next
      </button>
    </div>
  )
}
