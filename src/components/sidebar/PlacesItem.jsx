import React from "react";
import { useSetRecoilState } from "recoil";
import { clickedPlaceState } from "../../recoil/atom/searchAtom";

const PlacesItem = ({ place }) => {
  const setClickedPlace = useSetRecoilState(clickedPlaceState);

  const handleClick = () => {
    setClickedPlace(place);
  };

  return (
    <div
      className="flex items-center p-4 gap-4 w-[428px] h-[93px] bg-white border-b-2 border-gray-200 cursor-pointer"
      onClick={handleClick}
    >
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
