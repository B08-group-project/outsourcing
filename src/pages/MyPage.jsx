import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import supabase from "../supabase/supabase";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();

  const {
    data: coursePlaces,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["coursePlaces"],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      // 코스정보
      const { data: PlaceData, error } = await supabase
        .from("course")
        .select("id, created_at, course_places(id, course_id, created_at, place_name, address_name, phone)")
        .eq("user_id", user.id);
      // 닉네임
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("nickname")
        .eq("id", user.id)
        .single();

      if (error) {
        console.log(userError);
      }
      setEmail(user.email);
      setNickname(userData.nickname);

      return PlaceData;
    },
  });

  // Nickname 수정 로직
  const HandleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const ChangeNickname = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { data, error } = await supabase.from("users").update({ nickname: nickname }).eq("id", user.id);

    if (error) {
      console.log("닉네임 수정안됨", error);
      alert("닉네임 수정안됨");
    } else {
      console.log("닉네임 수정됨", data);
      alert("닉네임 수정됨");
      setNickname(nickname);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>에러발생: {error.message}</div>;
  }

  return (
    <>
      {/* 왼쪽 */}
      <div className="flex w-full h-screen">
        <button
          className="absolute top-[50px] left-[10px] rounded-2xl bg-sky-300 p-2 text-white"
          onClick={() => navigate(-1)}
        >
          뒤로 가기
        </button>
        <div className="flex-[3] flex justify-center items-center">
          <div className="flex flex-col w-80 justify-center absolute top-[200px] border-double shadow-xl rounded-2xl border-sky-500 p-8">
            <header className="flex items-start mb-6 text-4xl font-black justify-left">My Page</header>
            <label htmlFor="email" className="mb-1">
              My Email
            </label>
            <span className="w-full h-8 px-2 py-2 mb-5 text-xs border-2 rounded-md border-black-100">{email}</span>
            <label htmlFor="nickname" className="mb-1">
              Nickname
            </label>
            <input
              type="text"
              className="w-full h-8 px-2 py-2 mb-5 text-xs border-2 rounded-md"
              value={nickname}
              onChange={HandleNicknameChange}
            />
            <button className="h-8 p-2 mt-2 text-white rounded text-x7 bg-sky-300" onClick={ChangeNickname}>
              수정 하기
            </button>
          </div>
        </div>

        {/* 오른쪽 */}
        <div className="flex-[7]">
          <h1 className="mx-10 mt-12 mb-4 text-2xl font-bold">저장된 코스</h1>
          <div className="flex flex-wrap mx-6">
            {coursePlaces.map((courses, placeIndex) => (
              <div key={placeIndex} className="w-full mb-8">
                <h2 className="mx-4 mb-2 text-xl font-bold">
                  {placeIndex + 1}번째 코스 <span className="text-sm/[16px] text-slate-500">{courses.created_at}</span>
                </h2>
                <div className="flex flex-wrap items-center">
                  {courses.course_places.map((place, placeIndex) => (
                    <div
                      key={place.id}
                      className="relative w-[270px] p-4 h-[100px] mx-6 mb-6 shadow-2xl flex flex-col justify-center leading-6 text-sm/[14px]"
                    >
                      <h3>가게이름: {place.place_name}</h3>
                      <p>주소: {place.address_name}</p>
                      {!place.phone && <p className="text-sm/[14px] text-slate-400 leading-6">등록된 번호 없음</p>}
                      {place.phone && <p>전화번호: {place.phone}</p>}
                      {placeIndex < courses.course_places.length - 1 && (
                        <p className="absolute right-[-40px] top-[30px] text-3xl">→</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default MyPage;
