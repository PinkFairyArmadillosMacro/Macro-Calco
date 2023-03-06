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

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
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
      }
    ]
  }
])


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)