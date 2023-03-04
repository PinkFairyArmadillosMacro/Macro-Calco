import React from "react";


const Login = () => {
  return(
    <div id="login-component-container">
      <div id="login-container">
        <h1 id="login-title">Log In:</h1>
        <form id="form-container">
          <span className="input-title">Username:</span>
          <input></input>
          <span className="input-title">Password:</span>
          <input></input>
          <button id="login-button">Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login;