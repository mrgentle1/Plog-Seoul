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
function RecordPoint() {
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
  const [isLoading, setIsLoading] = useState(true);

  // 기존 포인트값 따로 레벨업에 따른 포인트 차 값 따로
  const [nowPoint, setNowPoint] = useState(0);
  const [showStartPoint, setShowStartPoint] = useState(0);
  //const [isUpdate, setIsUpdate] = useState(false);
  //const [isLevelUp, setIsLevelUp] = useState(false);
  //const [isLast, setIsLast] = useState(false);
  const isUpdate = useRef(false);
  const isLevelUp = useRef(false);
  const isLast = useRef(false);

  /* GET - 포인트 및 레벨 정보 */
  const [pointData, setPointData] = useState({ initPoint: 0, initLevel: 1 });

  async function getPointData() {
    const real_url = `${process.env.REACT_APP_API_ROOT}/api/users/${userData.userId}/point`;
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
      isUpdate.current = true;
      setPointData(initPoint);

      console.log(
        `포인트: ${pointData.initPoint}, 레벨: ${pointData.initLevel}`
      );
      //   plusPoint();
    } catch (e) {
      // 실패 시 처리
      console.error(e);
      alert("포인트 get 실패.");
    }
  }

  /* PUT - 포인트 및 레벨 정보 */
  async function putPointData() {
    const real_url = `${process.env.REACT_APP_API_ROOT}/api/users/${
      userData.userId
    }/point?newPoint=${250}&title=서울둘레길-3코스&type=플로깅`;
    // async, await을 사용하는 경우
    try {
      // GET 요청은 params에 실어 보냄
      const response = await axios.put(
        real_url,
        {
          userId: userData.userId,
          newPoint: nowPoint,
          title: "성북구",
          type: "플로깅",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

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
    console.log(pointData);
    if (userData.isCourse) {
      const calPoint = pointData.initPoint + 250 * 1.5;
      setNowPoint(calPoint);
    } else {
      const calPoint = pointData.initPoint + 250;
      setNowPoint(calPoint);
    }
    console.log("여기?????");
    console.log("cal 포인트:", nowPoint);
    setIsLoading(false);
    if (nowPoint >= 1000) {
      //   setTimeout(levelUP, 3000);
      levelUP();
    } else {
      //   setIsLast(true);
      isLast.current = true;
    }
  };

  const levelUP = () => {
    isLevelUp.current = true;
    setShowStartPoint(nowPoint - 1000);
    // setIsLevelUp(true);
    // setIsLast(true);
  };

  useEffect(() => {
    getPointData();
  }, []);

  useEffect(() => {
    if (isUpdate.current) {
      plusPoint();
    }
  }, [pointData]);

  useEffect(() => {
    if (isLevelUp.current) {
      console.log("levelUp");
      // setIsLevelUp(true);
      //   setIsLast(true);
      isLast.current = true;
    }
  }, [showStartPoint]);

  const gotoFinish = () => {
    putPointData();
    console.log("go");
    navigate("/record/test", {
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
      {!isLoading && (
        <ShowPointContainer>
          <ImgWrapper>
            <Fire />
          </ImgWrapper>

          <CurrentLevelWrapper>
            Level{" "}
            {isLevelUp.current ? pointData.initLevel + 1 : pointData.initLevel}
          </CurrentLevelWrapper>

          <Bar
            init={isLevelUp.current ? 0 : pointData.initPoint}
            value={isLevelUp.current ? showStartPoint : nowPoint}
          />

          {isLast.current && (
            <CommentWrapper>
              <p>
                다음 레벨까지{" "}
                {isLevelUp.current ? 1000 - showStartPoint : 1000 - nowPoint}
                포인트 남았어요!
              </p>
            </CommentWrapper>
          )}
        </ShowPointContainer>
      )}
      <RecordFinishFooter>
        <Link
          to={"/record/test"}
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

export default RecordPoint;

const StShowPointPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  max-width: 39.3rem;
  padding-top: 12.7rem;
  padding-bottom: 20rem;
  padding-left: 2rem;
  padding-right: 2rem;
`;

const ShowPointHeader = styled.div`
  position: fixed;
  top: 0;
  width: 39.3rem;
  height: 12.7rem;

  display: grid;
  grid-template-columns: 8.8rem auto 1.4rem;

  align-items: center;

  padding-left: 2rem;
  padding-right: 2.5rem;

  background-color: ${COLOR.MAIN_WHITE};

  z-index: 100;

  span {
    font-style: normal;
    font-weight: 700;
    font-size: 2rem;
    line-height: 2.5rem;
    color: ${COLOR.MAIN_BLACK};
    white-space: nowrap;
  }
`;

const ShowPointContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.4rem;
`;

const ImgWrapper = styled.div`
  display: flex;
  width: 5.4rem;
  height: 7.2rem;
`;

const CurrentLevelWrapper = styled.p`
  display: flex;
  font-style: normal;
  font-weight: 700;
  font-size: 1.7rem;
  line-height: 2.1rem;
  text-align: center;
  color: ${COLOR.MAIN_BLACK};
`;

const CommentWrapper = styled.div`
  p {
    text-align: center;
    font-style: normal;
    font-weight: 500;
    font-size: 1.5rem;
    line-height: 1.9rem;
    color: ${COLOR.DARK_GRAY};
    /* transition: all ease 6s 0s; */
    animation: setMotion 1.5s 1.5s ease-in-out;
  }
  @keyframes setMotion {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const RecordFinishFooter = styled.div`
  display: flex;
  position: fixed;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  bottom: 0;
  padding: 0rem 0.6rem 2rem 2rem;
  gap: 1.2rem;

  width: 39.3rem;
  z-index: 20rem;
`;
