import React from "react";
import closeBtn from "../../assets/close-2.png";
import PlacesItem from "./PlacesItem";
import Sidebar from "./Sidebar";
import { useRecoilState } from "recoil";
import { create } from "../../lib/api/course";
import { selectPlaceState } from "../../recoil/atom/searchAtom";

const SideBarCourse = ({ isCourseOpen, onCourseClose, isOpen, onClose, openSidebar }) => {
  const [coursePlaces, setCoursePlaces] = useRecoilState(selectPlaceState);

  const handleSavePlaces = async () => {
    try {
      for (const place of coursePlaces) {
        const placesData = {
          address_name: place.address_name,
          id: place.id,
          phone: place.phone,
          place_name: place.place_name,
          place_url: place.place_url,
          road_address_name: place.road_address_name,
          x: place.x,
          y: place.y,
        };

        await create(placesData);
      }
      console.log("모든 장소 보내기 성공");
    } catch (error) {
      console.error("error:", error);
    }
  };

  const handleDeletePlace = (idToDelete) => {
    const updatedPlaces = coursePlaces.filter((place) => place.id !== idToDelete);
    setCoursePlaces(updatedPlaces);
  };

  return (
    <>
      {!isOpen && (
        <div
          className={`fixed top-0 right-0 h-full w-[491px] bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-10 ${
            isCourseOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between">
            <button onClick={onCourseClose}>
              <img className="w-[50px] h-[50px]" src={closeBtn} alt="close button" />
            </button>
            <button
              className="mx-3 relative mt-4 w-[130px] py-2 text-lg bg-blue-500 text-white rounded-lg"
              onClick={handleSavePlaces}
            >
              저장 하기
            </button>
          </div>
          <div className="w-[428px] h-auto mx-auto text-center">
            <h2 className="mt-4 text-xl font-semibold">코스 정하기</h2>
            <div className="mt-4">
              {coursePlaces.map((place) => (
                <div key={place.id}>
                  <div className="flex items-center justify-between bg-white p-4">
                    <PlacesItem place={place} />
                    <button onClick={() => handleDeletePlace(place.id)}>
                      <img className="w-[25px] h-[25px] mr-2" src={closeBtn} alt="close button" />
                    </button>
                  </div>
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
          </div>
        </div>
      )}
      {isOpen && <Sidebar isOpen={isOpen} onClose={onClose} />}
    </>
  );
};

export default SideBarCourse;
