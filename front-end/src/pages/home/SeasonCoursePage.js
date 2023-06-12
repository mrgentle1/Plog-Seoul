import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as BackArrow } from "../../assets/icons/backArrow.svg";
import { CourseSeasonCard } from "../../components/common/CourseSeasonCard";

import styled from "styled-components";
import { COLOR } from "../../styles/color";
import { motion } from "framer-motion";
import axios from "axios";

function SeasonCoursePage() {
  const token = localStorage.getItem("key");
  const [courses, setCourses] = useState([]);

  const navigate = useNavigate();
  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_ROOT}/api/roads/recommended`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setCourses(response.data.result.walkSesonInfo.row);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  console.log(courses);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <StSeasonCoursePage>
        <SeasonHeader>
          <BackArrow className="noticeBackArrow" onClick={goBack} />
          <HeaderText>계절별 추천 코스</HeaderText>
        </SeasonHeader>
        <SeasonContent>
          {courses.map((data, index) => (
            <CourseSeasonCard
              key={data.RNUM}
              index={data.RNUM}
              c={data}
              isLastCard={index === courses.length - 1} // 마지막 아이템인 경우 isLastCard를 true로 설정
            />
          ))}
        </SeasonContent>
      </StSeasonCoursePage>
    </motion.div>
  );
}
export default SeasonCoursePage;

const StSeasonCoursePage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-top: 88px;
  .graph {
    margin-top: 40px;
  }
`;
const SeasonHeader = styled.div`
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
const SeasonContent = styled.div`
  margin-top: 10px;
  width: 353px;
`;
