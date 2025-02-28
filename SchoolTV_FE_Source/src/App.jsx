import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/home";
import PageLayout from "../src/components/layout/PageLayout";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Login from "./pages/login/login";

function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: (
        <>
          <Login />
        </>
      ),
    },
    {
      path: "",
      element: <PageLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
