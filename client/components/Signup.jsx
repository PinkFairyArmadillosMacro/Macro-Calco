import React,{useState} from 'react';
import { Navigate } from "react-router-dom";
import SetUp from './SetUp.jsx';

const Signup = ({setLogged, isLogged}) => {
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
 
  const [isSignedUp, setIsSignedUp] = useState(false);

  const usernameChange = (e) => { setUsername(e.target.value) }
  const passwordChange = (e) => { setPassword(e.target.value) }

  const handleSubmit = (e) => {
    e.preventDefault();
    // make post request to backend (send username password)
    // backend will verify
    // change isLogged true
    // if (username !== '' && password !== '') {
    setIsSignedUp(true)
    //setLogged(true)
      // TODO: make post request to backend
    // } 
  }

    return (
      <div id="login-component-container">
        {/* <div id="login-container"> */}
          { !isSignedUp  
            ?
            <div>
              <h1 id="main-login-title">Macro Calco</h1>
            <div id="login-container">
              <h1 id="login-title">Sign Up:</h1>
              <form id="form-container">
                <input placeholder="Username" className="input-tag" name='username' autoComplete="off" onChange={usernameChange}></input>
                <input placeholder="Password" className="input-tag" name='password' type='password' onChange={passwordChange}></input>
                <button id="login-button" type='submit' onClick={handleSubmit}>Sign Up</button>
              </form>
            </div>
            </div>

            : <></>
          }
          
          {/* {isLogged && (<Navigate to='/new_user'/>)} */}
          { isSignedUp && <SetUp isLogged={isLogged} setLogged={setLogged}/>}
        {/* </div> */}

        

      </div>
    )
}

export default Signup;