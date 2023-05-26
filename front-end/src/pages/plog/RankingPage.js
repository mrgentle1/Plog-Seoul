import React, { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as BackArrow } from "../../assets/icons/backArrow.svg";
import { ReactComponent as OneSelfIcon } from "../../assets/icons/pointFire.svg";
import { userIdNumber, usePersistRecoilState } from "../../core/userId";

import styled from "styled-components";
import { COLOR } from "../../styles/color";
import axios from "axios";
import { RankingBarGraph } from "../../components/common/RankingBar";

function RankingPage() {
  const token = localStorage.getItem("key");
  const [userId, setUserId] = usePersistRecoilState(userIdNumber);

  const navigate = useNavigate();
  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const [isLoading, setIsLoading] = useState(true);
  const isUpdate = useRef(false);
  const isMoreThan = useRef(false);

  const [dist, setDist] = useState(true);
  const [time, setTime] = useState(false);

  const handleDistClick = () => {
    setDist(true);
    setTime(false);
  };

  const handleTimeClick = () => {
    setDist(false);
    setTime(true);
  };

  /* GET - 랭킹 */
  const [rankingDistData, setRankingDistData] = useState([
    { rank: 0, userId: 0, nickname: "", level: 0, totalDist: 0 },
  ]);
  const [rankingTimeData, setRankingTimeData] = useState([
    { rank: 0, userId: 0, nickname: "", level: 0, totalTime: 0 },
  ]);

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

      isUpdate.current = true;
      if (initDistData.length > 3) {
        isMoreThan.current = true;
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

      isUpdate.current = true;
      if (initTimeData.length > 3) {
        isMoreThan.current = true;
      }
      setRankingTimeData(initTimeData);
    } catch (e) {
      console.error(e);
    }
  }

  const TopUserContainer = ({ num, name, dist, time }) => {
    const barData = [
      { rank: 1, bgColor: COLOR.MAIN_GREEN, max: 180 },
      { rank: 2, bgColor: COLOR.LIGHT_GRAY, max: 140 },
      { rank: 3, bgColor: COLOR.LIGHT_GRAY, max: 100 },
    ];

    return (
      <TopUserData>
        <RankingBarGraph
          num={num}
          bgColor={barData[num - 1].bgColor}
          max={barData[num - 1].max}
        />
        <p className="UserName">{name}</p>
        {dist && <p className="UserDist">{dist.toFixed(2)}Km</p>}
        {time && (
          <p className="UserDist">
            {Math.floor(time / 60)}분 {time % 60}초
          </p>
        )}
      </TopUserData>
    );
  };

  const UserRankingContainer = ({ num, name, dist, time, isList, id }) => {
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
        {dist && <p className="UserDist">{dist.toFixed(2)}Km</p>}
        {time && (
          <p className="UserDist">
            {Math.floor(time / 60)}분 {time % 60}초
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
      setIsLoading(false);
    }
  }, [rankingDistData, rankingTimeData]);

  return (
    <StRankingPage>
      <RankingHeader>
        <BackArrow className="noticeBackArrow" onClick={goBack} />
        <HeaderText>랭킹</HeaderText>
      </RankingHeader>
      {!isLoading && dist && (
        <RankingContainer>
          <TopRankingContainer>
            <TopUserContainer
              num={2}
              name={rankingDistData[1].nickname}
              dist={rankingDistData[1].totalDist}
            />
            <TopUserContainer
              num={1}
              name={rankingDistData[0].nickname}
              dist={rankingDistData[0].totalDist}
            />
            <TopUserContainer
              num={3}
              name={rankingDistData[2].nickname}
              dist={rankingDistData[2].totalDist}
            />
          </TopRankingContainer>
          <ButtonContainer>
            <DistButton onClick={handleDistClick} dist={dist}>
              <p>거리순</p>
            </DistButton>
            <TimeButton onClick={handleTimeClick} time={time}>
              <p>시간순</p>
            </TimeButton>
          </ButtonContainer>
          <MyRankingContainer>
            {rankingDistData
              .filter((data) => data.userId === userId)
              .map((data) => (
                <UserRankingContainer
                  key={data.userId}
                  num={data.rank}
                  name={data.nickname}
                  dist={data.totalDist}
                  isList={false}
                />
              ))}

            <CommentWrapper>다음 등수까지 1.4Km 남았어요!</CommentWrapper>
          </MyRankingContainer>
          <RankingList>
            {rankingDistData
              .filter((data) => data.rank > 3 && data.rank < 11)
              .map((data) => (
                <OtherRankingContainer>
                  <UserRankingContainer
                    num={data.rank}
                    name={data.nickname}
                    dist={data.totalDist}
                    isList={true}
                    id={data.id}
                  />
                </OtherRankingContainer>
              ))}
          </RankingList>
        </RankingContainer>
      )}

      {!isLoading && time && (
        <RankingContainer>
          <TopRankingContainer>
            <TopUserContainer
              num={2}
              name={rankingTimeData[1].nickname}
              time={rankingTimeData[1].totalTime}
            />
            <TopUserContainer
              num={1}
              name={rankingTimeData[0].nickname}
              time={rankingTimeData[0].totalTime}
            />
            <TopUserContainer
              num={3}
              name={rankingTimeData[2].nickname}
              time={rankingTimeData[2].totalTime}
            />
          </TopRankingContainer>
          <ButtonContainer>
            <DistButton onClick={handleDistClick} dist={dist}>
              <p>거리순</p>
            </DistButton>
            <TimeButton onClick={handleTimeClick} time={time}>
              <p>시간순</p>
            </TimeButton>
          </ButtonContainer>
          <MyRankingContainer>
            {rankingTimeData
              .filter((data) => data.userId === userId)
              .map((data) => (
                <UserRankingContainer
                  key={data.userId}
                  num={data.rank}
                  name={data.nickname}
                  time={data.totalTime}
                  isList={false}
                />
              ))}

            <CommentWrapper>다음 등수까지 00초 남았어요!</CommentWrapper>
          </MyRankingContainer>
          <RankingList>
            {rankingTimeData
              .filter((data) => data.rank > 3 && data.rank < 11)
              .map((data) => (
                <OtherRankingContainer>
                  <UserRankingContainer
                    num={data.rank}
                    name={data.nickname}
                    time={data.totalTime}
                    isList={true}
                    id={data.id}
                  />
                </OtherRankingContainer>
              ))}
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
  padding: 8.8rem 2rem 0rem;
`;
const RankingHeader = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 11.8rem;
  background: ${COLOR.MAIN_WHITE};
  z-index: 100;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

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
  padding-top: 4.4rem;
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
  height: 2.6rem;
`;

const CommentWrapper = styled.div`
  ${sharedTextStyle}
  width: 100%;
  justify-content: flex-end;
`;
const RankingList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1.2rem 1.2rem;
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
  text-align: center;
  margin-bottom: 3rem;
`;
const DistButton = styled.button`
  margin-left: 1rem;
  margin-right: 1rem;
  width: 6rem;
  height: 3rem;
  background-color: ${({ dist }) =>
    dist ? COLOR.MAIN_GREEN : COLOR.LIGHT_GRAY};
  border: 0.2rem solid
    ${({ dist }) => (dist ? COLOR.MAIN_GREEN : COLOR.MEDIUM_GRAY)};
  border-radius: 1rem 1rem 1rem 1rem;
  p {
    color: ${COLOR.MAIN_BLACK};
    font-size: 1.6rem;
    font-weight: 500;
    letter-spacing: 0.09rem;
  }
`;
const TimeButton = styled.button`
  margin-left: 1rem;
  margin-right: 1rem;
  width: 6rem;
  height: 3rem;
  background-color: ${({ time }) =>
    time ? COLOR.MAIN_GREEN : COLOR.LIGHT_GRAY};
  border: 0.2rem solid
    ${({ time }) => (time ? COLOR.MAIN_GREEN : COLOR.MEDIUM_GRAY)};
  border-radius: 1rem 1rem 1rem 1rem;
  p {
    color: ${COLOR.MAIN_BLACK};
    font-size: 1.6rem;
    font-weight: 500;
    letter-spacing: 0.09rem;
  }
`;
