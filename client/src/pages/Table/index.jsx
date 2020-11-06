import React, { useState, useEffect } from 'react'
import axios from 'axios';

import Search from '../../components/Search';
import TableHead from '../../components/TableHead';
import TableBodyRow from '../../components/TableBodyRow';
import PageButtons from '../../components/PageButtons';

function Table() {
  const [ filteredData, setFilteredData ] = useState(null);
  const [ colorOptions, setColorOptions ] = useState(null);

  const [ tablePage, setTablePage ] = useState(1);
  const [ selectedColor, setSelectedColor ] = useState("");
  const [ numberOfResults, setNumberOfResults ] = useState(10);
  const [ searchProducts, setSearchProducts ] = useState("");

  const fetchAllDataFromAPI = async () => {
    const { data } = await axios.get(`http://localhost:5555/search?limit=${numberOfResults}&page=${tablePage}&searchProducts=${searchProducts}&selectedColor=${selectedColor}`);
    setFilteredData(data)
  }

  const fetchColorsFromAPI = async () => {
    const { data } = await axios.get('http://localhost:5555/colors');
    setColorOptions(data)
  }

  const handlePreviousPage = () => {
    if(tablePage === 0) return;
    setTablePage(tablePage-1);
  }

  const handleNextPage = () => {
    if(tablePage === Math.ceil(filteredData.length / numberOfResults)) return;
    setTablePage(tablePage+1);
  }
  
  useEffect(() => {
    fetchAllDataFromAPI();
    fetchColorsFromAPI();
  }, []);
  
  useEffect(() => {
    fetchAllDataFromAPI();
  }, [tablePage, numberOfResults, searchProducts, selectedColor]);

  return (
    <div className="py-5 px-4">
      <h1 className="display-3">Table Filter</h1>

      <Search
        colorOptions={colorOptions}
        numberOfResults={numberOfResults}
        setNumberOfResults={setNumberOfResults}
        setSearchProducts={setSearchProducts}
        setSelectedColor={setSelectedColor}
      />
      
      <table className="table">
        <TableHead />
        <tbody>
          { filteredData ? filteredData.map(tableData => (
            <TableBodyRow key={tableData.id} tableData={tableData} />
          )) : (
            <tr><td>Loading...</td></tr>
          )}
        </tbody>
      </table>

      <PageButtons
        tablePage={tablePage}
        handlePreviousPage={handlePreviousPage}
        handleNextPage={handleNextPage}
        lastPageNumber={Math.ceil(filteredData?.length / numberOfResults)}
      />
    </div>
  )
}

export default Table;
