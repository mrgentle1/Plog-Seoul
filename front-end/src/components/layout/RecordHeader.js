import styled from "styled-components";
import { COLOR } from "../../styles/color";

import { useCallback, useState } from "react";
import { ReactComponent as Close } from "../../assets/icons/close.svg";
import { useNavigate } from "react-router-dom";

export const RecordHeader = ({ headerBackground, headerTitle }) => {
  const navigate = useNavigate();
  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  // 오늘 날짜
  let now = new Date();
  let todayMonth = now.getMonth() + 1;
  let todayDate = now.getDate();

  return (
    <StRecordHeader>
      <span>
        {todayMonth}월 {todayDate}일
      </span>
      <p>개운산 숲 나들길</p>
      <CloseWrapper>
        <Close className="headerClose" />
      </CloseWrapper>
    </StRecordHeader>
  );
};
const StRecordHeader = styled.div`
  position: fixed;
  top: 0;
  width: 393px;
  height: 127px;

  display: grid;
  grid-template-columns: 88px auto 14px;

  align-items: center;

  padding-left: 20px;
  padding-right: 25px;

  background-color: ${COLOR.MAIN_WHITE};

  z-index: 100;

  span {
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 25px;
    color: ${COLOR.MAIN_BLACK};
  }

  p {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: ${COLOR.MAIN_GREEN};
  }

  .signupBackArrow {
    margin-top: 50px;
    margin-left: 20px;
  }
`;
const CloseWrapper = styled.div`
  .headerClose {
    width: 27px;
    height: 27px;
    color: ${COLOR.MAIN_BLACK};
  }
`;
