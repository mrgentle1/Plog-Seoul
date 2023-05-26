import React, { useEffect, useState } from "react";
import { ReactComponent as Ranking1st } from "../../assets/icons/ranking1st.svg";

import styled from "styled-components";
import { COLOR } from "../../styles/color";

export const RankingBarGraph = ({ num, bgColor, max }) => {
  const [height, setHeight] = useState(0);
  const [showNumber, setShowNumber] = useState(false);
  const [showIcon, setShowIcon] = useState(false);

  useEffect(() => {
    increaseHeight();
    //console.log("3", showIcon, num);
    // setShowIcon(true);
    // console.log("4", showIcon, num);
    const timer = setTimeout(() => {
      setShowIcon(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  //   useEffect(() => {
  //     if (showNumber) {
  //       console.log("5", showIcon, num);
  //     }
  //   }, [showIcon]);

  const increaseHeight = () => {
    setHeight(max); // 막대 그래프의 최대 높이로 설정합니다.
    setShowNumber(true); // 숫자 1을 표시합니다.
    //console.log("1", showIcon, num);
    setShowIcon(true);
    //console.log("2", showIcon, num);
  };

  return (
    <StRankingBarGraph>
      {num === 1 && (
        <RankingIcon visible={showIcon ? 1 : 0}>
          <Ranking1st />
        </RankingIcon>
      )}
      <BarWrapper>
        <Bar height={height} bgColor={bgColor}>
          <Number
            visible={showNumber ? 1 : 0}
            color={
              bgColor === COLOR.MAIN_GREEN ? COLOR.MAIN_WHITE : COLOR.MAIN_BLACK
            }
          >
            {num}
          </Number>
        </Bar>
      </BarWrapper>
    </StRankingBarGraph>
  );
};

const StRankingBarGraph = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RankingIcon = styled.div`
  width: 1.97rem;
  height: 2.67rem;
  opacity: ${(props) => props.visible};
  transition: opacity 1.5s ease-in;
`;

const Bar = styled.div`
  width: 4.8rem;
  height: ${(props) => props.height}px;
  background: ${(props) => props.bgColor};
  border-radius: 1.4rem 1.4rem 0rem 0rem;
  transition: height 1.3s ease;

  position: relative;
`;

const Number = styled.span`
  position: absolute;
  top: 2rem;
  left: 50%;
  transform: translateX(-50%);
  font-weight: bold;
  opacity: ${(props) => props.visible};
  transition: opacity 0.5s ease;
  font-family: "SUIT Variable";
  font-style: normal;
  font-weight: 700;
  font-size: 2rem;
  line-height: 2.5rem;
  color: ${(props) => props.color};
`;

const BarWrapper = styled.div`
  width: 4.8rem;
  height: 18.6rem;
  display: flex;
  align-items: flex-end;
`;
