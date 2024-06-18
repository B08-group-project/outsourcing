import { useState } from "react";
import FixedButton from "../components/common/FixedButton";
import KakaoMap from "../components/common/KakaoMap";
import Sidebar from "../components/sidebar/Sidebar";

function MainPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <KakaoMap />
      <FixedButton text="코스 등록" onClick={openSidebar} />
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
    </>
  );
}

export default MainPage;
