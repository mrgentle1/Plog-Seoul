import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as BackArrow } from "../../assets/icons/backArrow.svg";

import styled from "styled-components";
import { COLOR } from "../../styles/color";

function SeasonCoursePage() {
  const navigate = useNavigate();
  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <StSeasonCoursePage>
      <SeasonHeader>
        <BackArrow className="noticeBackArrow" onClick={goBack} />
        <HeaderText>계절별 추천 코스</HeaderText>
      </SeasonHeader>
      <SeasonContent></SeasonContent>
    </StSeasonCoursePage>
  );
}
export default SeasonCoursePage;

const StSeasonCoursePage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-top: 88px;
  .graph {
    margin-top: 40px;
  }
`;
const SeasonHeader = styled.div`
  position: fixed;
  top: 0;
  width: 393px;
  height: 118px;
  background: ${COLOR.MAIN_WHITE};
  z-index: 100;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  .noticeBackArrow {
    margin-top: 40px;
    margin-left: 20px;
  }
`;
const HeaderText = styled.div`
  margin-top: 39px;
  margin-left: 22px;
  font-family: "SUIT Variable";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 25px;
  color: ${COLOR.MAIN_BLACK};
`;
const SeasonContent = styled.div`
  margin-top: 24px;
  width: 353px;
`;
