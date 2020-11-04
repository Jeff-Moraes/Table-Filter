import React, { useState, useEffect } from 'react'

import getTableData from '../../lib/getTableData';

import TableHead from '../../components/TableHead';
import TableBodyRow from '../../components/TableBodyRow';

function Table() {
  const [ allData, setAllData ] = useState(null);
  const [ tableData, setTableData ] = useState(null);

  const [ filteredData, setFilteredData ] = useState(null);
  const [ tablePage, setTablePage ] = useState(1);
  const [ numberOfResults, setNumberOfResults ] = useState(10);

  const [ productNameToSearch, setProductNameToSearch ] = useState("");

  const fetchTableData = async () => {
    const dataFromTableData = await getTableData();
  
    const valuesFromTableData = await Object.values(dataFromTableData);
    setAllData(valuesFromTableData);

    const intialTableData = await valuesFromTableData.slice(0,numberOfResults);
    setTableData(intialTableData);
    setFilteredData(intialTableData);
  }

  const handlePreviousPage = () => {
    if(tablePage === 0) return;
    setTablePage(tablePage-1);
  }

  const handleNextPage = () => {
    if(tablePage === Math.ceil(filteredData.length / numberOfResults)) return;
    setTablePage(tablePage+1);
  }

  const filterAllDataByProductName = async () => {
    const filteredAllDataByProductName = await allData?.filter(product => product.product_name.includes(productNameToSearch));
    setFilteredData(filteredAllDataByProductName);
    setTablePage(1);
  }
  
  const updateTableData = () => {
    const newTableData = filteredData?.slice((tablePage - 1) * numberOfResults, (tablePage * numberOfResults));
    setTableData(newTableData);
  }
  
  useEffect(() => {
    fetchTableData();
  }, []);
  
  useEffect(() => {
    updateTableData();
  }, [tablePage, numberOfResults, filteredData]);
  
  useEffect(() => {
    filterAllDataByProductName();
  }, [productNameToSearch]);
  
  return (
    <div>
      <h1>Table</h1>
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

      <table>
        <TableHead />
        <tbody>
          { tableData ? tableData.map(tableData => (
            <TableBodyRow key={tableData.id} tableData={tableData} />
          )) : (
            <tr><td>Loading...</td></tr>
          )}
        </tbody>
      </table>

      <button type="button" onClick={handlePreviousPage} disabled={tablePage === 1}>previous</button>
      <span>page {tablePage}</span>
      <button type="button" onClick={handleNextPage} disabled={tablePage === Math.ceil(filteredData?.length / numberOfResults)}>next</button>
    </div>
  )
}

export default Table;
