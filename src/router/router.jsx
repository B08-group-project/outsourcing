import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ExamplePage from "../pages/ExamplePage";
import MainPage from "../pages/MainPage";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/example",
        element: <ExamplePage />,
      },
      {
        path: "/",
        element: <MainPage />,
      },
    ],
  },
]);

export default router;
