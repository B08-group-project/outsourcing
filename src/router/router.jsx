import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ExamplePage from "../pages/ExamplePage";
import Mypage from "../pages/Mypage";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/example",
        element: <ExamplePage />,
      },
      {
        path: "/mypage", 
        element: <Mypage />,  
      },
    ],
  },
]);

export default router;
