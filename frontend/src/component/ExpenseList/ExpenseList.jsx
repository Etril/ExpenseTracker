import {useState, useEffect} from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";


function ExpenseList({list}) {

    

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
          </tr>
        ))}
      </tbody>
    </table>
    </div>
);

}

export default ExpenseList;