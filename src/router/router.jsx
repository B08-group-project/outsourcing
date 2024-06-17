import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ExamplePage from "../pages/ExamplePage";

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
]);

export default router;
