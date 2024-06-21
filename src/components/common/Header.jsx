import { Link, useNavigate } from "react-router-dom";
import userImg from "../../assets/user.png";
import supabase from "../../supabase/supabase";
import logoImg from "../../assets/sky-blue-logo.png";
import { useEffect } from "react";

function Header() {
  const navigator = useNavigate();

  useEffect(() => {
    const loginCheck = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        navigator("/login");
      }
    };
    loginCheck();
  });

  const onClickLogout = async () => {
    await supabase.auth.signOut();
    navigator("/login");
  };

  return (
    <header className="fixed top-0 left-0 z-10 flex items-center justify-between w-full px-6 py-2 bg-white">
      <Link to="/">
        <img className="w-[200px] h-[50px]" src={logoImg} />
      </Link>
      <div className="flex gap-6">
        <Link to="/mypage" className="w-6 h-6">
          <img src={userImg} alt="마이페이지 링크" className=" mt-2" />
        </Link>
        <button onClick={onClickLogout} className=" bg-sky-300 p-3  rounded text-white text-xs">
          로그아웃
        </button>
      </div>
    </header>
  );
}

export default Header;
