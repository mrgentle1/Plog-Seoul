import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { headerTitleState } from "../../core/headerTitle";
import { ReactComponent as Level } from "../../assets/icons/level.svg";
import { userIdNumber, usePersistRecoilState } from "../../core/userId";
import { Calendar } from "../../components/common/Calendar";

import axios from "axios";
import styled from "styled-components";
import { COLOR } from "../../styles/color";
import { motion } from "framer-motion";
import { BorderThinButton } from "../../components/common/Button";
import { Link } from "react-router-dom";

function PlogPage() {
  const token = localStorage.getItem("key");
  const [user, setUser] = useState("");
  const [username, setUserName] = useState("");
  const [point, setPoint] = useState(0);

  const [userId, setUserId] = usePersistRecoilState(userIdNumber);
  const setHeaderTitle = useSetRecoilState(headerTitleState);

  const url = `${process.env.REACT_APP_API_ROOT}/api/users/${userId}`;

  useEffect(() => {
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setUser(response.data.result);
        setUserName(response.data.result.nickname);
        setPoint(response.data.result.point);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const headertext = username + "님의 플로그";
  useEffect(() => {
    setHeaderTitle(headertext);
  });

  const levelBarWidth = point >= 1000 ? 321 : (point / 1000) * 321;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <StPlogPage>
        <StPlogContent>
          <PlogCalender>
            <Calendar />
          </PlogCalender>
          <PlogLevel>
            <Plog1>
              <Level className="level" />
            </Plog1>
            <Link to="/plog/level">
              <Plog2>
                <PlogText>
                  <Text1>Level {user.level}</Text1>
                  <Text2>다음 레벨까지 {1000 - point} 포인트</Text2>
                </PlogText>
              </Plog2>
              <Plog3>
                <LevelBar></LevelBar>
                <LevelBar2 width={levelBarWidth}></LevelBar2>
              </Plog3>
            </Link>
          </PlogLevel>
          <Link to="/plog/achievement">
            <BorderThinButton>
              달성한 업적
              <p>0개</p>
            </BorderThinButton>
          </Link>
          <Link to="/plog/ranking">
            <BorderThinButton>
              랭킹 확인하기<p>거리순/기록순</p>
            </BorderThinButton>
          </Link>
        </StPlogContent>
      </StPlogPage>
    </motion.div>
  );
}

export default PlogPage;

const StPlogPage = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const StPlogContent = styled.div`
  padding-bottom: 110px;
  p {
    margin-left: 12px;
  }
`;
const PlogCalender = styled.div``;
const PlogLevel = styled.div`
  margin-bottom: 12px;
  padding-top: 14px;
  width: 353px;
  height: 103px;
  background-color: ${COLOR.MAIN_WHITE};
  border: 1px solid ${COLOR.MAIN_GREEN};
  border-radius: 14px;
`;
const Plog1 = styled.div`
  margin-left: 16px;

  .level {
    width: 20px;
    height: 20px;
  }
`;
const Plog2 = styled.div`
  margin-top: 14px;
  margin-left: 16px;
  width: 321px;
`;
const PlogText = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Text1 = styled.div`
  font-family: "SUIT Variable";
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 19px;
  color: ${COLOR.MAIN_GREEN};
`;
const Text2 = styled.div`
  font-family: "SUIT Variable";
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 16px;
  color: ${COLOR.DARK_GRAY};
`;
const Plog3 = styled.div`
  margin-left: 16px;
  width: 321px;
  height: 10px;
  border-radius: 5px;
  background-color: ${COLOR.MAIN_WHITE};
`;
const LevelBar = styled.div`
  margin-top: 12px;
  width: 321px;
  height: 10px;
  background: ${COLOR.INPUT_GRAY};
  border-radius: 5px;
`;
const LevelBar2 = styled.div`
  margin-top: -10px;
  height: 10px;
  background: ${COLOR.MAIN_GREEN};
  width: ${(props) => props.width}px;
  border-radius: 5px;
  z-index: 1;
`;
