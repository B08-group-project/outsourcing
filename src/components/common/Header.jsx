import { Link } from "react-router-dom";
import userImg from "../../assets/user.png";

function Header() {
  return (
    <header className="fixed top-0 left-0 z-10 flex items-center justify-between w-full px-6 py-2 bg-white">
      <span className="w-6 h-6"></span>
      <Link to="/">
        <div className="text-lg font-bold">로고</div>
      </Link>
      <Link to="/mypage" className="w-6 h-6">
        <img src={userImg} alt="마이페이지 링크" />
      </Link>
    </header>
  );
}

export default Header;
