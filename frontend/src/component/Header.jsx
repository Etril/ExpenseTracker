import {useState, useEffect} from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";


function Header (isAuthenticated) {

return (
    <header> 
        <h1> HEADER </h1>
        <nav> 
            <Link to="/"> Home </Link>
            {isAuthenticated? <Link to="/"> Logout </Link> : <Link to="/login"> Login </Link>}
            
            </nav>
        </header>
);

}

export default Header;