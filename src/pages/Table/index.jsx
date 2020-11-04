import React, { useState, useEffect } from 'react'

import getTableData from '../../lib/getTableData';

import TableHead from '../../components/TableHead';
import TableBodyRow from '../../components/TableBodyRow';

function Table() {
  const [ allData, setAllData ] = useState(null);
  const [ tableData, setTableData ] = useState(null);

  const [ tablePage, setTablePage ] = useState(1);
  const [ numberOfResults, setNumberOfResults ] = useState(10);

  const fetchTableData = async () => {
    const dataFromTableData = await getTableData();
  
    const valuesFromTableData = Object.values(dataFromTableData);
    setAllData(valuesFromTableData);

    const intialTableData = valuesFromTableData.slice(0,numberOfResults);
    setTableData(intialTableData);
  }

  const handlePreviousPage = () => {
    if(tablePage === 0) return;
    setTablePage(tablePage-1);
    updateTableData(tablePage-1);
  }

  const handleNextPage = () => {
    if(tablePage === allData.length / numberOfResults) return;
    setTablePage(tablePage+1);
    updateTableData(tablePage+1);
  }

  const updateTableData = (newPage) => {
    const newTableData = allData.slice((newPage - 1) * numberOfResults, (newPage * numberOfResults));
    setTableData(newTableData);
  }

  useEffect(() => {
    fetchTableData();
  }, []);

  console.log((tablePage -1 ) * numberOfResults, (tablePage * numberOfResults))
  
  return (
    <div>
      <h1>Table</h1>

      <table>
        <TableHead />
        <tbody>
          { tableData ? tableData.map(tableData => (
            <TableBodyRow key={tableData.id} tableData={tableData} />
          )) : (
            <p>Loading...</p>
          )}
        </tbody>
      </table>
      <button type="button" onClick={handlePreviousPage} disabled={tablePage === 1}>previous</button>
      <span>page {tablePage}</span>
      <button type="button" onClick={handleNextPage}>next</button>
    </div>
  )
}

export default Table;
