import React, { useState } from "react";
import closeBtn from "../../assets/close-2.png";
import searchBtn from "../../assets/search.png";
import SearchItem from "./SearchItem";
import Map from "../common/Map";
import { useSetRecoilState } from "recoil";
import { searchKeywordState } from "../../recoil/atom/searchAtom";
import KakaoMap from "../common/KakaoMap";

// const { kakao } = window;

function Sidebar() {
  const [Value, setValue] = useState("");
  // 제출한 검색어 관리
  const [Keyword, setKeyword] = useState("");
  const setSearchRecoil = useSetRecoilState(searchKeywordState);

  // 입력 폼 변화 감지하여 입력 값을 state에 담아주는 함수
  const keywordChange = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  // 제출한 검색어 state에 담아주는 함수
  const submitKeyword = (e) => {
    e.preventDefault();
    setKeyword(Value);
    setSearchRecoil(Value);
  };

  // 검색어를 입력하지 않고 검색 버튼을 눌렀을 경우
  const valueChecker = () => {
    if (Value === "") {
      alert("검색어를 입력해주세요.");
    }
  };
  return (
    <div className="w-[491px] h-[100vh] bg-slate-500">
      <div className="flex items-center justify-between p-3">
        <header className="text-[24px] font-bold ml-5">장소 검색</header>
        <img className="w-[50px] h-[50px]" src={closeBtn} alt="close button" />
      </div>

      <form className="relative flex items-center mb-4" onSubmit={submitKeyword}>
        <input
          className="border-solid border-2 border-[#ECECEC] rounded-2xl w-[431px] h-[40px] mx-auto p-2"
          type="text"
          placeholder="Search..."
          onChange={keywordChange}
        />
        <button className="absolute right-10 top-1/2 transform -translate-y-1/2" onClick={valueChecker}>
          <img className="w-[18px] h-[18px]" src={searchBtn} alt="search image" />
        </button>
      </form>

      <div className="flex justify-center gap-3 mb-7">
        <button className="text-[#84BBF2] w-[81px] h-[31px] border-2 border-[#C5DAEE] rounded-2xl">맛집</button>
        <button className="text-[#84BBF2] w-[81px] h-[31px] border-2 border-[#C5DAEE] rounded-2xl">카페</button>
        <button className="text-[#84BBF2] w-[81px] h-[31px] border-2 border-[#C5DAEE] rounded-2xl">놀거리</button>
        <button className="text-[#84BBF2] w-[81px] h-[31px] border-2 border-[#C5DAEE] rounded-2xl">술집</button>
      </div>
      <main>
        {/* <Map searchKeyword={Keyword} /> */}
        <KakaoMap />
      </main>
    </div>
  );
}

export default Sidebar;
