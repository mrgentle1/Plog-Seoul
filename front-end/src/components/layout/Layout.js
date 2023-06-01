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
    <StLayout isHome={location.pathname === "/home"}>
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
  width: 100%;
  height: 100%;
  padding-top: 117px;
  overflow-y: scroll;
  background-color: ${({ isHome }) => (isHome ? "#FCFCFC" : "transparent")};
`;
