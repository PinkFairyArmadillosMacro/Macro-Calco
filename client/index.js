import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./components/App.jsx";
import styles from './styles/styles.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  }
])


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)