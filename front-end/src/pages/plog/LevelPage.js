import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as BackArrow } from "../../assets/icons/backArrow.svg";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { PointCard } from "../../components/common/PointCard";
import { useRecoilValue } from "recoil";
import { userIdNumber, usePersistRecoilState } from "../../core/userId";

import styled from "styled-components";
import { COLOR } from "../../styles/color";
import { motion } from "framer-motion";
import axios from "axios";

function LevelPage() {
  const token = localStorage.getItem("key");
  const [user, setUser] = useState("");
  const [points, setPoints] = useState([]);

  const [userId, setUserId] = usePersistRecoilState(userIdNumber);

  const navigate = useNavigate();

  const url = `${process.env.REACT_APP_API_ROOT}/api/users/${userId}`;
  const url2 = url + "/point/history";

  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const fetchData = () => {
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setUser(response.data.result);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get(url2, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setPoints(response.data.result.content);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  let sum = 0;
  points.map((point) => {
    let p = point.changePoint;
    sum += p;
  });

  // const data = [
  //   { name: "level", value: sum > 1000 ? sum - just_level * 1000 : sum },
  //   {
  //     name: "remaining",
  //     value: sum > 1000 ? just_level * 1000 - sum : 1000 - sum,
  //   },
  // ];

  const data = [
    { name: "level", value: user.point },
    { name: "remaining", value: 1000 - user.point },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <StNoticePage>
        <NoticeHeader>
          <BackArrow className="noticeBackArrow" onClick={goBack} />
          <HeaderText>Level {user.level}</HeaderText>
        </NoticeHeader>

        <AllPoint>
          <h1>
            전체 포인트 _ <span>{user.totalPoint}</span>
          </h1>
        </AllPoint>
        <ResponsiveContainer width="100%" height={240} className="graph">
          <PieChart>
            <Pie
              data={data}
              startAngle={90}
              endAngle={-270}
              cx="50%"
              cy="50%"
              innerRadius="55%"
              outerRadius="88%"
              animationDuration={1000}
              animationBegin={0.5}
              dataKey="value"
            >
              <Cell fill={COLOR.MAIN_GREEN} />
              <Cell fill={COLOR.FOOTER_GRAY} />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <Point>
          <h5>{user.point}</h5>
          <h6>/ 1,000 포인트</h6>
        </Point>
        <LevelLine />
        <NoticeContent>
          <PointText>포인트 내역</PointText>
          <PointList>
            {points.map((data, index) =>
              data ? (
                <PointCard key={index} p={data} />
              ) : (
                <div key={index}>포인트 내역이 없어요</div>
              )
            )}
          </PointList>
        </NoticeContent>
      </StNoticePage>
    </motion.div>
  );
}

export default LevelPage;

const StNoticePage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-top: 88px;
  .graph {
    margin-top: 15px;
  }
`;
const NoticeHeader = styled.div`
  position: fixed;
  top: 0;
  width: 393px;
  height: 103px;
  background: ${COLOR.MAIN_WHITE};
  z-index: 100;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  .noticeBackArrow {
    margin-top: 35px;
    margin-left: 20px;
  }
`;
const HeaderText = styled.div`
  margin-top: 35px;
  margin-left: 22px;
  font-family: "SUIT Variable";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 25px;
  color: ${COLOR.MAIN_BLACK};
`;
const AllPoint = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  h1 {
    font-family: "SUIT Variable";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
    color: ${COLOR.MAIN_BLACK};
    span {
      font-weight: 700;
      font-size: 16px;
      color: ${COLOR.MAIN_DARK_GREEN};
    }
  }
`;
const Point = styled.div`
  margin-top: -140px;
  margin-bottom: 110px;
  text-align: center;
  h5 {
    font-family: "SUIT Variable";
    font-style: normal;
    font-weight: 700;
    font-size: 17px;
    line-height: 21px;
    color: ${COLOR.MAIN_BLACK};
  }
  h6 {
    margin-top: 6px;
    font-family: "SUIT Variable";
    font-style: normal;
    font-weight: 500;
    font-size: 11px;
    line-height: 14px;
    color: ${COLOR.DARK_GRAY};
  }
`;
const LevelLine = styled.div`
  margin-top: 10px;
  width: 353px;
  text-align: center;
  border: 0.35px solid ${COLOR.MAIN_GREEN};

  line-height: 0.1px;
`;
const NoticeContent = styled.div`
  margin-top: 24px;
  width: 353px;
`;
const PointText = styled.div`
  display: flex;
  width: 100%;
  text-align: left;
  font-family: "SUIT Variable";
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 19px;
  color: ${COLOR.MAIN_BLACK};
`;
const PointList = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;
