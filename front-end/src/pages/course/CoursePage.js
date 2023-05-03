import { useEffect, useState, useRef } from "react";
import { useSetRecoilState } from "recoil";
import { headerTitleState } from "../../core/headerTitle";
import { HomeHeaderV2 } from "../../components/layout/HeaderV2";
import { BorderButton } from "../../components/common/Button";

import styled from "styled-components";
import { COLOR } from "../../styles/color";
import { CourseMainCard } from "../../components/common/CourseMainCard";
import { Link } from "react-router-dom";

function CoursePage() {
  // 헤더 배경색
  const [headerBackground, setHeaderBackground] = useState("transparent");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 206) {
        setHeaderBackground(COLOR.MAIN_WHITE);
      } else {
        setHeaderBackground("transparent");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [headerBackground]);

  const setHeaderTitle = useSetRecoilState(headerTitleState);

  useEffect(() => {
    setHeaderTitle("걷기 코스"); // '홈' 값을 할당합니다.
  }, [setHeaderTitle]);

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
    <StCoursePage>
      <HomeHeaderV2 headerBackground={headerBackground} />
      <CourseMain>
        <StImgSlide>
          <StCarousel>
            <StImg className="prev" />
            <StImg />
            <StImg className="next" />
          </StCarousel>
        </StImgSlide>
        <StCourseMain>
          {dummydata.map((data) =>
            data ? <CourseMainCard key={data.courseId} c={data} /> : null
          )}
        </StCourseMain>
        <StCourseBottom>
          <Link to="/course/main">
            <BorderButton>전체 코스 보기</BorderButton>
          </Link>
        </StCourseBottom>
      </CourseMain>
    </StCoursePage>
  );
}

export default CoursePage;

const StCoursePage = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const CourseMain = styled.div`
  margin-top: -81px;
`;
const StImgSlide = styled.div`
  width: 393px;
  height: 356px;
  background-color: ${COLOR.DARK_GRAY};
  margin-bottom: 21px;

  overflow: hidden;
  margin: auto;
`;
const StCarousel = styled.div`
  -webkit-transform-style: preserve-3d;
  -moz-transform-style: preserve-3d;
  transform-style: preserve-3d;
`;
const StImg = styled.div`
  .prev {
  }
  .next {
  }
`;
const StCourseMain = styled.div`
  margin-left: 20px;
  margin-top: 21px;
`;
const StCourseBottom = styled.div`
  margin-left: 20px;
  margin-bottom: 25px;
`;
