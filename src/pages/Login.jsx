import { useRef } from "react";
import supabase from "../supabase/supabase";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import userState from "../recoil/atom/user";

const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [user, setUser] = useRecoilState(userState);
  const navigator = useNavigate();

  const onClickLogin = async () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (email === 0) {
      alert("Email을 입력해주세요");
      return;
    }
    if (password === 0) {
      alert("Password를 입력해주세요");
      return;
    }
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    navigator("/");
    console.log("data", data);
    console.log("error", error);
    setUser(data.user);
  };

  const onClickGitHub = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });
  };

  const OnclickBack = () => {
    navigator("/");
  };

  return (
    <div className="flex justify-center items-center  flex-col  h-screen  ">
      <div className=" pl-4 absolute top-0 pt-4 left-0">
        <button onClick={OnclickBack} style={{ backgroundImage: `url("/Back.svg")` }} className=" w-10 h-10"></button>
      </div>
      <div className="flex flex-col p-6 h-72  rounded-2xl gap-4 border-double  w-80 shadow-xl">
        <h2 className="text-center text-2xl">로 그 인</h2>
        <input
          type="text"
          placeholder="Email"
          ref={emailRef}
          className="px-2 py-2 rounded-md w-full border-2 text-xs"
        />
        <input
          type="password"
          placeholder="Password"
          ref={passwordRef}
          className="px-2 py-2 rounded-md w-full border-2 text-xs"
        />
        <button onClick={onClickLogin} className=" bg-sky-300 p-2  rounded text-white text-xs">
          로그인
        </button>
        <div className=" text-xs flex justify-between">
          <p>계정이 없으신가요?</p>
          <Link to={"/Signup"} className=" text-sky-400 font-bold">
            회원가입
          </Link>
        </div>
        <button onClick={onClickGitHub}> 깃허브</button>
      </div>
    </div>
  );
};

export default Login;
