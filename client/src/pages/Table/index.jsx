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
    setFilteredData(data);
  }

  const fetchColorsFromAPI = async () => {
    const { data } = await axios.get('http://localhost:5555/colors');
    setColorOptions(data)
  }
  
  useEffect(() => {
    fetchAllDataFromAPI();
    fetchColorsFromAPI();
  }, []);
  
  useEffect(() => {
    fetchAllDataFromAPI();
    setTablePage(1);
  }, [searchProducts, selectedColor]);

  useEffect(() => {
    fetchAllDataFromAPI();
  }, [numberOfResults, tablePage]);

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
        handlePreviousPage={() => setTablePage(tablePage-1)}
        handleNextPage={() => setTablePage(tablePage+1)}
      />
    </div>
  )
}

export default Table;
