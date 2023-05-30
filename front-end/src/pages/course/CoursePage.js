import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { headerTitleState } from "../../core/headerTitle";
import { HomeHeaderV2 } from "../../components/layout/HeaderV2";
import { BorderButton } from "../../components/common/Button";
import ImgSlider from "../../components/common/ImgSlider";

import styled from "styled-components";
import { COLOR } from "../../styles/color";
import { CourseMainCard } from "../../components/common/CourseMainCard";
import { Link } from "react-router-dom";

function CoursePage() {
  const [headerBackground, setHeaderBackground] = useState("transparent");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 2) {
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

  console.log(headerBackground);

  const setHeaderTitle = useSetRecoilState(headerTitleState);

  useEffect(() => {
    setHeaderTitle("걷기 코스"); // '홈' 값을 할당합니다.
  }, [setHeaderTitle]);

  const updateData = [
    {
      routeId: 1,
      title: "이번 달 가장 인기 있던 코스",
      name: "고덕산 자락길",
      category: "근교산자락길",
      difficulty: "초급",
    },
    {
      routeId: 2,
      title: "여름의 싱그러움을 느낄 수 있는 코스",
      name: "관악산 자락길(무장애숲길)",
      category: "근교산자락길",
      difficulty: "초급",
    },
    {
      routeId: 3,
      title: "더 늦기 전에 떠나봐요",
      name: "매봉산 자락길",
      category: "근교산자락길",
      difficulty: "초급",
    },
    {
      routeId: 4,
      title: "플로그 서울 개발자들의 추천!",
      name: "배봉산 자락길",
      category: "근교산자락길",
      difficulty: "초급",
    },
  ];

  return (
    <StCoursePage>
      <HomeHeaderV2 headerBackground={headerBackground} />
      <CourseMain>
        <StImgSlide>
          <ImgGradation />
          <ImgSlider />
        </StImgSlide>
        <StCourseMain>
          {updateData.map((data) => (
            <CourseMainCard key={data.routeId} c={data} />
          ))}
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
  width: 100%;
`;

const CourseMain = styled.div`
  margin-top: -117px;
  width: 100%;
`;
const StImgSlide = styled.div`
  position: relative;
  width: 100%;
  height: 356px;
  margin-top: 46px;
  margin-bottom: 21px;

  overflow: hidden;
  margin: auto;
`;
const ImgGradation = styled.div`
  position: absolute;
  width: 100%;
  height: 177px;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.3) 36.1%,
    rgba(0, 0, 0, 0) 100%
  );
  z-index: 1;
`;
const StCourseMain = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 21px;
`;
const StCourseBottom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 120px;
`;
