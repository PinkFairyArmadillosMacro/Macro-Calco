import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./components/App.jsx";
import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import FindRecipe from "./components/FindRecipe.jsx";
import MyAccount from "./components/MyAccount.jsx";
import styles from './styles/styles.css';
import SetUp from "./components/SetUp.jsx";
import Signup from "./components/Signup.jsx";
import SignOut from "./components/SignOut.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: 'signup',
        element: <Signup/>
      }, 
      {
        path: 'new_user',
        element: <SetUp/>
      }, 
      {
        path: 'home',
        element: <Home/>
      }, 
      {
        path: 'find',
        element: <FindRecipe />
      },
      {
        path: 'myaccount',
        element: <MyAccount/>
      },
      {
        path: 'signout',
        element: <SignOut/>
      }, 
    ]
  }
])


ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router}/>
)