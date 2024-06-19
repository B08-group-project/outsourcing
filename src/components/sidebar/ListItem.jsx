import { useRecoilState, useSetRecoilState } from "recoil";
import { searchData, selectPlaceState } from "../../recoil/atom/searchAtom";
import { useEffect, useState } from "react";

const ListItem = ({ index, places }) => {
  const [isCheck, setIsCheck] = useState(false);
  const [datePlace, setDatePlace] = useRecoilState(selectPlaceState);
  const setSearchedData = useSetRecoilState(searchData);

  useEffect(() => {
    const foundItem = datePlace.find((item) => item.id === places.id);
    if (foundItem) {
      setIsCheck(true);
    } else {
      setIsCheck(false);
    }
  }, [datePlace, places.id]);

  const toggleCheckBox = () => {
    if (isCheck) {
      setSearchedData((prev) => {
        return prev.map((item) => {
          if (item.id === places.id) {
            return { ...item, checked: false };
          }
          return item;
        });
      });
      setDatePlace((prev) => {
        return prev.filter((data) => data.id !== places.id);
      });
    } else if (!isCheck) {
      setSearchedData((prev) => {
        return prev.map((item) => {
          if (item.id === places.id) {
            return { ...item, checked: true };
          }
          return item;
        });
      });
      setDatePlace((prev) => [...prev, places]);
    }
    setIsCheck(!isCheck);
  };

  return (
    <li className="item flex">
      <div className="info">
        <span className={`marker marker_${index + 1}`}>{index + 1}</span>
        <a href={places.place_url}>
          <h5 className="info-item place-name">{places.place_name}</h5>
          {places.road_address_name ? (
            <>
              <span className="info-item road-address-name">{places.road_address_name}</span>
              <span className="info-item address-name">{places.address_name}</span>
            </>
          ) : (
            <span className="info-item address-name">{places.address_name}</span>
          )}
          <span className="info-item tel"> {places.phone}</span>
        </a>
      </div>
      <input type="checkbox" checked={isCheck} onChange={toggleCheckBox} />
    </li>
  );
};

export default ListItem;
