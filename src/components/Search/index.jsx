import React from 'react'

export default function Search({ numberOfResults, setNumberOfResults, productNameToSearch, setProductNameToSearch }) {
  return (
    <form>
      <label htmlFor="numberOfResults">Select the number of results per page</label>
      <input
        type="number"
        name="numberOfResults"
        id="numberOfResults"
        value={numberOfResults}
        onChange={(event) => setNumberOfResults(event.target.value)}
      />
      <label htmlFor="numberOfResults">Search a product by name</label>
      <input
        type="text"
        name="productNameToSearch"
        id="productNameToSearch"
        value={productNameToSearch}
        onChange={(event) => setProductNameToSearch(event.target.value)}
      />
    </form>
  )
}
