import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoImg from "../assets/sky-blue-logo.png";
import supabase from "../supabase/supabase";

const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigator = useNavigate();

  const onClickLogin = async (e) => {
    e.preventDefault();
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
    if (password.length < 6) {
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
    <div className="flex flex-col items-center justify-center h-screen">
      <form onSubmit={onClickLogin} className="flex flex-col gap-4 w-80">
        <div className="flex justify-center items-center">
          <img src={logoImg} className="h-16 w-60" />
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
        <button className="p-2 text-sm text-white rounded bg-blue-400">로그인</button>
        <div className="flex justify-center text-sm">
          <Link to={"/signup"} className="font-bold text-blue-400 hover:underline">
            아직 계정이 없으신가요?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
