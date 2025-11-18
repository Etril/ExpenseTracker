import {useState, useEffect} from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import LoginField from "../../component/LoginField/LoginField";


function Login () {

return (
    <main> 
        <h1> Login </h1>
        <div> 
            <LoginField />
            </div>
    </main>
        
);

}

export default Login;