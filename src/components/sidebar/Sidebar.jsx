import { useEffect, useState } from "react";
import closeBtn from "../../assets/close-2.png";
import searchBtn from "../../assets/search.png";
import { useRecoilValue } from "recoil";
import { searchKeywordState, searchCategoryState, searchData, searchDataFallback } from "../../recoil/atom/searchAtom";
import ListItem from "./ListItem";
import { useRecoilState } from "recoil";
import SearchFallback from "./SearchFallback";

function Sidebar({ isOpen, onClose }) {
  const [searchInputValue, setSearchInputValue] = useState("");
  const [keyword, setKeyword] = useState("");
  const [sidebarData, setSidebarData] = useState([]);
  const [searchRecoil, setSearchRecoil] = useRecoilState(searchKeywordState);
  const [categoryRecoil, setCategoryRecoil] = useRecoilState(searchCategoryState);
  const searchedData = useRecoilValue(searchData);
  const [fallback, setFallback] = useRecoilState(searchDataFallback);

  useEffect(() => {
    setSidebarData(searchedData);
  }, [searchedData]);

  const keywordChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value);
  };

  const submitKeyword = (e) => {
    e.preventDefault();
    setCategoryRecoil("FD6");
    setFallback(false);
    setSearchInputValue(keyword);
    setSearchRecoil(keyword);
  };

  const valueChecker = () => {
    if (searchInputValue === "") {
      return;
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-[491px] shadow-lg bg-white transform transition-transform duration-300 ease-in-out z-10 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between p-3">
        <header className="text-[24px] font-bold ml-5">장소 검색</header>
        <button onClick={onClose}>
          <img className="w-[50px] h-[50px]" src={closeBtn} alt="close button" />
        </button>
      </div>

      <form className="relative flex items-center mb-4" onSubmit={submitKeyword}>
        <input
          className="border-solid border-2 border-[#ECECEC] rounded-2xl w-[431px] h-[40px] mx-auto p-2"
          type="text"
          placeholder="Search..."
          onChange={keywordChange}
          defaultValue={searchRecoil}
        />
        <button className="absolute right-10 top-1/2 transform -translate-y-1/2" onClick={valueChecker}>
          <img className="w-[18px] h-[18px]" src={searchBtn} alt="search image" />
        </button>
      </form>

      <div className="flex justify-center gap-3 mb-7">
        <button
          className={`text-[#84BBF2] w-[81px] h-[31px] border-2 border-[#C5DAEE] rounded-2xl ${
            categoryRecoil === "FD6" ? "bg-blue-300 text-white" : "bg-white"
          }`}
          onClick={() => setCategoryRecoil("FD6")}
        >
          맛집
        </button>
        <button
          className={`text-[#84BBF2] w-[81px] h-[31px] border-2 border-[#C5DAEE] rounded-2xl ${
            categoryRecoil === "CE7" ? "bg-blue-300 text-white" : "bg-white"
          }`}
          onClick={() => setCategoryRecoil("CE7")}
        >
          카페
        </button>
        <button
          className={`text-[#84BBF2] w-[81px] h-[31px] border-2 border-[#C5DAEE] rounded-2xl ${
            categoryRecoil === "AT4" ? "bg-blue-300 text-white" : "bg-white"
          }`}
          onClick={() => setCategoryRecoil("AT4")}
        >
          관광명소
        </button>
        <button
          className={`text-[#84BBF2] w-[81px] h-[31px] border-2 border-[#C5DAEE] rounded-2xl ${
            categoryRecoil === "CT1" ? "bg-blue-300 text-white" : "bg-white"
          }`}
          onClick={() => setCategoryRecoil("CT1")}
        >
          문화생활
        </button>
      </div>
      <main className="overflow-y-scroll h-[75%]">
        {sidebarData.length > 0 &&
          sidebarData.map((data, index) => <ListItem key={data.id} index={index} places={data} />)}
        {sidebarData.length === 0 && fallback && <SearchFallback />}
      </main>
    </div>
  );
}

export default Sidebar;
