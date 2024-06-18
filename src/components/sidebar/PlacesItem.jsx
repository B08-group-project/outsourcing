import React from "react";

const PlacesItem = () => {
  const place = {
    address_name: "서울 마포구 합정동 472",
    category_group_code: "CE7",
    category_group_name: "카페",
    category_name: "음식점 > 카페 > 커피전문점 > 스타벅스",
    distance: "",
    id: "2057327896",
    phone: "02-323-3214",
    place_name: "스타벅스 합정점",
    place_url: "http://place.map.kakao.com/2057327896",
    road_address_name: "서울 마포구 월드컵로1길 14",
    x: "126.9121929350555",
    y: "37.5499934909868",
  };

  return (
    <div className="flex items-center p-4 gap-4 w-[428px] h-[93px] bg-white border-b-2 border-gray-200">
      <div className="w-16 h-16 bg-gray-300" />
      <div className="flex flex-col text-left">
        <span className="text-lg font-bold">
          <a>{place.place_name}</a>
        </span>
        <span className="text-sm text-gray-600">
          {place.road_address_name} / {place.address_name}
        </span>
        <span className="text-sm text-gray-600">{place.phone}</span>
      </div>
    </div>
  );
};

export default PlacesItem;
