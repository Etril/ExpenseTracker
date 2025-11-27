import {useState, useEffect} from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";


function ExpenseList({list, openEdit}) {

  function deleteExpense() {


  }
;
    

return (
    <div> 
        <h3> Tableau des dépenses </h3>
        <table>
      <thead>
        <tr >
          <th>Title</th>
          <th>Amount (€)</th>
          <th>Category</th>
          <th>Date</th>
          <th>Type</th>
          <th> Delete </th> 
          <th> Edit </th>
        </tr>
      </thead>

      <tbody>
        {list.map((item, index) => (
          <tr key={index}>
            <td>{item.title}</td>
            <td>{item.amount}</td>
            <td>{item.category}</td>
            <td>
              {new Date(item.date).toLocaleDateString("en-EN")}
            </td>
            <td>{item.type}</td>
            <td> <button onClick={() => deleteExpense(item.id)}> Delete </button> </td> 
            <td> <button onClick={() => openEdit(item)}> Edit </button> </td>
          </tr>
        ))}
      </tbody> 
    </table>
    </div>
);

}

export default ExpenseList;