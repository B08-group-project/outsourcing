import { useRef } from "react";
import supabase from "../supabase/supabase";
import { Link, useNavigate } from "react-router-dom";
import logoImg from "../assets/sky-blue-logo.png";

const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigator = useNavigate();

  const onClickLogin = async () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (email.length === 0) {
      alert("아이디를 입력해주세요");
      return;
    }
    if (password.length === 0 || password.length < 6) {
      alert("비밀번호를 입력해주세요 (6자 이상)");
      return;
    }
    if (error && error.message) {
      alert("아이디 비밀번호를 확인해주세요");
      return;
    }
    if (data.user.id) {
      navigator("/");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <div className="flex flex-col gap-4 p-6 border-double shadow-xl rounded-2xl w-80 h-80">
        <div className="flex justify-center items-center">
          <img src={logoImg} className=" h-16 w-60" />
        </div>
        <input
          type="text"
          placeholder="Email"
          ref={emailRef}
          className="w-full px-2 py-2 text-xs border-2 rounded-md"
        />
        <input
          type="password"
          placeholder="Password"
          ref={passwordRef}
          className="w-full px-2 py-2 text-xs border-2 rounded-md"
        />
        <button onClick={onClickLogin} className="p-2 text-sm text-white rounded bg-sky-300">
          로그인
        </button>
        <div className="flex justify-between text-xs ">
          <p>계정이 없으신가요?</p>
          <Link to={"/signup"} className="font-bold text-sky-400">
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
