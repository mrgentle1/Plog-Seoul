import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as BackArrow } from "../../assets/icons/backArrow.svg";
import { ReactComponent as AchieveAll } from "../../assets/icons/achieveAll.svg";

import styled from "styled-components";
import { COLOR } from "../../styles/color";

function AchievementPage() {
  const navigate = useNavigate();
  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <StNoticePage>
      <NoticeHeader>
        <BackArrow className="noticeBackArrow" onClick={goBack} />
        <HeaderText>달성한 업적</HeaderText>
      </NoticeHeader>
      <NoticeContent>
        <AchieveAll />
      </NoticeContent>
    </StNoticePage>
  );
}
export default AchievementPage;

const StNoticePage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-top: 88px;
`;
const NoticeHeader = styled.div`
  position: fixed;
  top: 0;
  width: 393px;
  height: 88px;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  .noticeBackArrow {
    margin-top: 54px;
    margin-left: 20px;
  }
`;
const HeaderText = styled.div`
  margin-top: 53px;
  margin-left: 22px;
  font-family: "SUIT Variable";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 25px;
  color: ${COLOR.MAIN_BLACK};
`;
const NoticeContent = styled.div`
  margin-top: 30px;
  .noticeText {
    font-family: "SUIT Variable";
    font-style: normal;
    font-weight: 600;
    font-size: 17px;
    line-height: 21px;
    color: ${COLOR.INPUT_BORDER_GRAY};
  }
`;
