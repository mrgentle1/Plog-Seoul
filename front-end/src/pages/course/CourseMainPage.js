import { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as BackArrow } from "../../assets/icons/backArrow.svg";
import { CourseCard } from "../../components/common/CourseCard";

import styled from "styled-components";
import { COLOR } from "../../styles/color";

function CourseMainPage() {
  const [category, setCategory] = useState("전체");

  const navigate = useNavigate();
  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const categories = [
    "전체",
    "한양도성길",
    "서울둘레길",
    "근자락길",
    "어쩌고저쩌고",
    "땡땡길",
  ];

  const ClickCategory = (c) => {
    setCategory((prevCategory) => (prevCategory === c ? "" : c));
    console.log(c);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const dummydata = [
    {
      courseId: 1,
      title: "이번주 가장 인기 많았던 코스",
      coursename: "한양도성길",
    },
    {
      courseId: 2,
      title: "봄나들이 코스",
      coursename: "한양도성길",
    },
    {
      courseId: 3,
      title: "더 늦기 전에 떠나는 플로깅 코스",
      coursename: "한양도성길",
    },
    {
      courseId: 4,
      title: "MZ의 추천!",
      coursename: "한양도성길",
    },
    {
      courseId: 5,
      title: "이번주 가장 인기 많았던 코스",
      coursename: "한양도성길",
    },
  ];

  return (
    <StCourseMainPage>
      <CourseMainHeader>
        <BackArrow className="courseBackArrow" onClick={goBack} />
        <HeaderText>전체 코스</HeaderText>
      </CourseMainHeader>
      <CourseMainCategory>
        {categories.map((c) => (
          <CourseCategory
            key={c}
            isSelected={c === category}
            onClick={() => ClickCategory(c)}
          >
            {c}
          </CourseCategory>
        ))}
      </CourseMainCategory>
      <CourseMainContent>
        <CourseList>
          {dummydata.map((data) =>
            data ? <CourseCard key={data.courseId} c={data} /> : null
          )}
        </CourseList>
      </CourseMainContent>
    </StCourseMainPage>
  );
}

export default CourseMainPage;

const StCourseMainPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-top: 88px;
`;
const CourseMainHeader = styled.div`
  position: fixed;
  top: 0;
  width: 393px;
  height: 88px;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background-color: ${COLOR.MAIN_WHITE};

  .courseBackArrow {
    margin-top: 50px;
    margin-left: 20px;
  }
  z-index: 100;
`;
const HeaderText = styled.div`
  margin-top: 52.5px;
  margin-left: 22px;
  font-weight: 700;
  font-size: 20px;
  line-height: 25px;
  color: ${COLOR.MAIN_BLACK};
`;
const CourseMainCategory = styled.div`
  display: flex;
  overflow: auto;
  white-space: nowrap;
  width: 393px;
  height: 76px;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 20px;
  background-color: ${COLOR.MAIN_WHITE};

  z-index: 100;
  position: fixed;
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;
const CourseCategory = styled.button`
  margin-right: 6px;
  width: 100px;
  height: 36px;
  border: none;
  border-radius: 8px;
  padding: 8.5px 12px;
  font-weight: 600;
  font-size: 15px;
  line-height: 19px;
  text-align: left;

  background-color: ${(props) =>
    props.isSelected ? COLOR.MAIN_GREEN : COLOR.MAIN_WHITE};
  border: ${(props) =>
    props.isSelected
      ? `1px solid ${COLOR.MAIN_GREEN}`
      : `1px solid ${COLOR.MEDIUM_GRAY}`};
  color: ${(props) =>
    props.isSelected ? COLOR.MAIN_BLACK : COLOR.MEDIUM_GRAY};
  cursor: pointer;
`;

const CourseMainContent = styled.div`
  width: 353px;
  margin-top: 80px;
`;

const CourseList = styled.div``;
