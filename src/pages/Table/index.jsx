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

  const [ colorOptions, setColorOptions ] = useState(null);

  const [ tablePage, setTablePage ] = useState(1);
  const [ selectedColor, setSelectedColor ] = useState("");
  const [ numberOfResults, setNumberOfResults ] = useState(10);
  const [ productNameToSearch, setProductNameToSearch ] = useState("");

  const fetchTableData = async () => {
    const dataFromTableData = await getTableData();
  
    const valuesFromTableData = await Object.values(dataFromTableData);
    setAllData(valuesFromTableData);  

    const colorOptionsFromTableData = [...new Set(valuesFromTableData.map(product => product.color))].filter(color => color);
    setColorOptions(colorOptionsFromTableData);

    const intialTableData = valuesFromTableData.slice(0,numberOfResults);
    setTableData(intialTableData);
    setFilteredData(valuesFromTableData);
  }

  const handlePreviousPage = () => {
    if(tablePage === 0) return;
    setTablePage(tablePage-1);
  }

  const handleNextPage = () => {
    if(tablePage === Math.ceil(filteredData.length / numberOfResults)) return;
    setTablePage(tablePage+1);
  }

  const filterAllData = () => {
    const filteredAllDataByColor = selectedColor ? allData?.filter(product => product.color === selectedColor) : allData;
    const filteredAllDataByProductName = filteredAllDataByColor?.filter(product => product.product_name.includes(productNameToSearch));
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
    filterAllData();
  }, [productNameToSearch, selectedColor]);

  return (
    <div className="py-5 px-4">
      <h1 className="display-3">Table Filter</h1>

      <Search
        numberOfResults={numberOfResults}
        setNumberOfResults={setNumberOfResults}
        productNameToSearch={productNameToSearch}
        setProductNameToSearch={setProductNameToSearch}
        colorOptions={colorOptions}
        setSelectedColor={setSelectedColor}
      />
      
      <table className="table">
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
