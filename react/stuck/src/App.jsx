import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";
import GetRouter from "./routes";
import { AxiosInterceptorNavigate } from "./service/api/axios";

function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={GetRouter()}>
        <AxiosInterceptorNavigate>
          <Router />
        </AxiosInterceptorNavigate>
      </RouterProvider>
    </React.StrictMode>
  );
}

export default App;
