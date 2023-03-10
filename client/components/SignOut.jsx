import React from "react";
import { Link, Navigate, Outlet} from "react-router-dom";

const SignOut = () => {
  
  return(
    <div id="login-component-container">
      <h1 id="main-login-title">Macro Calco</h1>
      <div id="login-container">
        <h1 id="signout-title">You have successfully logged out!</h1>

        <Link to='/'>
          <a>Back to Login</a> 

        </Link>
        
      </div>


    </div>
  )
}

export default SignOut;