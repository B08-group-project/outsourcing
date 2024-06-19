import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ExamplePage from "../pages/ExamplePage";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/example",
        element: <ExamplePage />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

export default router;
