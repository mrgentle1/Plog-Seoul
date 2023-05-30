import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as BackArrow } from "../../assets/icons/backArrow.svg";

import styled from "styled-components";
import { COLOR } from "../../styles/color";
import { motion } from "framer-motion";

function ExchangePage() {
  const navigate = useNavigate();
  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <StExchangePage>
        <ExchangeHeader>
          <BackArrow className="ExchangeBackArrow" onClick={goBack} />
          <HeaderText>포인트 사용</HeaderText>
        </ExchangeHeader>
        <ExchangeContent>
          <div className="ExchangeText">
            <Box1>
              <Point>3800 P</Point>
              <Text1>현재 보유한 포인트</Text1>
            </Box1>
          </div>
        </ExchangeContent>
      </StExchangePage>
    </motion.div>
  );
}
export default ExchangePage;

const StExchangePage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-top: 88px;
`;
const ExchangeHeader = styled.div`
  position: fixed;
  top: 0;
  width: 393px;
  height: 88px;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  .ExchangeBackArrow {
    margin-top: 76px;
    margin-left: 20px;
  }
`;
const HeaderText = styled.div`
  margin-top: 74px;
  margin-left: 22px;
  font-family: "SUIT Variable";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 25px;
  color: ${COLOR.MAIN_BLACK};
`;
const ExchangeContent = styled.div`
  margin-top: 340px;
  .ExchangeText {
    font-family: "SUIT Variable";
    font-style: normal;
    font-weight: 600;
    font-size: 17px;
    line-height: 21px;
    color: ${COLOR.INPUT_BORDER_GRAY};
  }
`;
const Box1 = styled.div``;
const Point = styled.div``;
const Text1 = styled.div``;
