import {useState, useEffect} from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";


function LoginField () {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

return (
    <div>
        <form>
            <div>
                <label htmlFor="name"> Email</label>
                <input
                type="text"
                value={name}
                id="name"
                onChange={(e) => setName(e.target.value)}/>
                </div> 
                <div className="form__field">
          <label htmlFor="password"> Mot de passe </label>
          <input
            type="password"
            name="password"
            id="password"
            value= {password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">
            Se connecter
            </button>
            </form>
        </div>
);

}

export default LoginField;