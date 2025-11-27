import {useState, useEffect} from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";




function ExpenseRecap({total, trend}) {

return (
    <section> 
        <div> 
            <h2> Total des dépenses </h2>
            <p> {total}€ </p> 
        </div>
        <div>
            <h2> Tendance moyenne </h2>
            <p> {trend}€ </p>
        </div>
    </section>
);

}

export default ExpenseRecap;