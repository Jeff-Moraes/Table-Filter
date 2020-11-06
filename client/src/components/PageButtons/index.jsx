import React from 'react'

export default function PageButtons({ tablePage, setTablePage }) {
  return (
    <div className="d-flex justify-content-center align-items-center mt-5 mb-5">
      <button 
        className="btn btn-outline-secondary"
        type="button"
        onClick={() => setTablePage(tablePage - 1)}
        disabled={tablePage === 1}
      >
        previous
      </button>

      <span className="mr-3 ml-3">page {tablePage}</span>

      <button
        className="btn btn-outline-secondary"
        type="button"
        onClick={() => setTablePage(tablePage + 1)}
      >
        next
      </button>
    </div>
  )
}
