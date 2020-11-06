import React from 'react'

import { SearchContainer } from './styles';

export default function Search({ numberOfResults, setNumberOfResults, searchProducts, setSearchProducts, colorOptions, setSelectedColor }) {
  return (
    <SearchContainer className="mb-3 mt-3">
      <div className="productName">
        <input
          className="form-control"
          placeholder="Search"
          type="text"
          name="searchProducts"
          id="searchProducts"
          value={searchProducts}
          onChange={(event) => setSearchProducts(event.target.value)}
        />
      </div>
      <div className="input-group numberOfResults">
        <input
          type="number"
          min="1"
          name="numberOfResults"
          id="numberOfResults"
          value={numberOfResults}
          onChange={(event) => setNumberOfResults(event.target.value)}
        />
        <div className="input-group-append">
          <span className="input-group-text" id="basic-addon2">results per page</span>
        </div>
      </div>
      <div>
        { colorOptions && (
          <select
            className="custom-select colorOptions"
            name="colorOptions"
            id="colorOptions" 
            onChange={(event) => setSelectedColor(event.target.value)}
          >
            <option value="">Select color</option>
            { colorOptions.map(color => (
              <option key={color} value={color}>{color}</option>
            ))}
          </select>
        )}
      </div>
    </SearchContainer>
  )
}
