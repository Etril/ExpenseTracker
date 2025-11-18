import {useState, useEffect} from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";


function ExpenseWidgets({title, value}) {

return (
    <div> 
        {title} : {value};
    </div>
);

}

export default ExpenseWidgets;