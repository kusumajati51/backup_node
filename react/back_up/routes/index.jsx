import Product from "../view/pages/content/product/Product";
import LoginPage from "../view/pages/auth/LoginPage";
import RegisterPage from "../view/pages/auth/RegisterPage";
import useToken from "../auth/token";
import { createBrowserRouter, Router, RouterProvider, useParams } from "react-router-dom";
import { useLayoutEffect, useState } from "react";
import SKUList from "../view/pages/content/product/sku/SKUList";
import ProductPhoto from "../view/pages/content/product/product_photo/ProductPhoto";

function GetRouter() {
  const { setToken } = useToken();
  return createBrowserRouter([
    {
      path: "/",
      children: [
        {
          path: "",
          element: <Product />,
        },
        {
          path: "sku",
          children:[
            {
              path:":id",
              element:<SKUList /> ,
            }
          ]
        },
        {
          path: "product/photo",
          children:[
            {
              path:":id",
              element:<ProductPhoto /> ,
            }
          ]
        },
      ],
    },
    {
      path: "auth",
      children: [
        {
          path: "login",
          element: <LoginPage setToken={setToken} />,
        },
        {
          path: "register",
          element: <RegisterPage />,
        },
      ],
    },
  ]);
}

export default GetRouter;
