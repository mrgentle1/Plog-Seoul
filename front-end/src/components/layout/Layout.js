import { useMemo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { HomeHeader } from "./Header";
import { Footer } from "./Footer";

import styled from "styled-components";
import { COLOR } from "../../styles/color";

export const Layout = () => {
  const location = useLocation();

  const isFooter =
    location.pathname === "/home" ||
    location.pathname === "/course" ||
    location.pathname === "/record" ||
    location.pathname === "/plog" ||
    location.pathname === "/my";

  return (
    <StLayout>
      <HomeHeader />
      <Outlet />
      {isFooter ? <Footer /> : null}
    </StLayout>
  );
};

const StLayout = styled.div`
  display: flex;
  justify-content: center;
  overflow-x: hidden;
  width: 393px;
  padding-top: 127px;
  padding-bottom: 100px;
  overflow-y: scroll;
`;
