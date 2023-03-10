import React, {useState} from "react";
import { Routes, Route, Outlet} from "react-router-dom"
//import Cookies from "js-cookie";
// 
import Login from "./Login.jsx";
import Navbar from "./Navbar.jsx";
import Home from "./Home.jsx";
import FindRecipe from "./FindRecipe.jsx";
import MyAccount from "./MyAccount.jsx";
import SetUp from "./SetUp.jsx";
import Signup from "./Signup.jsx";
const App = () => {
  const [isLogged, setIsLogged] = useState(false)
  return(
    <div>
      {isLogged?
        <Navbar/>
        : <></>
      }
      <Routes>
        <Route path="/" element={<Login setLogged={setIsLogged} isLogged={isLogged}/>}/>
        <Route path="signup" element={<Signup setLogged={setIsLogged} isLogged={isLogged}/>}/>
        <Route path="new_user" element={<SetUp/>}/>
        <Route path="home" element={<Home/>}></Route>
        <Route path="find" element={<FindRecipe/>}></Route>
        <Route path="myaccount" element={<MyAccount/>}></Route>
      </Routes>

    </div>
  )
}

export default App;