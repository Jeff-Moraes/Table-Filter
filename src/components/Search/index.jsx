import React from 'react'

export default function Search({ numberOfResults, setNumberOfResults, productNameToSearch, setProductNameToSearch, colorOptions, setSelectedColor }) {
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
      { colorOptions && (
        <select name="colorOptions" id="colorOptions" onChange={(event) => setSelectedColor(event.target.value)}>
          <option value="">Select color</option>
          { colorOptions.map(color => (
            <option key={color} value={color}>{color}</option>
          ))}
        </select>
      )}
    </form>
  )
}
