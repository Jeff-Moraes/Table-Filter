import React, { useState, useEffect } from 'react'

import getTableData from '../../lib/getTableData';

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
        <thead>
          <tr>
            <th>image</th>
            <th>product name</th>
            <th>product desc</th>
            <th>category</th>
            <th>quantity</th>
            <th>style</th>
            <th>color</th>
            <th>price</th>
            <th>currency</th>
          </tr>
        </thead>
        <tbody>
          { tableData && tableData.map(tableData => (
            <tr key={tableData.id}>
              <td><img src={tableData.image} alt={tableData.product_name}/></td>
              <td>{tableData.product_name}</td>
              <td>{tableData.product_desc}</td>
              <td>{tableData.price}</td>
              <td>{tableData.currency}</td>
              <td>{tableData.category}</td>
              <td>{tableData.quantity}</td>
              <td>{tableData.style}</td>
              <td>{tableData.color}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table;
