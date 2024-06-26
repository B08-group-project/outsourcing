import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoImg from "../assets/sky-blue-logo.png";
import supabase from "../supabase/supabase";

const Signup = () => {
  const nicknameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmationRef = useRef(null);
  const navigator = useNavigate();

  const onClickSignup = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const nickname = nicknameRef.current.value;
    const confirmation = confirmationRef.current.value;

    // 유효성 검사는 함수화 해주세요.

    // 회원가입 함수
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (nickname.length < 1) {
      alert("Name 2글자 이상 입력해주세요");
      return;
    }
    if (email.length === 0) {
      alert("Email을 입력해주세요");
      return;
    }
    if (error && error.message === "Unable to validate email address: invalid format") {
      alert("이메일 형식으로 작성하세요");
    }
    if (error && error.message === "Password should be at least 6 characters.") {
      alert("비밀번호 6자 이상 입력해주세요");
      return;
    }
    if (password !== confirmation) {
      alert("Password가 맞지 않습니다. 확인해주세요");
      return;
    }

    if (error && error.message === "User already registered") {
      alert("중복된 이메일입니다.");
      return;
    }
    await supabase.from("users").insert({
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

  return (
    <div className="flex justify-center items-center flex-col h-screen">
      <form onSubmit={onClickSignup} className="flex flex-col w-80 gap-4">
        <div className="flex justify-center items-center">
          <img src={logoImg} className="h-16 w-60" />
        </div>
        <input
          type="text"
          placeholder="Name"
          ref={nicknameRef}
          className="px-2 py-2 rounded-md w-full border-2 text-xs"
        />
        <input
          type="email"
          placeholder="Email"
          ref={emailRef}
          className="px-2 py-2 rounded-md w-full border-2 text-xs"
        />
        <input
          type="password"
          placeholder="Password (6자 입력해주세요)"
          ref={passwordRef}
          className="px-2 py-2 rounded-md w-full border-2 text-xs"
        />
        <input
          type="password"
          placeholder="confirmation"
          ref={confirmationRef}
          className="px-2 py-2 rounded-md w-full ba bg border-2 text-xs"
        />
        <button className="bg-blue-400 p-2 rounded text-white text-sm">회원가입</button>
        <div className="text-sm flex justify-center">
          <Link to={"/login"} className="text-blue-400 font-bold hover:underline">
            이미 계정이 있으신가요?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
