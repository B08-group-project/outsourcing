import { useRef, useState } from "react";
import supabase from "../supabase/supabase";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const nicknameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmationRef = useRef(null);
  const [user, setUser] = useState(null);
  const navigator = useNavigate();

  const OnclickSignup = async () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const nickname = nicknameRef.current.value;
    const confirmation = confirmationRef.current.value;

    if (nickname.length < 1) {
      alert("Name 2글자 이상 입력해주세요");
      return;
    }
    if (email.length === 0) {
      alert("Email을 입력해주세요");
      return;
    }
    if (password.length === 0 || password > 6) {
      alert("Password를 6자 이상입력해주세요");
      return;
    }
    if (password !== confirmation) {
      alert("Password가 맞지 않습니다. 확인해주세요");
      return;
    }

    const { data } = await supabase.auth.signUp({
      email,
      password,
    });
    setUser(data);

    const { error } = await supabase.from("users").insert({
      id: data.user.id,
      nickname,
      email,
    });

    if (data) {
      alert("회원가입이 완료되었어요");
      navigator("/login");
    } else {
      alert("오류! 다시 회원가입 해주세요");
    }
  };

  // const OnclickBack = () => {
  //   navigator("/login");
  // };

  return (
    <div className="flex justify-center items-center  flex-col h-screen ">
      {/* <div className=" w-screen pl-4 absolute top-0 pt-4">
        <button onClick={OnclickBack} className=" w-28 h-9 bg-sky-300 rounded-lg text-white ">
          뒤로 가기
        </button>
      </div> */}
      <div className="flex flex-col p-6 h-96  rounded-2xl gap-4 border-double  w-96 shadow-xl">
        <h2 className="text-center text-2xl">회 원 가 입</h2>
        <input
          type="text"
          placeholder="Name"
          ref={nicknameRef}
          className=" px-2 py-2 rounded-md w-full border-2 text-xs"
        />
        <input
          type="email"
          placeholder="Email"
          ref={emailRef}
          className=" px-2 py-1 rounded-md w-full border-2 text-xs"
        />
        <input
          type="password"
          placeholder="Password"
          ref={passwordRef}
          className=" px-2 py-2 rounded-md w-full border-2 text-xs"
        />
        <input
          type="password"
          placeholder="Password"
          ref={confirmationRef}
          className=" px-2 py-2 rounded-md w-full ba bg border-2 text-xs"
        />
        <button onClick={OnclickSignup} className=" bg-sky-300 p-2  rounded text-white text-xs">
          회원가입
        </button>
        <div className=" text-xs flex justify-between">
          <p>계정이 있으신가요?</p>
          <Link to={"/Login"} className=" text-sky-400 font-bold">
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
