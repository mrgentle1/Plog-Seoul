import styled from "styled-components";
import { COLOR } from "../../styles/color";

import { useCallback, useState } from "react";
import { useRecoilValue } from "recoil";
import { headerTitleState } from "../../core/headerTitle";
import { ReactComponent as Close } from "../../assets/icons/close.svg";
import { useNavigate } from "react-router-dom";

export const HomeHeaderV3 = ({ headerBackground }) => {
  const headerTitle = useRecoilValue(headerTitleState);

  const navigate = useNavigate();
  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <StHomeHeader backgroundColor={headerBackground}>
      <StHeaderTitle
        color={
          headerBackground === COLOR.MAIN_WHITE
            ? COLOR.MAIN_BLACK
            : COLOR.MAIN_WHITE
        }
      >
        {headerTitle}
      </StHeaderTitle>
      <StHeaderClose
        color={
          headerBackground === COLOR.MAIN_WHITE
            ? COLOR.MAIN_BLACK
            : COLOR.MAIN_WHITE
        }
      >
        <Close className="headerClose" onClick={goBack} />
      </StHeaderClose>
    </StHomeHeader>
  );
};

const StHomeHeader = styled.div`
  position: fixed;
  top: 0;
  width: 393px;
  height: 127px;
  padding: 66px 0 36px 20px;

  font-weight: 700;
  font-size: 20px;
  line-height: 15px;
  border: 0;

  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: space-evenly;
  align-items: center;

  z-index: 100;

  background-color: ${(props) => props.backgroundColor};
`;
const StHeaderTitle = styled.span`
  color: ${COLOR.MAIN_WHITE};
  width: 100%;
  height: 50px;
  font-weight: 700;
  font-size: 20px;
  line-height: 25px;
  margin-top: 30px;
  color: ${(props) => props.color};
`;
const StHeaderClose = styled.div`
  margin-right: 20px;
  width: 25px;
  height: 25px;
  color: ${COLOR.MAIN_WHITE};

  .headerClose {
    width: 27px;
    height: 27px;
    color: ${(props) => props.color};
  }
`;
