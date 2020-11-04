import React, { useState, useEffect } from 'react'

import getTableData from '../../lib/getTableData';

import Search from '../../components/Search';
import TableHead from '../../components/TableHead';
import TableBodyRow from '../../components/TableBodyRow';
import PageButtons from '../../components/PageButtons';

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

    const intialTableData = await valuesFromTableData;
    setTableData(intialTableData.slice(0,numberOfResults));
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
    console.log(filteredData, 1);
    const newTableData = filteredData?.slice((tablePage - 1) * numberOfResults, (tablePage * numberOfResults));
    setTableData(newTableData);
    console.log(filteredData, 2);
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
      <Search
        numberOfResults={numberOfResults}
        setNumberOfResults={setNumberOfResults}
        productNameToSearch={productNameToSearch}
        setProductNameToSearch={setProductNameToSearch}
      />

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
