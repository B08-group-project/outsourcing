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
    await supabase.auth.signOut();
    navigator("/login");
    setIsLogin(false);
  };

  return (
    <header className="fixed top-0 left-0 z-10 flex items-center justify-between w-full px-6 py-2 bg-white">
      <Link to="/">
        <img className="w-[200px] h-[50px]" src={logoImg} />
      </Link>
      <div className="flex gap-6">
        <Link to="/mypage" className="w-6 h-6 mt-1">
          <img src={userImg} alt="마이페이지 링크" />
        </Link>
        <button onClick={onClickLogout} className=" bg-sky-300 p-2  rounded text-white text-xs">
          로그아웃
        </button>
      </div>
    </header>
  );
}

export default Header;
