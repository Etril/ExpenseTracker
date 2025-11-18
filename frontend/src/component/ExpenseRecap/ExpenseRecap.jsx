import {useState, useEffect} from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";




function ExpenseRecap({total, trend}) {

return (
    <section> 
        <div> 
            <h2> Votre solde : </h2>
            <p> {total}€ </p> 
        </div>
        <div>
            {trend ? <p> Keep going </p> : <p> Save up </p>}
        </div>
    </section>
);

}

export default ExpenseRecap;