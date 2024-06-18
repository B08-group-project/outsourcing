import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Sidebar from "../components/sidebar/Sidebar";
// import KakaoMap from "../components/common/KakaoMap";
import Map from "../components/common/Map";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Sidebar />,
      },
      {
        path: "/map",
        element: <Map />,
      },
    ],
  },
]);

export default router;
