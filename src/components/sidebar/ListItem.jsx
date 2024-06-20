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
    <li className="flex relative items-center mb-4 border-b border-solid border-gray-400 w-[90%] mx-auto pb-3">
      <div className="flex gap-5 items-center">
        <span className="font-semibold">{index + 1}</span>
        <div>
          <h5 className="mb-2 font-semibold ">{places.place_name}</h5>
          {places.road_address_name ? (
            <>
              <span className="">{places.road_address_name}</span>
            </>
          ) : (
            <span className="">{places.address_name}</span>
          )}
          {places.phone ? <span className="ml-3"> {`tel: ${places.phone}`}</span> : null}
        </div>
      </div>
      <input
        className="w-[20px] h-[20px] cursor-pointer absolute right-0"
        type="checkbox"
        checked={isCheck}
        onChange={toggleCheckBox}
      />
    </li>
  );
};

export default ListItem;
