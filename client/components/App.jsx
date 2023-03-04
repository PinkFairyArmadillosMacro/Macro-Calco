import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Cookies from "js-cookie";
import Navbar from "./Navbar.jsx";
import Login from "./Login.jsx";


const App = () => {
  return(
    <div>
      <Navbar />
      <Login/>
    </div>
  )
}

export default App;