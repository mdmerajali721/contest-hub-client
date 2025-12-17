import React from "react";
import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root";
import Home from "../pages/Home/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        index: true,
        Component: Home,
      },
    
    ],
  },
]);
