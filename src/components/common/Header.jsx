import { Link, useNavigate } from "react-router-dom";
import userImg from "../../assets/user.png";
import supabase from "../../supabase/supabase";
import { useRecoilState } from "recoil";
import { loginOut } from "../../recoil/atom/login";
import { useEffect } from "react";
import logoImg from "../../assets/sky-blue-logo.png";

function Header() {
  const navigator = useNavigate();
  const [isLogin, setIsLogin] = useRecoilState(loginOut);

  useEffect(() => {
    if (!isLogin) {
      navigator("/login");
    }
  });

  const onClickLogout = async () => {
    const { data } = await supabase.auth.signOut();
    navigator("/login");
    setIsLogin(false);
  };

  return (
    <header className="w-full bg-white fixed top-0 left-0 flex justify-between items-center px-6 py-2 z-10">
      <span className="w-6 h-6"></span>
      <Link to="/">
        <img className="w-[200px] h-[50px]" src={logoImg} />
      </Link>
      <div className="flex gap-2">
        <button onClick={onClickLogout} className=" bg-sky-300 p-2  rounded text-white text-xs">
          로그아웃
        </button>
        <Link to="/mypage" className="w-6 h-6">
          <img src={userImg} alt="마이페이지 링크" />
        </Link>
      </div>
    </header>
  );
}

export default Header;
