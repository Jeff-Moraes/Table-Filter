import React, { useState, useEffect } from 'react'

import getTableData from '../../lib/getTableData';

function Table({ user }) {
  const [ allData, setAllData ] = useState(null);
  const [ tableDataKeys, setTableDataKeys ] = useState(null);

  const fetchTableData = async () => {

    const dataFromTableData = await getTableData();
  
    const valuesFromTableData = Object.values(dataFromTableData);
    const keysFromTableData = Object.keys(dataFromTableData[1]);
  
    setAllData(valuesFromTableData);
    setTableDataKeys(keysFromTableData);
  }

  useEffect(() => {
    fetchTableData();
  }, []);
  
  return (
    <div>
      <h1>Table {user.username}</h1>
    </div>
  )
}

export default Table
