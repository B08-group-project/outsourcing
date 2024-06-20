import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import supabase from "../supabase/supabase";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [coursePlaces, setCoursePlaces] = useState([]);
  const navigate = useNavigate();

  // 사용자 정보 및 코스 데이터 불러오기
  const {
    data: coursePlacesData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["coursePlaces"],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      // 코스 데이터 가져오기
      const { data: coursesData, error: courseError } = await supabase
        .from("course")
        .select("id, created_at, course_places(id, course_id, created_at, place_name, address_name, phone)")
        .eq("user_id", user.id);

        if(courseError){
          console.log(courseError);
        }

      // 닉네임 가져오기
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("nickname")
        .eq("id", user.id)
        .single();
        
        if(userError){
          console.log(userError);
        }

      setNickname(userData.nickname);
      setEmail(user.email);
      return coursesData;
    },
  });

  useEffect(() => {
    if (coursePlacesData) {
      setCoursePlaces(coursePlacesData);
    }
  }, [coursePlacesData]);

  // 코스 삭제 
  const handleDelete = async (courseId) => {
    const DeleteCheck = window.confirm('삭제 하시겠습니까?');
    if (DeleteCheck) {
      try {
        const { error } = await supabase.from("course").delete().eq("id", courseId);

        if (error) {
          alert("삭제 오류 발생");
        } else {
          alert("코스 삭제 완료");
          // 삭제된 코스를 화면에서 제거
          setCoursePlaces((prevCourses) => prevCourses.filter((course) => course.id !== courseId));
        }
      } catch (error) {
        alert("코스 삭제 오류 발생");
      }
    }
  };

  // Nickname 수정
  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const handleChangeNickname = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const { error } = await supabase.from("users").update({ nickname: nickname }).eq("id", user.id);
      if (error) {
        console.log(error.message);
        alert("닉네임 수정 오류 발생");
      } else {
        alert("닉네임 수정 완료");
      }
    } catch (error) {
      console.log(error);
      alert("닉네임 수정 오류 발생");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>에러발생: {error}</div>;
  }

  return (
    <>
      {/* 왼쪽 */}
      <div className="flex w-full h-screen">
        <button
          className="absolute top-[70px] left-[10px] rounded-2xl bg-sky-300 p-2 text-white"
          onClick={() => navigate(-1)}>뒤로 가기</button>
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
              onChange={handleNicknameChange}
            />
            <button className="h-8 p-2 mt-2 text-white rounded text-x7 bg-sky-300" onClick={handleChangeNickname}>
              수정 하기
            </button>
          </div>
        </div>

        {/* 오른쪽 */}
        <div className="flex-[7]">
          <h1 className="mx-10 mt-[80px] mb-8 text-2xl font-bold">저장된 코스</h1>
          <div className="flex flex-wrap mx-6">
            {coursePlaces.map((course, index) => (
              <div key={index} className="w-full mb-8">
                <h2 className="mx-4 mb-2 text-xl font-bold">
                  {index + 1}번째 코스 <span className="text-sm/[16px] text-slate-500">{course.created_at}</span>
                  <button className="shadow-2xl ml-[-30px] w-[100px]  text-sm/[14px] hover:text-rose-500 " onClick={() => handleDelete(course.id)}>삭제</button>
                </h2>
                <div className="flex flex-wrap items-center">
                  {course.course_places.map((place, placeIndex) => (
                    <div
                      key={place.id}
                      className="relative w-[270px] p-4 h-[100px] mx-6 mb-6 shadow-2xl flex flex-col justify-center leading-6 text-sm/[14px]"
                    >
                      <h3>가게이름: {place.place_name}</h3>
                      <p>주소: {place.address_name}</p>
                      {!place.phone && <p className="text-sm/[14px] text-slate-400 leading-6">등록된 번호 없음</p>}
                      {place.phone && <p>전화번호: {place.phone}</p>}
                      {placeIndex < course.course_places.length - 1 && (
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
