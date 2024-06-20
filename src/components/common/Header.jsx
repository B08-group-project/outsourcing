import { Link, useNavigate } from "react-router-dom";
import userImg from "../../assets/user.png";
import { useEffect } from "react";
import supabase from "../../supabase/supabase";

function Header() {
  const navigator = useNavigate();
  const token = localStorage.getItem("sb-dsvfmxsahcirxphfczum-auth-token");

  const onClickLogout = async () => {
    const { data } = await supabase.auth.signOut();
    navigator("/login");
  };

  useEffect(() => {
    if (!token) {
      navigator("/login");
    }
  }, []);

  return (
    <header className="w-full bg-white fixed top-0 left-0 flex justify-between items-center px-6 py-2 z-10">
      <span className="w-6 h-6"></span>
      <Link to="/">
        <div className="text-lg font-bold">로고</div>
      </Link>
      <div className="flex">
        <button onClick={onClickLogout}>로그아웃</button>
        <Link to="/mypage" className="w-6 h-6">
          <img src={userImg} alt="마이페이지 링크" />
        </Link>
      </div>
    </header>
  );
}

export default Header;
