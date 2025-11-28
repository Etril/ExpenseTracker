import {useState, useEffect} from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import api from "../../api";


function ExpenseList({list, openEdit, refreshExpenses}) {

  async function deleteExpense(id) {

    try {
      console.log(id);
      await api.delete(`/expenses/${id}`);
      refreshExpenses();
    }
    catch (err){
      console.error(err.response?.data || err)
    }

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
        {list.map((item) => (
          <tr key={item.id}>
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