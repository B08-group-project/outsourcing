import { useEffect, useState } from "react";
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
import { useRecoilValue } from "recoil";
import { searchKeywordState } from "../../recoil/atom/searchAtom";

const { kakao } = window;

function KakaoMap() {
  const [level, setLevel] = useState(3);
  const [info, setInfo] = useState();
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();
  const [location, setLoacation] = useState(null);
  const keyword = useRecoilValue(searchKeywordState);

  const setLocalStorage = (key, value) => {
    localStorage.setItem(key, value);
    window.dispatchEvent(new Event("storageChanged"));
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(successHandler, errorHandler);
  }, []);

  useEffect(() => {
    if (!map) return;
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(keyword, (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const bounds = new kakao.maps.LatLngBounds();
        let markers = [];
        setLocalStorage("searchData", JSON.stringify(data));

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
    });
  }, [map, keyword]);

  const successHandler = (response) => {
    const { latitude, longitude } = response.coords;
    setLoacation({ latitude, longitude });
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
          key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
          position={marker.position}
          onClick={() => setInfo(marker)}
        >
          {info && info.content === marker.content && <div style={{ color: "#000" }}>{marker.content}</div>}
        </MapMarker>
      ))}
      <button onClick={() => setLevel(level + 1)}>-</button>
      <button onClick={() => setLevel(level - 1)}>+</button>
    </Map>
  );
}

export default KakaoMap;
