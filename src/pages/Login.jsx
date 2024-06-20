import { useEffect, useRef } from "react";
import supabase from "../supabase/supabase";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginOut } from "../recoil/atom/login";

const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigator = useNavigate();
  const [isLogin, setIsLogin] = useRecoilState(loginOut);

  useEffect(() => {
    if (isLogin === true) {
      navigator("/");
    }
  });

  const onClickLogin = async () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      alert("로그인이 되지 않았어요! 다시 입력해주세요!");
    }
    if (data.user.id) {
      navigator("/");
      setIsLogin(true);
    }
  };

  return (
    <div className="flex justify-center items-center  flex-col  h-screen  ">
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
      </div>
    </div>
  );
};

export default Login;
