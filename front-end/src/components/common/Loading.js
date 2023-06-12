import React from "react";
import styled from "styled-components";
import { COLOR } from "../../styles/color";

import Spinner from "../../assets/images/spinnerOrange.gif";

export const Loading = () => {
  return (
    <Background>
      <LoadingText>내 위치를 찾는 중입니다.</LoadingText>
      <img src={Spinner} alt="로딩중" width="10%" />
    </Background>
  );
};

const Background = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: #ffffffb7;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoadingText = styled.div`
  font-family: "SUIT Variable";
  font-style: normal;
  font-weight: 500;
  font-size: 1.5rem;
  line-height: 1.9rem;
  text-align: center;
  color: ${COLOR.MAIN_BLACK};
`;
