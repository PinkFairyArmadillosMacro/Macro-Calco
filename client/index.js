import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./components/App.jsx";
import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import styles from './styles/styles.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: 'home',
        element: <Home/>
      }
    ]
  },
  {
    path: "home",
    element: <Home />
  }
])


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)