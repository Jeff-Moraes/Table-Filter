import React from 'react'

export default function TableBodyRow({ tableData }) {
  return (
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
  )
}
