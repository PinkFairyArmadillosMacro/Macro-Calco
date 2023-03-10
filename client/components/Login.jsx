import React, {useState} from "react";
import { Link, Navigate} from "react-router-dom";


const Login = ({setLogged, isLogged}) => {
  

  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  //const [isLogged, setIsLogged] = useState(false);
  const [userExists, setUserExists] = useState(false);

  const usernameChange = (e) => { setUsername(e.target.value) }

  const passwordChange = (e) => { setPassword(e.target.value) }

  const handleSubmit = (e) => {
    
    e.preventDefault();
    // make post request to backend (send username password)
    // backend will verify
    // change isLogged true
    console.log(password);
    console.log(username);

    fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(response => response.json()).then(data =>{ console.log('DATA', data)});

    setLogged(true)
  }

  return(
    <div id="login-component-container">
      <h1 id="main-login-title">Macro Calco</h1>
      <div id="login-container">
        <h1 id="login-title">Log In:</h1>
        <form id="form-container">
          <input placeholder="Username" className="input-tag" name='username' autoComplete="off" onChange={usernameChange}></input>
          <input placeholder="Password" className="input-tag" name='password' type='password' onChange={passwordChange}></input>
          <button id="login-button" type='submit' onClick={handleSubmit}>Login</button>
        </form>

        <p>New User?</p>
        <Link to='signup'>
          <a>Sign up!</a> 
        </Link>
        
        {isLogged && (<Navigate to='/home'/>)}
      </div>

    </div>
  )
}

export default Login;