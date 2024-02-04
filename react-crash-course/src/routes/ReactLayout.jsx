import { Outlet } from "react-router-dom";
import MainHeader from "../components/MainHeader.jsx";

function RootLayout() {
  return (
    <>
      <MainHeader />
      <Outlet />
    </>
  );
}

export default RootLayout;
