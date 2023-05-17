import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { headerTitleState } from "../../core/headerTitle";
import { Footer } from "../../components/layout/Footer";
import { ReactComponent as Flag } from "../../assets/icons/flag.svg";
import { ReactComponent as Arrow } from "../../assets/icons/arrow.svg";
import { ReactComponent as Footprint } from "../../assets/icons/footprint.svg";
import { ReactComponent as Tree } from "../../assets/icons/tree.svg";
import { ReactComponent as Level } from "../../assets/icons/level.svg";
import { ReactComponent as Record } from "../../assets/icons/record.svg";
import { ReactComponent as HomeButton } from "../../assets/icons/homeButton.svg";
import { todayMonth, year } from "../../core/date.js";

import axios from "axios";
import styled from "styled-components";
import { COLOR } from "../../styles/color";
import { Link } from "react-router-dom";
import { userIdNumber, usePersistRecoilState } from "../../core/userId";

function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const token = localStorage.getItem("key");
  const [user, setUser] = useState("");
  const [point, setPoint] = useState(0);
  const [plogging, setPlogging] = useState([]);

  const [userId, setUserId] = usePersistRecoilState(userIdNumber);
  const setHeaderTitle = useSetRecoilState(headerTitleState);

  // month가 한자리인지 두자리인지 판별
  let month = 0;
  if (todayMonth < 10) {
    month = `0${todayMonth}`;
  }

  useEffect(() => {
    axios
      .get("http://3.37.14.183/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        setUser(response.data.result);
        setPoint(response.data.result.point);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get(`http://3.37.14.183/api/plogging?date=${year}-${month}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        setPlogging(response.data.result.content);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const headertext = "안녕하세요, " + user.nickname + "님!";
  useEffect(() => {
    setUserId(user.userId);
    setHeaderTitle(headertext); // '홈' 값을 할당합니다.
  });

  const levelBarWidth = point >= 1000 ? 321 : (point / 1000) * 321;
  console.log("levet", levelBarWidth);
  const runningTime = 0;
  const distance = 0;
  plogging.map(
    (data) => ((runningTime += data.runningTime), (distance += data.distance))
  );

  return (
    <StHomePage>
      <Box1>
        <Link to="/home/season">
          <LeftBox1>
            <Flag className="flag" />
            <Text1>계절별 추천 코스</Text1>
            <Arrow className="arrow" />
          </LeftBox1>
        </Link>
        <Link to="/info">
          <RightBox1>
            <Footprint className="footprint" />
            <Text2>서울두드림길이란?</Text2>
            <Arrow className="arrow" />
          </RightBox1>
        </Link>
      </Box1>
      <Link to="/plog/level">
        <Box2>
          <Level className="level" />
          <LevelBox>
            <Text3>Level {user.level}</Text3>
            <Text4>다음 레벨까지 {1000 - point} 포인트</Text4>
          </LevelBox>
          <LevelBar />
          <LevelBar2 width={levelBarWidth} />
        </Box2>
      </Link>
      <Box3>
        <Tree className="tree" />
        <Text5>
          <Ploging>{todayMonth}월 플로깅</Ploging>
          <Time>걸은 시간</Time>
          <Dis>걸은 거리</Dis>
        </Text5>
        <Text6>
          <Ploging2>{plogging.length}번</Ploging2>
          <Time2>{runningTime}분</Time2>
          <Dis2>{distance}km</Dis2>
        </Text6>
      </Box3>
      <Link to="/record">
        <Box4>
          <Record className="record" />
          <div className="box4">
            <Text7>오늘도 주워볼까요?</Text7>
            <HomeButton className="homeButton" />
          </div>
        </Box4>
      </Link>
      <Footer />
    </StHomePage>
  );
}

export default HomePage;

const StHomePage = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const Box1 = styled.div`
  width: 100%;
  height: 121px;
  margin-bottom: 13px;
`;
const LeftBox1 = styled.div`
  float: left;
  width: 170px;
  height: 121px;
  border-radius: 14px;
  background-color: ${COLOR.MAIN_WHITE};
  padding: 12px 16px;

  .flag {
    width: 23px;
    height: 23px;
    margin-bottom: 12px;
    color: ${COLOR.DARK_GRAY};
  }
  .arrow {
    margin-top: 15px;
    width: 25px;
    height: 25px;
    color: ${COLOR.MAIN_GREEN};
    margin-bottom: 10px;
  }
`;
const Text1 = styled.div`
  font-family: "SUIT Variable";
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 19px;
  color: ${COLOR.MAIN_BLACK};
`;

const RightBox1 = styled.div`
  float: right;
  width: 170px;
  height: 121px;
  border-radius: 14px;
  background: ${COLOR.MAIN_WHITE};
  border-radius: 14px;
  padding: 12px 16px;

  .footprint {
    width: 23px;
    height: 23px;
    color: ${COLOR.DARK_GRAY};
    margin-bottom: 12px;
  }
  .arrow {
    margin-top: 15px;
    width: 25px;
    height: 25px;
    color: ${COLOR.MAIN_GREEN};
    margin-bottom: 10px;
  }
`;
const Text2 = styled.div`
  font-family: "SUIT Variable";
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 19px;
  color: ${COLOR.MAIN_BLACK};
`;
const Box2 = styled.div`
  margin-bottom: 13px;
  width: 353px;
  height: 101px;
  background: ${COLOR.MAIN_WHITE};
  border-radius: 14px;
  padding: 15px 16px;
  .level {
    width: 19px;
    height: 20px;
    margin-bottom: 12px;
    color: ${COLOR.DARK_GRAY};
  }
`;
const LevelBox = styled.div`
  display: flex;
  justify-content: space-between;
`;
const LevelBar = styled.div`
  margin-top: 12px;
  position: absolute;
  width: 321px;
  height: 10px;
  background: ${COLOR.INPUT_GRAY};
  border-radius: 5px;
`;
const LevelBar2 = styled.div`
  margin-top: 12px;
  position: absolute;
  width: ${(props) => props.width}px;
  height: 10px;
  background: ${COLOR.MAIN_GREEN};
  border-radius: 5px;
  z-index: 1;
`;
const Text3 = styled.div`
  font-family: "SUIT Variable";
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 19px;
  color: ${COLOR.MAIN_GREEN};
`;
const Text4 = styled.div`
  font-family: "SUIT Variable";
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 16px;
  color: ${COLOR.DARK_GRAY};
`;
const Box3 = styled.div`
  margin-bottom: 13px;
  width: 353px;
  height: 121px;
  border-radius: 14px;
  padding: 14px 19px;
  background-color: ${COLOR.MAIN_WHITE};

  .tree {
    width: 25px;
    height: 25px;
    color: ${COLOR.DARK_GRAY};
    margin-bottom: 10px;
  }
`;
const Text5 = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: "SUIT Variable";
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 19px;
`;
const Ploging = styled.div`
  width: 99px;
`;
const Time = styled.div`
  width: 99px;
`;
const Dis = styled.div`
  width: 99px;
`;
const Text6 = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  font-family: "SUIT Variable";
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 30px;
  color: ${COLOR.MAIN_GREEN};
`;
const Ploging2 = styled.div`
  width: 99px;
`;
const Time2 = styled.div`
  width: 99px;
`;
const Dis2 = styled.div`
  width: 99px;
`;
const Box4 = styled.div`
  display: flex;
  width: 353px;
  height: 101px;
  margin-bottom: 30px;
  background: ${COLOR.MAIN_GREEN};
  border: 2px solid ${COLOR.MAIN_GREEN_HOVER};
  border-radius: 14px;
  padding: 13.5px 19px;
  .record {
    width: 27px;
    height: 27px;
    color: ${COLOR.MAIN_BLACK};
    margin-bottom: 10px;
  }
  .box4 {
    margin-top: 24px;
    display: flex;
    flex-direction: row;
  }
  .homeButton {
    margin-left: 149px;
  }
`;
const Text7 = styled.div`
  margin-top: 14.5px;
  margin-left: -25px;
  font-family: "SUIT Variable";
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 19px;
  color: ${COLOR.MAIN_BLACK};
`;
