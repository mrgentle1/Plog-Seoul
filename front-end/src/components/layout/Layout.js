import { useMemo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { HomeHeader } from "./Header";
import { Footer } from "./Footer";
import { cssBaseLayoutStyle } from "./Layout.css";

export const Layout = () => {
  const location = useLocation();

  const isFooter =
    location.pathname === "/home" ||
    location.pathname === "/course" ||
    location.pathname === "/record" ||
    location.pathname === "/plog" ||
    location.pathname === "/my";

  return (
    <dic className="layout">
      <HomeHeader />
      <Outlet />
      {isFooter ? <Footer /> : null}
    </dic>
  );
};
