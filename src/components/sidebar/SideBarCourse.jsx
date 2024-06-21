import { QueryClient, useMutation } from "@tanstack/react-query";
import { useRecoilState, useSetRecoilState } from "recoil";
import closeBtn from "../../assets/close-2.png";
import { createCourse } from "../../lib/api/course";
import { clickedPlaceState, selectPlaceState } from "../../recoil/atom/searchAtom";
import PlacesItem from "./PlacesItem";
import Sidebar from "./Sidebar";

const SideBarCourse = ({ isCourseOpen, onCourseClose, isOpen, onClose, openSidebar }) => {
  const [coursePlaces, setCoursePlaces] = useRecoilState(selectPlaceState);
  const setClickedPlace = useSetRecoilState(clickedPlaceState);
  const queryClient = new QueryClient();

  const mutation = useMutation({
    mutationFn: createCourse,
    onSuccess: () => {
      queryClient.invalidateQueries(["coursePlaces"]);
      setCoursePlaces([]);
      setClickedPlace("");
    },
  });

  const handleSavePlaces = async () => {
    mutation.mutate(coursePlaces);
  };

  // 장소를 삭제하는 함수
  const handleDeletePlace = (idToDelete) => {
    const updatedPlaces = coursePlaces.filter((place) => place.id !== idToDelete);
    setCoursePlaces(updatedPlaces);
    setClickedPlace("");
  };

  const handleUp = (index) => {
    if (index > 0) {
      const updatedPlaces = [...coursePlaces];
      [updatedPlaces[index], updatedPlaces[index - 1]] = [updatedPlaces[index - 1], updatedPlaces[index]];
      setCoursePlaces(updatedPlaces);
    }
  };

  const handleDown = (index) => {
    if (index < coursePlaces.length - 1) {
      const updatedPlaces = [...coursePlaces];
      [updatedPlaces[index], updatedPlaces[index + 1]] = [updatedPlaces[index + 1], updatedPlaces[index]];
      setCoursePlaces(updatedPlaces);
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-[491px] bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-10 ${
        isCourseOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <header className="flex items-center justify-between p-4">
        <button onClick={onCourseClose}>
          <img className="w-8 h-8" src={closeBtn} alt="close button" />
        </button>
        <div className="flex gap-3">
          <button
            className="px-3 py-1 text-sm rounded-md border border-gray-300 hover:bg-gray-100"
            onClick={openSidebar}
          >
            +
          </button>
          <button
            className="px-3 py-1 text-sm rounded-md text-white bg-blue-400 hover:bg-blue-500"
            onClick={handleSavePlaces}
          >
            저장
          </button>
        </div>
      </header>
      <div className="mx-auto text-center p-4">
        <h2 className="text-xl font-semibold">코스 정하기</h2>
      </div>
      <div
        className="overflow-y-auto h-[calc(100%-130px)] p-4 w-[428px] mx-auto mb-5 text-center"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <style>{`.overflow-y-auto::-webkit-scrollbar {display: none;}`}</style>
        {coursePlaces.length === 0 ? (
          <>
            <span className="leading-8">등록된 장소가 없습니다</span>
            <br />
            <span className="text-gray-600 text-sm leading-8">우측 상단의 + 버튼을 눌러 코스 경로를 추가해주세요.</span>
          </>
        ) : (
          coursePlaces.map((place, index) => (
            <div key={place.id}>
              <div className="mt-[20px] ml-[10px] mb-[5px] flex text-[25px]">{index + 1}</div>
              <div className="shadow-lg flex items-center justify-between bg-white p-4">
                <PlacesItem place={place} />
                <div>
                  <button
                    className="mb-[10px] mr-1 transition-transform transform hover:-translate-y-1 hover:scale-125 "
                    onClick={() => handleUp(index)}
                  >
                    ↑
                  </button>
                  <button onClick={() => handleDeletePlace(place.id)}>
                    <img
                      className="w-[25px] h-[25px] mr-1 transition-transform transform hover:scale-125"
                      src={closeBtn}
                      alt="close button"
                    />
                  </button>
                  <button
                    className="mt-[10px] mr-1 transition-transform transform hover:translate-y-1 hover:scale-125"
                    onClick={() => handleDown(index)}
                  >
                    ↓
                  </button>
                </div>
              </div>
              {coursePlaces.length !== index + 1 && <div className="mt-6">▼</div>}
            </div>
          ))
        )}
      </div>
      <Sidebar isOpen={isOpen} onClose={onClose} />
    </div>
  );
};

export default SideBarCourse;
