import React from 'react'

export default function TableHead() {
  return (
    <thead className="thead-dark">
      <tr>
        <th scope="col">image</th>
        <th scope="col">name</th>
        <th scope="col">description</th>
        <th scope="col">color</th>
        <th scope="col">category</th>
        <th scope="col">quantity</th>
        <th scope="col">style</th>
        <th scope="col">price</th>
        <th scope="col">currency</th>
      </tr>
    </thead>
  )
}
