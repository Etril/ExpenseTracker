import {useState, useEffect} from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";


function ExpenseFilter ({onFilterClick, expenses}) {

    const expensesMap= expenses.map((expenses) => expenses.category);
    const expensesSet= new Set(expensesMap);
    const expensesArray = Array.from(expensesSet);

return (
    <div> 
        <div> <button onClick={() => onFilterClick(null)}> Reset</button> </div>
        {expensesArray.map ((category, index) => (
            <button key={index} onClick={() => onFilterClick(category)}>  
                {category}

            </button>
        ))}
    </div>
);

}

export default ExpenseFilter;