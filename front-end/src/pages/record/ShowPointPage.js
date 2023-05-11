import { useEffect, useState, useRef } from "react";

import styled from "styled-components";
import { COLOR } from "../../styles/color";

import { ReactComponent as Fire } from "../../assets/icons/pointFire.svg";
import ProgressBar from "../../components/Record/ProgressBar";
import Bar from "../../components/Record/Bar";

const point_list = [
  { level: "1", min: 0, max: 1500 },
  { level: "2", min: 1500, max: 4500 },
  { level: "3", min: 4500, max: 10000 },
  { level: "4", min: 10000, max: 20000 },
];
function ShowPointPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isLevelUp, setIsLevelUp] = useState(false);
  const [isLast, setIsLast] = useState(false);
  const [myPoint, setMyPoint] = useState(80);
  const [maxPoint, setMaxPoint] = useState(100);

  const myP = useRef(800);
  const maxP = useRef(100);
  const level = useRef(1);
  const update = useRef(false);

  const plusPoint = () => {
    // setMyPoint(myPoint + 250);
    myP.current = myP.current + 250;
    console.log("myp:", myP.current);
    setIsLoading(true);
  };

  const levelUP = () => {
    console.log("levelUp");
    // setMaxPoint(800);
    myP.current = myP.current - 1000;
    console.log("mypLE:", myP.current);

    setIsLast(true);
  };

  useEffect(() => {
    if (isLoading) {
      console.log("plus");
      if (myP.current > 1000) {
        level.current = level.current + 1;
        console.log("le", level.current);
        setIsLevelUp(true);
      } else {
        setIsLast(true);
      }
    } else {
    }
  }, [isLoading]);

  useEffect(() => {
    if (isLevelUp) {
      console.log("levelUp");
      levelUP();
    }
  }, [isLevelUp]);

  /*
  현재 포인트를 가져옴
  포인트에 조건에 따라 값을 더함
  set 포인트 하면
  프로그레스바 증가

  만약 증가한 포인트값이 현재 레벨의 max보다 크다면
  max를 다음 레벨의 max값으로 업데이트 set max
  레벨업 글씨 + 포인트 추가된 현재의 레벨 
  + 컨페티와 함께 프로그레스바 max늘어나며 색부분 감소

  증가된 현재 포인트값 넘김

  각 레벨 별로 max 값은 

  다음 레벨까지 남은 포인트는 마지막에 나와야함
  */

  return (
    <StShowPointPage>
      <ShowPointHeader>
        <span>오늘의 포인트</span>
      </ShowPointHeader>
      <ShowPointContainer>
        <Fire />
        <CurrentLevelWrapper>Level 5</CurrentLevelWrapper>

        <GetPointWrapper></GetPointWrapper>
        {isLoading ? (
          <Bar value={myP.current} />
        ) : (
          <ProgressWrapper>
            <progress
              className="mypage_point_progress"
              value={myP.current}
              min={0}
              max={1000}
            ></progress>
          </ProgressWrapper>
        )}

        {isLast && (
          <CommentWrapper>
            <p>다음 레벨까지 {1000 - myP.current}포인트 남았어요!</p>
          </CommentWrapper>
        )}

        <button onClick={() => plusPoint()}>qjxms</button>
      </ShowPointContainer>
    </StShowPointPage>
  );
}

export default ShowPointPage;

const StShowPointPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
  max-width: 393px;
  padding-top: 127px;
  padding-bottom: 200px;
  padding-left: 20px;
  padding-right: 20px;
`;

const ShowPointHeader = styled.div`
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
    white-space: nowrap;
  }
`;

const ShowPointContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
`;

const CurrentLevelWrapper = styled.p`
  display: flex;
  font-style: normal;
  font-weight: 700;
  font-size: 17px;
  line-height: 21px;
  text-align: center;
  color: ${COLOR.MAIN_BLACK};
`;

const GetPointWrapper = styled.p``;

const ProgressWrapper = styled.div`
  .mypage_point_progress {
    display: flex;

    appearance: none;
    width: 321px;
    height: 10px;
    margin-top: 18px;
    ::-webkit-progress-bar {
      background: ${COLOR.LIGHT_GRAY};
      border-radius: 50px;
    }

    ::-webkit-progress-value {
      background: ${COLOR.MAIN_GREEN};
      border-radius: 50px;
      transition: 1s;
    }
  }
`;

const CommentWrapper = styled.div`
  p {
    text-align: center;
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 19px;
    color: ${COLOR.DARK_GRAY};
  }
`;
