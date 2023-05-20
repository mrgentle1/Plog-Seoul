import { useMemo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { HomeHeader } from "./Header";
import { HomeHeaderV2 } from "./HeaderV2";
import { Footer } from "./Footer";

import styled from "styled-components";
import { COLOR } from "../../styles/color";

export const Layout = () => {
  const location = useLocation();

  const isHeaderV2 = location.pathname === "/course";

  const isFooter =
    location.pathname === "/home" ||
    location.pathname === "/course" ||
    location.pathname === "/record" ||
    location.pathname === "/plog" ||
    location.pathname === "/my";

  return (
    <StLayout isHome={location.pathname === "/home"}>
      {isHeaderV2 ? null : <HomeHeader />}
      <Outlet />
      {isFooter ? <Footer /> : null}
    </StLayout>
  );
};

const StLayout = styled.div`
  display: flex;
  justify-content: center;
  overflow-x: hidden;
  width: 100%;
  height: 100%;
  padding-top: 127px;
  overflow-y: scroll;
  background-color: ${({ isHome }) =>
    isHome ? COLOR.INPUT_GRAY : "transparent"};
`;
