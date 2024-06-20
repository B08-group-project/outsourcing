import { Link } from "react-router-dom";
import userImg from "../../assets/user.png";
// import logoImg from "../../assets/blue-logo.png";
import logoImg from "../../assets/sky-blue-logo.png";

function Header() {
  return (
    <header className="w-full bg-white fixed top-0 left-0 flex justify-between items-center px-6 py-2 z-10">
      <span className="w-6 h-6"></span>
      <Link to="/">
        <img className="w-[200px] h-[50px]" src={logoImg} />
        {/* <div className="text-lg font-bold">로고</div> */}
      </Link>
      <Link to="/mypage" className="w-6 h-6">
        <img src={userImg} alt="마이페이지 링크" />
      </Link>
    </header>
  );
}

export default Header;
