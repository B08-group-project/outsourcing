import { useEffect, useState } from "react";
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { searchKeywordState, searchCategoryState, searchData, clickedPlaceState } from "../../recoil/atom/searchAtom";

const { kakao } = window;

function KakaoMap() {
  const [level, setLevel] = useState(3);
  const [info, setInfo] = useState();
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();
  const [location, setLoacation] = useState(null);
  const keyword = useRecoilValue(searchKeywordState);
  const category = useRecoilValue(searchCategoryState);
  const setSearchData = useSetRecoilState(searchData);
  const clickedPlace = useRecoilValue(clickedPlaceState);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(successHandler, errorHandler);
  }, []);

  useEffect(() => {
    if (!map) return;
    const ps = new kakao.maps.services.Places();

    const options = {
      category_group_code: category,
    };
    // CT1 : 영화관, AT4 : 관광명소, FD6 : 식당 , CE7 : 카페

    ps.keywordSearch(
      keyword,
      (data, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const bounds = new kakao.maps.LatLngBounds();
          let markers = [];
          const checkedData = data.map((item) => ({ ...item, checked: false }));
          setSearchData(checkedData);

          for (var i = 0; i < data.length; i++) {
            markers.push({
              position: {
                lat: data[i].y,
                lng: data[i].x,
              },
              content: data[i].place_name,
            });

            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
          }
          setMarkers(markers);

          map.setBounds(bounds);
        }
      },
      options,
    );
  }, [map, keyword, category]);

  const successHandler = (response) => {
    const { latitude, longitude } = response.coords;
    setLoacation({ latitude, longitude });
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
      style={{ width: "100%", height: "90vh" }} // 지도 크기
      level={level}
      onCreate={setMap}
    >
      {markers.map((marker) => (
        <MapMarker
          key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
          position={marker.position}
          onClick={() => setInfo(marker)}
        >
          {info && info.content === marker.content && <div style={{ color: "#000" }}>{marker.content}</div>}
        </MapMarker>
      ))}

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

      <button onClick={() => setLevel(level + 1)}>-</button>
      <button onClick={() => setLevel(level - 1)}>+</button>
    </Map>
  );
}

export default KakaoMap;
