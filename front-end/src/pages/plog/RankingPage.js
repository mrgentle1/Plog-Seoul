import React, { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as BackArrow } from "../../assets/icons/backArrow.svg";
import { ReactComponent as OneSelfIcon } from "../../assets/icons/pointFire.svg";
import { userIdNumber, usePersistRecoilState } from "../../core/userId";

import styled from "styled-components";
import { COLOR } from "../../styles/color";
import axios from "axios";
import { RankingBarGraph } from "../../components/common/RankingBar";
import { TimeConvert } from "../../components/Record/TimeComponent";

function RankingPage() {
  const token = localStorage.getItem("key");
  const [userId, setUserId] = usePersistRecoilState(userIdNumber);

  const navigate = useNavigate();
  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const [isLoading, setIsLoading] = useState(true);
  const [hasMyData, setHasMyData] = useState(false);
  const isUpdate = useRef(false);
  const isMoreThan = useRef(false);

  const isFirst = useRef(false);
  const isSecond = useRef(false);
  const isThird = useRef(false);
  const noneList = useRef(false);

  const [selectDist, setSelectDist] = useState(true);
  const [time, setTime] = useState(false);

  const handleDistClick = () => {
    setSelectDist(true);
  };

  const handleTimeClick = () => {
    setSelectDist(false);
    setTime(true);
  };

  /* GET - 랭킹 */
  const [rankingDistData, setRankingDistData] = useState([
    { rank: 0, userId: 0, nickname: "", level: 0, totalDist: 0 },
  ]);
  const [rankingTimeData, setRankingTimeData] = useState([
    { rank: 0, userId: 0, nickname: "", level: 0, totalTime: 0 },
  ]);

  const [rankingMyDistData, setRankingMyDistData] = useState({
    rank: 0,
    userId: 0,
    nickname: "",
    level: 0,
    totalDist: 0,
  });
  const [rankingMyTimeData, setRankingMyTimeData] = useState({
    rank: 0,
    userId: 0,
    nickname: "",
    level: 0,
    totalTime: 0,
  });

  async function getRankingData() {
    // async, await을 사용하는 경우
    try {
      // GET 요청은 params에 실어 보냄
      const response = await axios.get(
        `${process.env.REACT_APP_API_ROOT}/api/plogging/ranking?sortBy=TOTAL_DISTANCE`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      // 응답 결과(response)를 변수에 저장하거나.. 등 필요한 처리를 해 주면 된다.
      const initRanking = response.data.result.rankings;
      const initDistData = initRanking.map((it) => {
        return {
          rank: it.rank,
          userId: it.userId,
          nickname: it.nickname,
          level: it.level,
          totalDist: it.totalDistance,
        };
      });
      const initMyData = initRanking
        .filter((data) => data.userId === userId)
        .map((data) => {
          return {
            rank: data.rank,
            userId: data.userId,
            nickname: data.nickname,
            level: data.level,
            totalDist: data.totalDistance,
          };
        });

      isUpdate.current = true;
      if (initDistData.length > 3) {
        isMoreThan.current = true;
        isFirst.current = true;
        isSecond.current = true;
        isThird.current = true;
      } else if (initDistData.length === 3) {
        isFirst.current = true;
        isSecond.current = true;
        isThird.current = true;
      } else if (initDistData.length === 2) {
        isFirst.current = true;
        isSecond.current = true;
      } else if (initDistData.length === 1) {
        isFirst.current = true;
      }
      if (initMyData.length !== 0) {
        setRankingMyDistData(initMyData);
        setHasMyData(true);
      }
      setRankingDistData(initDistData);
    } catch (e) {
      console.error(e);
    }

    try {
      // GET 요청은 params에 실어 보냄
      const response = await axios.get(
        `${process.env.REACT_APP_API_ROOT}/api/plogging/ranking?sortBy=TOTAL_RUNNING_TIME`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      // 응답 결과(response)를 변수에 저장하거나.. 등 필요한 처리를 해 주면 된다.
      const initRanking = response.data.result.rankings;
      const initTimeData = initRanking.map((it) => {
        return {
          rank: it.rank,
          userId: it.userId,
          nickname: it.nickname,
          level: it.level,
          totalTime: it.totalRunningTime,
        };
      });
      const initMyData = initRanking
        .filter((data) => data.userId === userId)
        .map((data) => {
          return {
            rank: data.rank,
            userId: data.userId,
            nickname: data.nickname,
            level: data.level,
            totalTime: data.totalRunningTime,
          };
        });

      isUpdate.current = true;
      if (initTimeData.length > 3) {
        isMoreThan.current = true;
        isFirst.current = true;
        isSecond.current = true;
        isThird.current = true;
      } else if (initTimeData.length === 3) {
        isFirst.current = true;
        isSecond.current = true;
        isThird.current = true;
      } else if (initTimeData.length === 2) {
        isFirst.current = true;
        isSecond.current = true;
      } else if (initTimeData.length === 1) {
        isFirst.current = true;
      }
      if (initMyData.length !== 0) {
        setRankingMyTimeData(initMyData);
        setHasMyData(true);
      }
      setRankingTimeData(initTimeData);
    } catch (e) {
      console.error(e);
    }
  }

  const TopUserContainer = ({ num }) => {
    const barData = [
      { rank: 1, bgColor: COLOR.MAIN_GREEN, max: 180 },
      { rank: 2, bgColor: COLOR.LIGHT_GRAY, max: 140 },
      { rank: 3, bgColor: COLOR.LIGHT_GRAY, max: 100 },
    ];

    const userData = (selectDist ? rankingDistData : rankingTimeData)
      .filter((it) => it.rank === num)
      .map((data) => {
        return data;
      });

    return (
      <>
        <TopUserData>
          <RankingBarGraph
            num={num}
            bgColor={barData[num - 1].bgColor}
            max={barData[num - 1].max}
            user={userData.length > 0 && userData[0].userId}
            myId={userId}
            hasData={userData.length > 0 ? true : false}
          />

          {userData.length > 0 ? (
            <>
              <p className="UserName">{userData[0].nickname}</p>
              {selectDist ? (
                <p className="UserDist">{userData[0].totalDist.toFixed(2)}Km</p>
              ) : (
                <>
                  <TimeConvert
                    className="UserDist"
                    time={userData[0].totalTime}
                  />
                </>
              )}
            </>
          ) : (
            <>
              <p className="UserName">-</p>
              <p className="UserDist">-</p>
            </>
          )}
        </TopUserData>
      </>
    );
  };

  const MyUserRankingContainer = () => {
    const userData = (selectDist ? rankingDistData : rankingTimeData)
      .filter((it) => it.userId === userId)
      .map((data) => {
        return data;
      });

    const rankingData = (selectDist ? rankingDistData : rankingTimeData).map(
      (data) => {
        return data;
      }
    );

    const preRankDiff = rankingData
      .filter((it) => it.rank === userData[0].rank - 1)
      .map((it) => {
        return selectDist
          ? (it.totalDist - userData[0].totalDist).toFixed(2)
          : it.totalTime - userData[0].totalTime;
      });

    const Text = () => {
      return (
        <>
          {userData[0].rank === 1 ? (
            <p className="comment">축하합니다. 1등이에요!</p>
          ) : (
            <>
              {selectDist ? (
                <>
                  {preRankDiff < 0.01 ? (
                    <>
                      <p className="comment">
                        다음 등수와 아주 근소한 차이에요!
                      </p>
                    </>
                  ) : (
                    <p className="comment">
                      다음 등수까지 {preRankDiff}km 남았어요!
                    </p>
                  )}
                </>
              ) : (
                <p className="comment">
                  다음 등수까지 대략 {Math.floor(preRankDiff / 60)}분 남았어요!
                </p>
              )}
              {}
            </>
          )}
        </>
      );
    };

    return (
      <>
        {userData.length > 0 ? (
          <MyContainer>
            <UserRankingContainer
              num={userData[0].rank}
              name={userData[0].nickname}
              data={selectDist ? userData[0].totalDist : userData[0].totalTime}
              id={userData[0].userId}
              isList={false}
            />
            <CommentWrapper>
              <Text />
            </CommentWrapper>
            {/* <Text className="comment" /> */}
            {/* <CommentWrapper>
              <Comment className="comment" />
            </CommentWrapper> */}
          </MyContainer>
        ) : (
          <NoneRankContainer>
            <p className="noneRank">
              현재 랭킹이 없어요. 플로그를 하고 랭킹을 올려보세요!
            </p>
          </NoneRankContainer>
        )}
      </>
    );
  };

  const UserRankingListContainer = () => {
    const userData = (selectDist ? rankingDistData : rankingTimeData).map(
      (data) => {
        return data;
      }
    );

    const data = selectDist ? rankingDistData : rankingTimeData;
    console.log("testData %o", data);

    console.log("data: %o", userData);

    return (
      <>
        {data.map((it) => (
          <UserRankingContainer
            key={`${it.rank}-${it.userId}`}
            num={it.rank}
            name={it.nickname}
            data={selectDist ? it.totalDist : it.totalTime}
            id={it.userId}
            isList={true}
          />
        ))}
      </>
    );
  };

  const UserRankingContainer = ({ num, name, data, isList, id }) => {
    const rank = String(num).padStart(2, "0");
    // const distData = dist / 1000;
    return (
      <RankingData>
        <p className="UserRanking">{rank}</p>
        <div className="rowItem">
          <p className="UserName">{name}</p>
          {isList && id === userId && (
            <OneselfIconWrapper>
              <OneSelfIcon />
            </OneselfIconWrapper>
          )}
        </div>
        {selectDist ? (
          <p className="UserDist">{data.toFixed(2)}Km</p>
        ) : (
          <p className="UserDist">
            <TimeConvert className="UserDist" time={data} />
          </p>
        )}
      </RankingData>
    );
  };

  useEffect(() => {
    getRankingData();
  }, []);

  useEffect(() => {
    if (isUpdate.current) {
      console.log(hasMyData);
      setIsLoading(false);
    }
  }, [rankingDistData, rankingTimeData, hasMyData]);

  return (
    <StRankingPage>
      <RankingHeader>
        <BackArrow className="noticeBackArrow" onClick={goBack} />
        <HeaderText>랭킹</HeaderText>
      </RankingHeader>
      <ButtonContainer>
        <DistButton onClick={handleDistClick} selectDist={selectDist}>
          <p>거리순</p>
        </DistButton>
        <>|</>
        <TimeButton onClick={handleTimeClick} selectDist={selectDist}>
          <p>시간순</p>
        </TimeButton>
      </ButtonContainer>
      {!isLoading && (
        <RankingContainer>
          <TopRankingContainer>
            <TopUserContainer num={2} />
            <TopUserContainer num={1} />
            <TopUserContainer num={3} />
          </TopRankingContainer>
          <MyRankingContainer>
            <MyUserRankingContainer />
          </MyRankingContainer>
          <RankingList>
            <UserRankingListContainer />
          </RankingList>
        </RankingContainer>
      )}
    </StRankingPage>
  );
}
export default RankingPage;

const StRankingPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 7rem 2rem 0rem;
`;
const RankingHeader = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 6rem;
  background: ${COLOR.MAIN_WHITE};
  z-index: 100;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;

  padding: 0rem 2rem;
  gap: 2.4rem;

  .noticeBackArrow {
    /* margin-top: 40px;
    margin-left: 20px; */
  }
`;
const HeaderText = styled.div`
  font-family: "SUIT Variable";
  font-style: normal;
  font-weight: 700;
  font-size: 2rem;
  line-height: 2.5rem;
  color: ${COLOR.MAIN_BLACK};
`;
const RankingContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const sharedUserNameStyle = `
  display: flex;
  font-family: "SUIT Variable";
  font-style: normal;
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 1.9rem;
  color: ${COLOR.MAIN_BLACK};
`;

const sharedTextStyle = `
  display: flex;
  font-family: "SUIT Variable";
  font-style: normal;
  font-weight: 500;
  font-size: 1.3rem;
  line-height: 1.6rem;
  text-align: right;

  color: ${COLOR.DARK_GRAY};
`;

const TopRankingContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: flex-end;

  width: 100%;
  padding-bottom: 3rem;
`;

const TopUserData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .UserName {
    ${sharedUserNameStyle}
    margin-top:1.2rem;
    margin-bottom: 0.4rem;
  }

  .UserDist {
    ${sharedTextStyle}
  }
`;

const MyRankingContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 7.9rem;
  padding: 1.6rem 1.2rem;
  gap: 1.2rem;

  border: 0.1rem solid ${COLOR.MAIN_GREEN};
  border-radius: 1.4rem;
`;

const MyContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 1.2rem;
`;

const RankingData = styled.div`
  display: grid;
  grid-template-columns: 4.2rem 1fr 1fr;
  width: 100%;
  align-items: center;
  .rowItem {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1.2rem;
  }

  .UserRanking {
    display: flex;
    font-family: "SUIT Variable";
    font-style: normal;
    font-weight: 500;
    font-size: 1.5rem;
    line-height: 1.9rem;

    color: ${COLOR.INPUT_BORDER_GRAY};
  }

  .UserName {
    ${sharedUserNameStyle}
  }

  .UserDist {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;

    font-family: "SUIT Variable";
    font-style: normal;
    font-weight: 500;
    font-size: 1.3rem;
    line-height: 1.6rem;
    text-align: center;

    color: ${COLOR.MAIN_GREEN};
  }
`;

const OneselfIconWrapper = styled.div`
  display: flex;
  width: 2rem;
  height: 2.1rem;
`;

const CommentWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: flex-end;

  .comment {
    ${sharedTextStyle}
  }
`;

const NoneRankContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .noneRank {
    ${sharedTextStyle}
  }
`;

const RankingList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1.2rem 1.2rem;
  gap: 1.5rem;
`;
const OtherRankingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 4.3rem;
`;

const NoneRankingContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  height: 4.3rem;
  span {
    width: 100%;
    ${sharedTextStyle}
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
  text-align: center;
  margin-bottom: 4rem;
  padding-top: 1rem;
`;
const DistButton = styled.div`
  margin-left: 1rem;
  margin-right: 1rem;

  p {
    color: ${({ selectDist }) =>
      selectDist ? COLOR.MAIN_ORANGE : COLOR.DARK_GRAY};
    font-size: 1.4rem;
    font-weight: 600;
    letter-spacing: 0.09rem;
  }
`;
const TimeButton = styled.div`
  margin-left: 1rem;
  margin-right: 1rem;

  p {
    color: ${({ selectDist }) =>
      !selectDist ? COLOR.MAIN_ORANGE : COLOR.DARK_GRAY};
    font-size: 1.4rem;
    font-weight: 600;
    letter-spacing: 0.09rem;
  }
`;
