import React, { useState } from 'react'

import { TableRowContainer } from './styles';

export default function TableBodyRow({ tableData }) {
  const [ showMore, setShowMore ] = useState(false);

  const ShowMoreButton = () => (
    <button
      className="ml-3"
      type="button"
      onClick={() => setShowMore(!showMore)}
    >
    {showMore ? "show less" : "show more"}
    </button>
  )

  return (
    <TableRowContainer key={tableData.id}>
      <td scope="row">
        <img
          src={tableData.image || 
          "https://res.cloudinary.com/jeffmoraes/image/upload/v1604566800/projects/default_product_image_ulqnuh.png"}
          alt={tableData.product_name}
        />
      </td>
      <td className="productName">
        {showMore ? tableData.product_name : `${tableData.product_name.slice(0, 80)}`}
        {(tableData.product_name.length > 80 && !showMore) && "..."}
        {tableData.product_name.length > 80 && <ShowMoreButton />}
      </td>
      <td className="productDescription">
        {showMore ? tableData.product_desc : `${tableData.product_desc.slice(0, 150)}`}
        {(tableData.product_desc.length > 150 && !showMore) && "..."}
        {tableData.product_desc.length > 150 && <ShowMoreButton />}
      </td>
      <td>{tableData.color}</td>
      <td>{tableData.category}</td>
      <td>{tableData.quantity}</td>
      <td>{tableData.style}</td>
      <td>{tableData.price}</td>
      <td>{tableData.currency}</td>
    </TableRowContainer>
  )
}
