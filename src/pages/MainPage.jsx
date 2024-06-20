import { useState } from "react";
import FixedButton from "../components/common/FixedButton";
import KakaoMap from "../components/common/KakaoMap";
import SideBarCourse from "../components/sidebar/SideBarCourse";
import { useSetRecoilState } from "recoil";
import { pagesState, searchclickedPlace } from "../recoil/atom/searchAtom";

function MainPage() {
  const [isSideBarCourseOpen, setIsSideBarCourseOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const setPages = useSetRecoilState(pagesState);
  const setClickPlace = useSetRecoilState(searchclickedPlace);

  const openSideBarCourse = () => {
    setIsSideBarCourseOpen(true);
  };

  const closeSideBarCourse = () => {
    setIsSideBarCourseOpen(false);
    setPages(0);
  };

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
    setPages(0);
    setClickPlace({});
  };

  return (
    <>
      <KakaoMap isSidebarOpen={isSidebarOpen} />
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
