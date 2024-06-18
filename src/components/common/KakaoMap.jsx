import { useEffect } from "react";
// import barMarker from "../../assets/bar-marker.png";
import cafeMarker from "../../assets/cafe-marker.png";
// import playMarker from "../../assets/play-marker.png";
// import restaurantMarker from "../../assets/restaurant-marker.png";

const { kakao } = window;

function KakaoMap() {
  useEffect(() => {
    var container = document.getElementById("map");
    const position = new kakao.maps.LatLng(33.450701, 126.570667);
    var options = {
      center: position,
      level: 3,
    };

    var map = new kakao.maps.Map(container, options);

    // setMarker({ map, imageSrc: barMarker, position });
    setMarker({ map, imageSrc: cafeMarker, position });
    // setMarker({ map, imageSrc: playMarker, position });
    // setMarker({ map, imageSrc: restaurantMarker, position });
  }, []);

  const setMarker = ({ map, imageSrc, position: markerPosition }) => {
    var imageSize = new kakao.maps.Size(64, 69),
      imageOption = { offset: new kakao.maps.Point(0, 10) };

    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

    var marker = new kakao.maps.Marker({
      position: markerPosition,
      image: markerImage,
    });

    marker.setMap(map);
  };

  return <div id="map" style={{ width: "100%", height: "100vh" }}></div>;
}

export default KakaoMap;
