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
  const [ lastPage, setlastPage ] = useState(1);
  const [ selectedColor, setSelectedColor ] = useState("");
  const [ numberOfResults, setNumberOfResults ] = useState(10);
  const [ searchProducts, setSearchProducts ] = useState("");

  const query = `?limit=${numberOfResults}&page=${tablePage}&searchProducts=${searchProducts}&selectedColor=${selectedColor}`

  const fetchAllDataFromAPI = async () => {
    const { data } = await axios.get(`http://localhost:5555/search${query}`);

    setFilteredData(data.dataResult);
    setlastPage(data.numberOfPages);
  }

  const fetchColorsFromAPI = async () => {
    const { data } = await axios.get('http://localhost:5555/colors');
    setColorOptions(data)
  }

  const handleSubmitForm = (event) => {
    event.preventDefault();
    fetchAllDataFromAPI();
    setTablePage(1);
  }
  
  useEffect(() => {
    fetchAllDataFromAPI();
    fetchColorsFromAPI();
  }, []);

  useEffect(() => {
    fetchAllDataFromAPI();
  }, [tablePage]);

  return (
    <div className="py-5 px-4">
      <h1 className="display-3">Table Filter</h1>

      <Search
        colorOptions={colorOptions}
        numberOfResults={numberOfResults}
        setNumberOfResults={setNumberOfResults}
        setSearchProducts={setSearchProducts}
        setSelectedColor={setSelectedColor}
        handleSubmitForm={handleSubmitForm}
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
        setTablePage={setTablePage}
        lastPage={lastPage}
      />
    </div>
  )
}

export default Table;
