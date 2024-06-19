import { useEffect, useState } from "react";
import { Map, MapMarker, Polyline } from "react-kakao-maps-sdk";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { MARKER_IMG } from "../../constants/Category";
import { searchCategoryState, searchData, searchKeywordState, selectPlaceState } from "../../recoil/atom/searchAtom";

const { kakao } = window;

function KakaoMap() {
  const [level, setLevel] = useState(3);
  // const [info, setInfo] = useState();
  const [map, setMap] = useState();
  const [location, setLocation] = useState(null);
  const keyword = useRecoilValue(searchKeywordState);
  const category = useRecoilValue(searchCategoryState);
  const setSearchData = useSetRecoilState(searchData);
  const selectedPlaces = useRecoilValue(selectPlaceState);
  const clickedPlace = useRecoilValue(clickedPlaceState);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(successHandler, errorHandler);
  }, []);

  useEffect(() => {
    if (!map) return;
    if (!keyword) return;
    const ps = new kakao.maps.services.Places();

    const options = {
      category_group_code: category,
    };

    ps.keywordSearch(
      keyword,
      (data, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const bounds = new kakao.maps.LatLngBounds();
          const checkedData = data.map((item) => ({ ...item, checked: false }));
          setSearchData(checkedData);

          for (var i = 0; i < data.length; i++) {
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
          }

          map.setBounds(bounds);
        }
      },
      options,
    );
  }, [map, keyword, category]);

  const getPath = () => {
    return selectedPlaces.map((place) => ({ lat: place.y, lng: place.x }));
  };

  const successHandler = (response) => {
    const { latitude, longitude } = response.coords;
    setLocation({ latitude, longitude });
  };

  const errorHandler = (error) => {
    console.log(error);
  };

  useEffect(() => {
    if (map && clickedPlace) {
      const placeLocation = new kakao.maps.LatLng(clickedPlace.y, clickedPlace.x);
      map.setCenter(placeLocation);
    }
  }, [map, clickedPlace]);

  return (
    <Map
      center={{ lat: location ? location.latitude : 33.5563, lng: location ? location.longitude : 126.79581 }}
      style={{ width: "100%", height: "100vh" }} // 지도 크기
      level={level}
      onCreate={setMap}
    >
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

      {clickedPlace && (
        <CustomOverlayMap position={{ lat: clickedPlace.y, lng: clickedPlace.x }}>
          <div className="relative bg-blue-50 rounded-lg shadow-lg p-4 max-w-xs top-[-80px] border border-blue-500">
            <div className="flex flex-col text-left">
              <span className="text-lg font-bold text-gray-800">
                <a href={clickedPlace.place_url} target="_blank" rel="noopener noreferrer">
                  {clickedPlace.place_name} →
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
