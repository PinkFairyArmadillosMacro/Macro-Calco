import React, {useState} from "react";
import { Link, Navigate} from "react-router-dom";


const Login = ({setLogged, isLogged}) => {
  
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  //const [isLogged, setIsLogged] = useState(false);

  const usernameChange = (e) => { setUsername(e.target.value) }

  const passwordChange = (e) => { setPassword(e.target.value) }

  const handleSubmit = (e) => {
    
    e.preventDefault();
    // make post request to backend (send username password)
    // backend will verify
    // change isLogged true
    console.log(password);
    console.log(username);
    setLogged(true)
  }

  return(
    <div id="login-component-container">
      <div id="login-container">
        <h1 id="login-title">Log In:</h1>
        <form id="form-container">
          <input placeholder="Username" className="input-tag" name='username' autoComplete="off" onChange={usernameChange}></input>
          <input placeholder="Password" className="input-tag" name='password' type='password' onChange={passwordChange}></input>
          <button id="login-button" type='button' onClick={handleSubmit}>Login</button>
        </form>
        {isLogged && (<Navigate to='/new_user'/>)}
      </div>
    </div>
  )
}

export default Login;