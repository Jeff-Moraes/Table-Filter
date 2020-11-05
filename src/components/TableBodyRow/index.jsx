import React from 'react'

import { TableRowContainer } from './styles';

export default function TableBodyRow({ tableData }) {
  return (
    <TableRowContainer key={tableData.id}>
      <td scope="row">
        <img
          src={tableData.image || 
          "https://res.cloudinary.com/jeffmoraes/image/upload/v1604566800/projects/default_product_image_ulqnuh.png"}
          alt={tableData.product_name}
        />
      </td>
      <td>{tableData.product_name}</td>
      <td>{tableData.product_desc}</td>
      <td>{tableData.color}</td>
      <td>{tableData.category}</td>
      <td>{tableData.quantity}</td>
      <td>{tableData.style}</td>
      <td>{tableData.price}</td>
      <td>{tableData.currency}</td>
    </TableRowContainer>
  )
}
