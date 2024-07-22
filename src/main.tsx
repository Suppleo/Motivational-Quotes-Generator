import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App.tsx";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import SignUpPage from "./pages/SignupPage.tsx";

const router = createBrowserRouter([
  {
    path: "/Motivational-Quotes-Generator/",
    element: <App />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/Motivational-Quotes-Generator/login",
    element: <LoginPage />,
  },
  {
    path: "/Motivational-Quotes-Generator/signup",
    element: <SignUpPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
