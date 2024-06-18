import React from "react";
import closeBtn from "../../assets/close-2.png";
import PlacesItem from "./PlacesItem";
import Sidebar from "./Sidebar";
import { selectPlaceState } from "../../recoil/atom/searchAtom";
import { useRecoilState } from "recoil";

const SideBarCourse = ({ isCourseOpen, onCourseClose, isOpen, onClose, openSidebar }) => {
  const [coursePlaces, setCoursePlaces] = useRecoilState(selectPlaceState);

  return (
    <div
      className={`fixed top-0 right-0 h-full w-[491px] bg-slate-500 shadow-lg transform transition-transform duration-300 ease-in-out z-10 ${
        isCourseOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <button onClick={onCourseClose}>
        <img className="w-[50px] h-[50px]" src={closeBtn} alt="close button" />
      </button>
      <div className="w-[428px] h-auto mx-auto text-center">
        <h2 className="mt-4 text-xl font-semibold">코스 정하기</h2>
        <div className="mt-4">
          {coursePlaces.map((place) => (
            <div key={place.id}>
              <PlacesItem place={place} />
              <div className="my-2 text-gray-400">▼</div>
            </div>
          ))}
          <div className="my-5">
            <button
              className="w-[300px] text-2xl h-12 border-2 border-gray-300 rounded-[10px] bg-gray-100"
              onClick={openSidebar}
            >
              +
            </button>
          </div>
        </div>
        <button className="relative mt-4 w-full py-2 text-lg bg-blue-500 text-white rounded-lg">저장 하기</button>
      </div>
      {isOpen && <Sidebar isOpen={isOpen} onClose={onClose} />}
    </div>
  );
};

export default SideBarCourse;
