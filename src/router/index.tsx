import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import AuthCallback from "../pages/AuthCallback/AuthCallback";
import Create from "../pages/Create/Create";
import Result from "../pages/Result/Result";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/auth/callback",
    element: <AuthCallback />,
  },
  {
    path: "/create",
    element: <Create />,
  },
  {
    path: "/result",
    element: <Result />,
  },
]);