import {useState, useEffect} from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import api from "../../api";


function LoginField () {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate= useNavigate();



const handleSubmit= async (e) => {
  e.preventDefault(); 
  try {
      const payload = {
  user: name,       
  password: password 
};
const response=  await api.post("/auth/login", payload);
console.log(response.data);
localStorage.setItem("jwt", response.data.token);
navigate("/dashboard");
  }
  catch (err)
  {console.error(err)}
}

return (
    <div>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name"> User</label>
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