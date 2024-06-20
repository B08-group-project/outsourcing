import { useEffect, useState } from "react";
import { CustomOverlayMap, Map, MapMarker, Polyline } from "react-kakao-maps-sdk";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { MARKER_IMG } from "../../constants/Category";
import {
  clickedPlaceState,
  pagesState,
  searchCategoryState,
  searchData,
  searchDataFallback,
  searchKeywordState,
  searchclickedPlace,
  selectPlaceState,
} from "../../recoil/atom/searchAtom";
import { useRecoilState } from "recoil";

const { kakao } = window;

function KakaoMap({ isSidebarOpen }) {
  const [level, setLevel] = useState(3);
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();
  const [location, setLocation] = useState(null);
  const [isCurrentLoading, setIsCurrentLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [activePage, setActivePage] = useState(0);
  const [pages, setPages] = useRecoilState(pagesState);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const keyword = useRecoilValue(searchKeywordState);
  const category = useRecoilValue(searchCategoryState);
  const setSearchData = useSetRecoilState(searchData);
  const selectedPlaces = useRecoilValue(selectPlaceState);
  const clickedPlace = useRecoilValue(clickedPlaceState);
  const notSearchData = useSetRecoilState(searchDataFallback);
  const searchClickedPlace = useRecoilValue(searchclickedPlace);

  const detectRef = (ref) => {
    setCurrentPage(ref);
    setActivePage(ref);
  };

  useEffect(() => {
    if (!map) return;
    if (selectedPlaces.length === 0) return;
    const bounds = new kakao.maps.LatLngBounds();

    for (var i = 0; i < selectedPlaces.length; i++) {
      bounds.extend(new kakao.maps.LatLng(selectedPlaces[i].y, selectedPlaces[i].x));
    }

    map.setBounds(bounds);
  }, [selectedPlaces]);

  useEffect(() => {
    if (!map) return;
    if (!keyword) return;
    const ps = new kakao.maps.services.Places();

    const options = {
      category_group_code: category,
    };

    ps.keywordSearch(
      keyword,
      (data, status, pagination) => {
        if (status === kakao.maps.services.Status.ZERO_RESULT) {
          notSearchData(true);
          setSearchData([]);
          setPages([]);
        }
        if (status === kakao.maps.services.Status.OK) {
          const pageArr = Array.from({ length: pagination.last }, (_, index) => index + 1);
          setPages(pageArr);
          pagination.gotoPage(currentPage);

          const bounds = new kakao.maps.LatLngBounds();
          const checkedData = data.map((item) => ({ ...item, checked: false }));
          setSearchData(checkedData);
          let markers = [];

          for (var i = 0; i < data.length; i++) {
            markers.push({
              position: {
                lat: data[i].y,
                lng: data[i].x,
              },
            });
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
          }
          setMarkers(markers);
          map.setBounds(bounds);
        }
      },
      options,
    );
  }, [map, keyword, category, currentPage]);

  const getPath = () => {
    return selectedPlaces.map((place) => ({ lat: place.y, lng: place.x }));
  };

  const successHandler = (response) => {
    const { latitude, longitude } = response.coords;
    setLocation({ latitude, longitude });
    setIsCurrentLoading(false);
  };

  const errorHandler = () => {
    setIsCurrentLoading(false);
    alert("위치조회를 거절하셔서 현재위치로 이동할수없습니다");
  };

  const setCurrentPosition = () => {
    setIsCurrentLoading(true);
    navigator.geolocation.getCurrentPosition(successHandler, errorHandler);
  };

  useEffect(() => {
    if (map && clickedPlace) {
      const placeLocation = new kakao.maps.LatLng(clickedPlace.y, clickedPlace.x);
      map.setCenter(placeLocation);
      setOverlayVisible(true);
    }
  }, [map, clickedPlace]);

  return (
    <Map
      center={{ lat: location ? location.latitude : 33.5563, lng: location ? location.longitude : 126.79581 }}
      style={{ width: "100%", height: "100vh" }} // 지도 크기
      level={level}
      onCreate={setMap}
      onClick={() => {
        if (overlayVisible) {
          setOverlayVisible(false);
        }
      }}
    >
      {isSidebarOpen &&
        markers
          .filter((marker) => {
            return !selectedPlaces.some((place) => place.x === marker.position.lng && place.y === marker.position.lat);
          })
          .map((marker) => (
            <MapMarker key={`marker-${marker.position.lat},${marker.position.lng}`} position={marker.position} />
          ))}
      {selectedPlaces.map((marker) => (
        <MapMarker
          key={`marker-${marker.id}`}
          position={{ lat: marker.y, lng: marker.x }}
          image={{
            src: MARKER_IMG[marker.category_group_code],
            size: { width: 45, height: 45 },
          }}
        />
      ))}
      <Polyline
        path={[getPath()]}
        strokeWeight={5} // 선의 두께 입니다
        strokeColor={"#4D99E5"} // 선의 색깔입니다
        strokeOpacity={1} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        strokeStyle={"solid"} // 선의 스타일입니다
      />
      <button
        className="fixed bottom-7 left-1 w-[2rem] h-[2rem] p-1 rounded-lg bg-white text-gray-600 z-30 border border-gray-400"
        onClick={() => setLevel(level + 1)}
      >
        -
      </button>
      <button
        className="fixed bottom-16 left-1 w-[2rem] h-[2rem] p-1 rounded-lg bg-white text-gray-600 z-30 border border-gray-400"
        onClick={() => setLevel(level - 1)}
      >
        +
      </button>
      <button
        className="fixed top-[80px] left-4 w-[5rem] h-[2rem] p-1 rounded-lg bg-white text-gray-600 z-30 border border-gray-400"
        onClick={setCurrentPosition}
      >
        {isCurrentLoading ? "로딩중" : "현재위치"}
      </button>

      {pages.length >= 1 &&
        pages.map((page) => {
          const leftPosition = 33 + (page - 1) * 3;
          return (
            <button
              key={page}
              name={page}
              onClick={() => detectRef(page)}
              style={{
                left: `${leftPosition}%`,
                backgroundColor: activePage === page ? "#84BBF2" : "white",
                color: activePage === page ? "white" : "gray",
              }}
              className="fixed bottom-2 w-[2rem] h-[2rem] p-1 rounded-lg bg-white text-gray-600 z-30 border border-gray-400"
            >
              {page}
            </button>
          );
        })}

      {clickedPlace && overlayVisible && clickedPlace && (
        <CustomOverlayMap position={{ lat: clickedPlace.y, lng: clickedPlace.x }}>
          <div className="relative bg-blue-50 rounded-lg shadow-lg p-4 max-w-xs top-[-80px] border border-blue-500">
            <div className="flex flex-col text-left">
              <span className="text-lg font-bold text-gray-800">
                <a href={clickedPlace.place_url} target="_blank" rel="noopener noreferrer">
                  {clickedPlace.place_name}
                </a>
              </span>
            </div>
          </div>
        </CustomOverlayMap>
      )}
      {Object.keys(searchClickedPlace).length >= 1 && (
        <CustomOverlayMap position={{ lat: searchClickedPlace.y, lng: searchClickedPlace.x }}>
          <div className="relative bg-blue-50 rounded-lg shadow-lg p-4 max-w-xs top-[-80px] border border-blue-500">
            <div className="flex flex-col text-left">
              <span className="text-lg font-bold text-gray-800">
                <a href={searchClickedPlace.place_url} target="_blank" rel="noopener noreferrer">
                  {searchClickedPlace.place_name}
                </a>
              </span>
            </div>
          </div>
        </CustomOverlayMap>
      )}
    </Map>
  );
}

export default KakaoMap;
