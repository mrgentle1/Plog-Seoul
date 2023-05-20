import React, { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as BackArrow } from "../../assets/icons/backArrow.svg";
import { ReactComponent as OneSelfIcon } from "../../assets/icons/pointFire.svg";

import styled from "styled-components";
import { COLOR } from "../../styles/color";
import axios from "axios";
import { RankingBarGraph } from "../../components/common/RankingBar";

function RankingPage() {
  const token = localStorage.getItem("key");

  const navigate = useNavigate();
  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const [isLoading, setIsLoading] = useState(true);
  const isUpdate = useRef(false);

  /* GET - 랭킹 */
  const [rankingAllData, setRankingAllData] = useState([
    { rank: 0, userId: 0, nickname: "", level: 0, totalDist: 0 },
  ]);

  async function getRankingData() {
    // async, await을 사용하는 경우
    try {
      // GET 요청은 params에 실어 보냄
      const response = await axios.get(
        "https://seoul-plog.shop/api/plogging/ranking",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // 응답 결과(response)를 변수에 저장하거나.. 등 필요한 처리를 해 주면 된다.
      const initData = response.data.result.map((it) => {
        return {
          rank: it.rank,
          userId: it.userId,
          nickname: it.nickname,
          level: it.level,
          totalDist: it.totalDistance / 1000,
        };
      });
      isUpdate.current = true;
      setRankingAllData(initData);
    } catch (e) {
      // 실패 시 처리
      console.error(e);
    }
  }

  const TopUserContainer = ({ num, name, dist }) => {
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
        <p className="UserDist">{dist.toFixed(2)}Km</p>
      </TopUserData>
    );
  };

  const UserRankingContainer = ({ num, name, dist, isList }) => {
    const rank = String(num).padStart(2, "0");
    // const distData = dist / 1000;
    return (
      <RankingData>
        <p className="UserRanking">{rank}</p>
        <div className="rowItem">
          <p className="UserName">{name}</p>
          {isList && (
            <OneselfIconWrapper>
              <OneSelfIcon />
            </OneselfIconWrapper>
          )}
        </div>

        <p className="UserDist">{dist.toFixed(2)}Km</p>
      </RankingData>
    );
  };

  useEffect(() => {
    getRankingData();
    console.log("기록가져오는 중");
  }, []);

  useEffect(() => {
    if (isUpdate.current) {
      console.log("기록가져옴");
      console.log("기록: %o", rankingAllData);
      console.log("who:", rankingAllData[0].nickname);
      setIsLoading(false);
    }
  }, [rankingAllData]);

  return (
    <StRankingPage>
      <RankingHeader>
        <BackArrow className="noticeBackArrow" onClick={goBack} />
        <HeaderText>랭킹</HeaderText>
      </RankingHeader>
      {!isLoading && (
        <RankingContainer>
          <TopRankingContainer>
            <TopUserContainer
              num={2}
              name={rankingAllData[1].nickname}
              dist={rankingAllData[1].totalDist}
            />
            <TopUserContainer
              num={1}
              name={rankingAllData[0].nickname}
              dist={rankingAllData[0].totalDist}
            />
            <TopUserContainer
              num={3}
              name={rankingAllData[2].nickname}
              dist={rankingAllData[2].totalDist}
            />
          </TopRankingContainer>
          <MyRankingContainer>
            <UserRankingContainer
              num={5}
              name={"박이름ㅇㅇㅇ"}
              dist={1.33}
              isList={false}
            />
            <CommentWrapper>다음 등수까지 1.4Km 남았어요!</CommentWrapper>
          </MyRankingContainer>
          <RankingList>
            {rankingAllData
              .filter((data) => data.rank > 1 && data.rank < 11)
              .map((data) => (
                <OtherRankingContainer key={data.userId}>
                  <UserRankingContainer
                    num={data.rank}
                    name={data.nickname}
                    dist={data.totalDist}
                    isList={true}
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
  padding: 88px 20px 0px;
`;
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

  padding: 0px 20px;
  gap: 24px;

  .noticeBackArrow {
    /* margin-top: 40px;
    margin-left: 20px; */
  }
`;
const HeaderText = styled.div`
  font-family: "SUIT Variable";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 25px;
  color: ${COLOR.MAIN_BLACK};
`;
const RankingContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding-top: 44px;
`;

const sharedUserNameStyle = `
  display: flex;
  font-family: "SUIT Variable";
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 19px;
  color: ${COLOR.MAIN_BLACK};
`;

const sharedTextStyle = `
  display: flex;
  font-family: "SUIT Variable";
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 16px;
  text-align: right;

  color: ${COLOR.DARK_GRAY};
`;

const TopRankingContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: flex-end;

  width: 100%;
  padding-bottom: 40px;
`;

const TopUserData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .UserName {
    ${sharedUserNameStyle}
    margin-top:12px;
    margin-bottom: 4px;
  }

  .UserDist {
    ${sharedTextStyle}
  }
`;

const MyRankingContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 353px;
  height: 79px;
  padding: 16px 12px;
  gap: 12px;

  border: 1px solid ${COLOR.MAIN_GREEN};
  border-radius: 14px;
`;

const RankingData = styled.div`
  display: grid;
  grid-template-columns: 42px 1fr 1fr;
  width: 100%;
  align-items: center;
  .rowItem {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 12px;
  }

  .UserRanking {
    display: flex;
    font-family: "SUIT Variable";
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 19px;

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
    font-size: 13px;
    line-height: 16px;
    text-align: center;

    color: ${COLOR.MAIN_GREEN};
  }
`;

const OneselfIconWrapper = styled.div`
  display: flex;
  width: 20px;
  height: 26px;
`;

const CommentWrapper = styled.div`
  ${sharedTextStyle}
  width: 100%;
  justify-content: flex-end;
`;
const RankingList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 12px;
`;
const OtherRankingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 43px;
`;
