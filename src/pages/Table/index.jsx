import React, { useState, useEffect } from 'react'

import getTableData from '../../lib/getTableData';

import TableHead from '../../components/TableHead';
import TableBodyRow from '../../components/TableBodyRow';

function Table({ user }) {
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

  useEffect(() => {
    fetchTableData();
  }, []);
  
  console.log(tableData)
  return (
    <div>
      <h1>Table</h1>

      <table>
        <TableHead />
        <tbody>
          { tableData && tableData.map(tableData => (
            <TableBodyRow key={tableData.id} tableData={tableData} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table;
