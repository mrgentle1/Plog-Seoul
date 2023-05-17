import { useEffect, useState, useRef } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";

import styled from "styled-components";
import { COLOR } from "../../styles/color";
import { Button, BorderGreenThinButton } from "../../components/common/Button";

import { ReactComponent as Fire } from "../../assets/icons/pointFire.svg";
import Bar from "../../components/Record/Bar";
import axios from "axios";

const useLoading = () => {
  const [loading, setLoading] = useState(false);

  // 컴포넌트 마운트 시 loading true로 업데이트
  useEffect(() => setLoading(true), []);
  return loading;
};
function ShowPointPage() {
  const token = localStorage.getItem("key");
  const navigate = useNavigate();

  /*ing에서 현재 위치 값을 가져와 초기세팅 해줌 */
  const plogPoint = useLocation();
  const getRecordId = plogPoint.state.recordId;
  const getUserId = plogPoint.state.userId;

  const [userData, setUserData] = useState({
    recordId: getRecordId,
    userId: getUserId,
    isCourse: false,
  });

  const loading = useLoading();

  // 기존 포인트값 따로 레벨업에 따른 포인트 차 값 따로
  const [nowPoint, setNowPoint] = useState(0);
  const [showStartPoint, setShowStartPoint] = useState(0);
  const [isLevelUp, setIsLevelUp] = useState(false);
  const [isLast, setIsLast] = useState(false);

  /* GET - 포인트 및 레벨 정보 */
  const [pointData, setPointData] = useState([]);

  async function getPointData() {
    const real_url = `http://3.37.14.183:80/api/users/${userData.userId}/point`;
    // async, await을 사용하는 경우
    try {
      // GET 요청은 params에 실어 보냄
      const response = await axios.get(real_url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // 응답 결과(response)를 변수에 저장하거나.. 등 필요한 처리를 해 주면 된다.
      const initPoint = {
        initPoint: response.data.result.point,
        initLevel: response.data.result.level,
      };
      setPointData(initPoint);
      console.log(
        `포인트: ${pointData.initPoint}, 레벨: ${pointData.initLevel}`
      );
      plusPoint();
    } catch (e) {
      // 실패 시 처리
      console.error(e);
      alert("포인트 get 실패.");
    }
  }

  /* PUT - 포인트 및 레벨 정보 */
  async function putPointData() {
    const real_url = `http://3.37.14.183:80/api/users/${userData.userId}/point?newPoint=${myP.current}&title=서울둘레길-3코스&type=플로깅`;
    // async, await을 사용하는 경우
    try {
      // GET 요청은 params에 실어 보냄
      const response = await axios.put(real_url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // 응답 결과(response)를 변수에 저장하거나.. 등 필요한 처리를 해 주면 된다.
      console.log("put 포인트 user", userData.userId);
      console.log("put 포인트");
    } catch (e) {
      // 실패 시 처리
      console.error(e);
      alert("포인트 put 실패.");
    }
  }

  const plusPoint = () => {
    if (userData.isCourse) {
      const calPoint = pointData.initPoint + 250 * 1.5;
      setNowPoint(calPoint);
    } else {
      const calPoint = pointData.initPoint + 250;
      setNowPoint(calPoint);
    }
    if (nowPoint > 1000) {
      setTimeout(levelUP, 2000);
    } else {
      setIsLast(true);
    }
  };

  const levelUP = () => {
    setShowStartPoint(nowPoint - 1000);
    setIsLevelUp(true);
    setIsLast(true);
  };

  useEffect(() => {
    getPointData();
  }, []);

  // useEffect(() => {
  //   if (loading) {
  //     console.log("plus");
  //     if (myP.current > 1000) {
  //       level.current = level.current + 1;
  //       console.log("le", level.current);
  //       setIsLevelUp(true);
  //     } else {
  //       setIsLast(true);
  //     }
  //   } else {
  //     myP.current = user.point;
  //     console.log("user:", myP.current);
  //   }
  // }, []);

  // useEffect(() => {
  //   getPointData();
  //   if (!loading) {
  //     myP.current = pointData.point;
  //     currentP.current = pointData.point;
  //     level.current = pointData.level;
  //     console.log("1. user:", myP.current);
  //     console.log("1. loading:", loading);
  //     // plusPoint();
  //     setTimeout(plusPoint, 2000);
  //   }
  // }, []);

  // useEffect(() => {
  //   if (loading) {
  //     console.log("2.loading:", loading);
  //     console.log("plus");
  //     // myP.current = myP.current + 250;
  //     console.log("2.myp:", myP.current);
  //     console.log("2.currenPp:", currentP.current);

  //     if (currentP.current === 1000) {
  //       setTimeout(levelUP, 2000);
  //       // levelUP();
  //       // level.current = level.current + 1;
  //       // console.log("le", level.current);
  //       // setIsLevelUp(true);
  //     } else {
  //       setIsLast(true);
  //     }
  //   }
  // }, [isUpdate]);

  // useEffect(() => {
  //   if (isLevelUp) {
  //     console.log("4.levelUp True");
  //     setIsLast(true);
  //   }
  // }, [isLevelUp]);

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
  const gotoFinish = () => {
    putPointData();
    console.log("go");
    navigate("/record/finish", {
      state: {
        recordId: `${userData.recordId}`,
      },
    });
  };

  return (
    <StShowPointPage>
      <ShowPointHeader>
        <span>오늘의 포인트</span>
      </ShowPointHeader>
      <ShowPointContainer>
        <Fire />
        <CurrentLevelWrapper>Level {userData.initLevel}</CurrentLevelWrapper>

        <GetPointWrapper></GetPointWrapper>

        {/* {isUpdate ? (
          <Bar
            init={myP.current - 250}
            value={currentP.current}
            isUpdate={isUpdate}
            isLevelUp={isLevelUp}
          />
        ) : (
          <ProgressWrapper>
            <progress
              className="mypage_point_progress"
              value={currentP.current}
              min={0}
              max={1000}
            ></progress>
          </ProgressWrapper>
        )} */}
        <Bar
          init={isLevelUp ? 0 : userData.initPoint}
          value={isLevelUp ? showStartPoint : nowPoint}
        />

        {isLast && (
          <CommentWrapper>
            <p>다음 레벨까지 {1000 - nowPoint}포인트 남았어요!</p>
          </CommentWrapper>
        )}
      </ShowPointContainer>
      <RecordFinishFooter>
        <Link
          to={"/record/finish"}
          state={{
            recordId: `${userData.recordId}`,
          }}
        >
          <Button
            onClick={() => {
              gotoFinish();
            }}
          >
            플로깅 종료하기
          </Button>
        </Link>

        <BorderGreenThinButton>공유하기</BorderGreenThinButton>
      </RecordFinishFooter>
    </StShowPointPage>
  );
}

export default ShowPointPage;

const StShowPointPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

const RecordFinishFooter = styled.div`
  display: flex;
  position: fixed;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  bottom: 0;
  padding: 0px 6px 20px 20px;
  gap: 12px;

  width: 393px;
  z-index: 200px;
`;
