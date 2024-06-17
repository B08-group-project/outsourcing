import { useEffect } from "react";

const { kakao } = window;

function KakaoMap() {
  useEffect(() => {
    var container = document.getElementById("map");
    var options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

    var map = new kakao.maps.Map(container, options);
  }, []);
  return (
    <div>
      <div id="map" style={{ width: "100%", height: "100vh" }}></div>
    </div>
  );
}

export default KakaoMap;
