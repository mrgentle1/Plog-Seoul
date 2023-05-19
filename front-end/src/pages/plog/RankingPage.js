import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as BackArrow } from "../../assets/icons/backArrow.svg";

import styled from "styled-components";
import { COLOR } from "../../styles/color";
import axios from "axios";

function RankingPage() {
  const token = localStorage.getItem("key");

  const navigate = useNavigate();
  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <StRankingPage>
      <RankingHeader>
        <BackArrow className="noticeBackArrow" onClick={goBack} />
        <HeaderText>랭킹</HeaderText>
      </RankingHeader>
      <RankingContainer>
        <TopUsersContainer></TopUsersContainer>
        <MyRankingContainer></MyRankingContainer>
        <OtherRankingContainer></OtherRankingContainer>
      </RankingContainer>
    </StRankingPage>
  );
}
export default RankingPage;

const StRankingPage = styled.div``;
const RankingHeader = styled.div`
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
const RankingContainer = styled.div``;
const TopUsersContainer = styled.div``;

const MyRankingContainer = styled.div``;

const OtherRankingContainer = styled.div``;
