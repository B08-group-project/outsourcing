import { useState } from "react";
import FixedButton from "../components/common/FixedButton";
import KakaoMap from "../components/common/KakaoMap";
import SideBarCourse from "../components/sidebar/SideBarCourse";

function MainPage() {
  const [isSideBarCourseOpen, setIsSideBarCourseOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSideBarCourse = () => {
    setIsSideBarCourseOpen(true);
  };

  const closeSideBarCourse = () => {
    setIsSideBarCourseOpen(false);
  };

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <KakaoMap />
      <FixedButton text="코스 등록" onClick={openSideBarCourse} />
      <SideBarCourse
        isCourseOpen={isSideBarCourseOpen}
        onCourseClose={closeSideBarCourse}
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
        openSidebar={openSidebar}
      />
    </>
  );
}

export default MainPage;
