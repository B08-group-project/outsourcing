import { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { MARKER_IMG } from "../../constants/Category";
import { searchCategoryState, searchData, searchKeywordState, selectPlaceState } from "../../recoil/atom/searchAtom";

const { kakao } = window;

function KakaoMap() {
  const [level, setLevel] = useState(3);
  const [info, setInfo] = useState();
  const [map, setMap] = useState();
  const [location, setLocation] = useState(null);
  const keyword = useRecoilValue(searchKeywordState);
  const category = useRecoilValue(searchCategoryState);
  const setSearchData = useSetRecoilState(searchData);
  const markers = useRecoilValue(selectPlaceState);

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

  const successHandler = (response) => {
    const { latitude, longitude } = response.coords;
    setLocation({ latitude, longitude });
  };

  const errorHandler = (error) => {
    console.log(error);
  };

  return (
    <Map
      center={{ lat: location ? location.latitude : 33.5563, lng: location ? location.longitude : 126.79581 }}
      style={{ width: "100%", height: "90vh" }} // 지도 크기
      level={level}
      onCreate={setMap}
    >
      {markers.map((marker) => (
        <MapMarker
          key={`marker-${marker.id}`}
          position={{ lat: marker.y, lng: marker.x }}
          image={{
            src: MARKER_IMG[marker.category_group_code],
            size: { width: 30, height: 30 },
          }}
        />
      ))}
      <button onClick={() => setLevel(level + 1)}>-</button>
      <button onClick={() => setLevel(level - 1)}>+</button>
    </Map>
  );
}

export default KakaoMap;
