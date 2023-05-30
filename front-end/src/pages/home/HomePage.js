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
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { userIdNumber, usePersistRecoilState } from "../../core/userId";
import { TimeConvert } from "../../components/Record/TimeComponent";

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
      .get(`${process.env.REACT_APP_API_ROOT}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setUser(response.data.result);
        setPoint(response.data.result.point);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_ROOT}/api/plogging?date=${year}-${month}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
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

  const levelBarWidth = point >= 1000 ? 32.1 : (point / 1000) * 32.1;
  let runningTime = 0;
  let distance = 0;
  plogging.map((data) => (runningTime += data.runningTime));
  plogging.map((data) => (distance += data.distance));
  distance = distance.toFixed(2);

  const real_runningTime = Math.floor(runningTime / 60);
  const real_runningTime2 = runningTime % 60;

  // Animation
  const greenBoxVariants = {
    hover: {
      backgroundColor: `${COLOR.MAIN_GREEN_HOVER}`,
      border: `${COLOR.MAIN_GREEN_HOVER}`,
      scale: 0.97,
    },
    rest: {
      backgroundColor: `${COLOR.MAIN_GREEN}`,
      scale: 1,
    },
  };

  const whiteBoxVariants = {
    hover: {
      backgroundColor: `${COLOR.MAIN_WHITE_HOVER}`,
      border: `${COLOR.MAIN_WHITE_HOVER}`,
      scale: 0.97,
    },
    rest: {
      backgroundColor: `${COLOR.MAIN_WHITE}`,
      scale: 1,
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <StHomePage>
        <Link to="/record">
          <Box4
            variants={greenBoxVariants}
            whileHover="hover"
            whileTap="hover"
            whileFocus="hover"
            initial="rest"
            animate="rest"
          >
            <Record className="record" />
            <div className="box4">
              <Text7>오늘도 주워볼까요?</Text7>
              <HomeButton className="homeButton" />
            </div>
          </Box4>
        </Link>
        <Box1>
          <div className="infotext">
            <span>코스 추천</span>이 필요한가요?
          </div>
          <Link to="/home/season">
            <LeftBox1
              variants={whiteBoxVariants}
              whileHover="hover"
              whileTap="hover"
              whileFocus="hover"
              initial="rest"
              animate="rest"
            >
              <Flag className="flag" />
              <Text1>계절별 추천 코스</Text1>
              <Arrow className="arrow" />
            </LeftBox1>
          </Link>
          <Link to="/info">
            <RightBox1
              variants={whiteBoxVariants}
              whileHover="hover"
              whileTap="hover"
              whileFocus="hover"
              initial="rest"
              animate="rest"
            >
              <Footprint className="footprint" />
              <Text2>서울두드림길이란?</Text2>
              <Arrow className="arrow" />
            </RightBox1>
          </Link>
        </Box1>
        <div className="infotext">
          <span>나의 플로그</span> 확인이 필요한가요?
        </div>
        <Link to="/plog">
          <Box3
            variants={whiteBoxVariants}
            whileHover="hover"
            whileTap="hover"
            whileFocus="hover"
            initial="rest"
            animate="rest"
          >
            <Tree className="tree" />
            <Text5>
              <Ploging>{todayMonth}월 플로깅</Ploging>
              <Time>걸은 시간</Time>
              <Dis>걸은 거리</Dis>
            </Text5>
            <Text6>
              <Ploging2>{plogging.length}번</Ploging2>
              <Time2>
                {real_runningTime}.{real_runningTime2}분
              </Time2>
              <Dis2>{distance}km</Dis2>
            </Text6>
          </Box3>
        </Link>

        <Box2
          variants={whiteBoxVariants}
          whileHover="hover"
          whileTap="hover"
          whileFocus="hover"
          initial="rest"
          animate="rest"
        >
          <Link to="/plog/level">
            <Box22>
              <Level className="level" />
              <LevelBox>
                <Text3>Level {user.level}</Text3>
                <Text4>다음 레벨까지 {1000 - point} 포인트</Text4>
              </LevelBox>
              <LevelBar />
              <LevelBar2 width={levelBarWidth} />
            </Box22>
          </Link>
        </Box2>

        <Footer />
      </StHomePage>
    </motion.div>
  );
}

export default HomePage;

const StHomePage = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100%;
  .infotext {
    width: 100%;
    text-align: left;
    margin-top: 20px;
    margin-bottom: 10px;
    font-family: "SUIT Variable";
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    color: ${COLOR.INPUT_BORDER_GRAY};
    span {
      color: ${COLOR.MAIN_BLACK};
    }
  }
`;
const Box1 = styled(motion.div)`
  width: 100%;
  height: 17.1rem;
  margin-bottom: 1.3rem;
  .infotext {
    margin-top: 20px;
    margin-bottom: 10px;
    font-family: "SUIT Variable";
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    color: ${COLOR.INPUT_BORDER_GRAY};
    span {
      color: ${COLOR.MAIN_BLACK};
    }
  }
`;
const LeftBox1 = styled(motion.div)`
  float: left;
  width: 17rem;
  height: 12.1rem;
  border-radius: 1.4rem;
  background-color: ${COLOR.MAIN_WHITE};
  padding: 1.2rem 1.6rem;
  box-shadow: 0px 0px 10px 6px rgba(0, 0, 0, 0.03);

  .flag {
    width: 2.3rem;
    height: 2.3rem;
    margin-bottom: 1.2rem;
  }
  .arrow {
    margin-top: 1.5rem;
    width: 2.5rem;
    height: 2.5rem;
    color: ${COLOR.MAIN_GREEN};
    margin-bottom: 1rem;
  }
`;
const Text1 = styled.p`
  font-family: "SUIT Variable";
  font-style: normal;
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 1.9rem;
  color: ${COLOR.MAIN_BLACK};
`;

const RightBox1 = styled(motion.div)`
  float: right;
  width: 17rem;
  height: 12.1rem;
  border-radius: 1.4rem;
  background: ${COLOR.MAIN_WHITE};
  border-radius: 1.4rem;
  padding: 1.2rem 1.6rem;
  box-shadow: 0px 0px 10px 6px rgba(0, 0, 0, 0.03);

  .footprint {
    width: 2.3rem;
    height: 2.3rem;
    margin-bottom: 1.2rem;
  }
  .arrow {
    margin-top: 1.5rem;
    width: 2.5rem;
    height: 2.5rem;
    color: ${COLOR.MAIN_GREEN};
    margin-bottom: 1rem;
  }
`;
const Text2 = styled.p`
  font-family: "SUIT Variable";
  font-style: normal;
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 1.9rem;
  color: ${COLOR.MAIN_BLACK};
`;
const Box2 = styled(motion.div)`
  margin-bottom: 13rem;
  width: 35.3rem;
  height: 10.1rem;
  background: ${COLOR.MAIN_WHITE};
  border-radius: 1.4rem;
  padding: 1.5rem 1.6rem;
  box-shadow: 0px 0px 10px 6px rgba(0, 0, 0, 0.03);
  .level {
    width: 1.9rem;
    height: 2rem;
    margin-bottom: 1.2rem;
  }
`;
const Box22 = styled(motion.div)``;
const LevelBox = styled.div`
  display: flex;
  justify-content: space-between;
`;
const LevelBar = styled.div`
  margin-top: 1.2rem;
  width: 32.1rem;
  height: 1rem;
  background: ${COLOR.INPUT_GRAY};
  border-radius: 0.5rem;
`;
const LevelBar2 = styled.div`
  margin-top: -1rem;
  width: ${(props) => props.width}rem;
  height: 1rem;
  background: ${COLOR.MAIN_GREEN};
  border-radius: 0.5rem;
  z-index: 1;
`;
const Text3 = styled.p`
  font-family: "SUIT Variable";
  font-style: normal;
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 1.9rem;
  color: ${COLOR.MAIN_GREEN};
`;
const Text4 = styled.p`
  font-family: "SUIT Variable";
  font-style: normal;
  font-weight: 500;
  font-size: 1.3rem;
  line-height: 1.6rem;
  color: ${COLOR.DARK_GRAY};
`;
const Box3 = styled(motion.div)`
  width: 35.3rem;
  height: 12.1rem;
  margin-bottom: 1.3rem;
  border-radius: 1.4rem;
  padding: 1.4rem 1.9rem;
  background-color: ${COLOR.MAIN_WHITE};
  box-shadow: 0px 0px 10px 6px rgba(0, 0, 0, 0.03);

  .tree {
    width: 2.5rem;
    height: 2.5rem;
    margin-bottom: 1rem;
  }
`;
const Text5 = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: "SUIT Variable";
  font-style: normal;
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 1.9rem;
`;
const Ploging = styled.p`
  width: 9.9rem;
  color: ${COLOR.MAIN_BLACK};
  font-family: "SUIT Variable";
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 19px;
`;
const Time = styled.p`
  width: 9.9rem;
  color: ${COLOR.MAIN_BLACK};
  font-family: "SUIT Variable";
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 19px;
`;
const Dis = styled.p`
  width: 9.9rem;
  color: ${COLOR.MAIN_BLACK};
  font-family: "SUIT Variable";
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 19px;
`;
const Text6 = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;
const Ploging2 = styled.p`
  width: 9.9rem;
  color: ${COLOR.MAIN_GREEN};
  font-family: "SUIT Variable";
  font-style: normal;
  font-weight: 600;
  font-size: 21px;
  line-height: 30px;
`;
const Time2 = styled.p`
  width: 9.9rem;
  color: ${COLOR.MAIN_GREEN};
  font-family: "SUIT Variable";
  font-style: normal;
  font-weight: 600;
  font-size: 21px;
  line-height: 30px;
`;
const Dis2 = styled.p`
  width: 9.9rem;
  color: ${COLOR.MAIN_GREEN};
  font-family: "SUIT Variable";
  font-style: normal;
  font-weight: 600;
  font-size: 21px;
  line-height: 30px;
`;
const Box4 = styled(motion.div)`
  display: flex;
  width: 35.3rem;
  height: 10.1rem;
  margin-bottom: 1.3rem;
  background: ${COLOR.MAIN_GREEN};
  border: 0.2rem solid ${COLOR.MAIN_GREEN};
  border-radius: 1.4rem;
  padding: 1.35rem 1.9rem;
  box-shadow: 0px 0px 7px 5px rgba(0, 0, 0, 0.1);
  .record {
    width: 2.7rem;
    height: 2.7rem;
    color: ${COLOR.MAIN_BLACK};
    margin-bottom: 1rem;
  }
  .box4 {
    margin-top: 2.4rem;
    display: flex;
    flex-direction: row;
    width: 35.3rem;
    justify-content: space-between;
  }
`;
const Text7 = styled.p`
  margin-top: 1.45rem;
  margin-left: -2.5rem;
  font-family: "SUIT Variable";
  font-style: normal;
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 1.9rem;
  color: ${COLOR.MAIN_BLACK};
`;
