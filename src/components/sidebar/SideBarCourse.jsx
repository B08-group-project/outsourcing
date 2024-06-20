import React from "react";
import closeBtn from "../../assets/close-2.png";
import PlacesItem from "./PlacesItem";
import Sidebar from "./Sidebar";
import { useRecoilState } from "recoil";
import { createCourse } from "../../lib/api/course";
import { selectPlaceState } from "../../recoil/atom/searchAtom";
import FixedButton from "../common/FixedButton";

const SideBarCourse = ({ isCourseOpen, onCourseClose, isOpen, onClose, openSidebar }) => {
  const [coursePlaces, setCoursePlaces] = useRecoilState(selectPlaceState);

  const handleSavePlaces = async () => {
    await createCourse(coursePlaces);
    setCoursePlaces([]);
  };
  // 장소를 삭제하는 함수
  const handleDeletePlace = (idToDelete) => {
    const updatedPlaces = coursePlaces.filter((place) => place.id !== idToDelete);
    setCoursePlaces(updatedPlaces);
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-[491px] bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-10 ${
        isCourseOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <button onClick={onCourseClose}>
          <img className="w-[50px] h-[50px]" src={closeBtn} alt="close button" />
        </button>
      </div>
      <div className="w-[428px] h-auto mx-auto text-center p-4">
        <h2 className="mt-4 text-xl font-semibold">코스 정하기</h2>
      </div>
      <div
        className="overflow-y-auto h-[calc(100%-130px)] p-4 w-[428px] mx-auto text-center"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <style>{`.overflow-y-auto::-webkit-scrollbar {display: none;}`}</style>
        {coursePlaces.map((place) => (
          <div key={place.id}>
            <div className="shadow-lg flex items-center justify-between bg-white p-4">
              <PlacesItem place={place} />
              <dev>
                <button className="mb-[10px]">↑</button>
                <button onClick={() => handleDeletePlace(place.id)}>
                  <img className="w-[25px] h-[25px] mr-1" src={closeBtn} alt="close button" />
                </button>
                <button className="mt-[10px]">↓</button>
              </dev>
            </div>
            <div className="my-2 text-gray-400">▼</div>
          </div>
        ))}

        <div className="my-5">
          <button
            className="w-[300px] text-2xl h-12 border-2 border-gray-300 rounded-[10px] bg-gray-100 mb-[100px]"
            onClick={openSidebar}
          >
            +
          </button>
        </div>
      </div>
      <Sidebar isOpen={isOpen} onClose={onClose} />
      <FixedButton text="저장 하기" onClick={handleSavePlaces} />
    </div>
  );
};

export default SideBarCourse;
