import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <main>
      MainLayout 입니다
      <Outlet />
    </main>
  );
}

export default MainLayout;
