import { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as BackArrow } from "../../assets/icons/backArrow.svg";
import { CourseCard } from "../../components/common/CourseCard";

import axios from "axios";

import styled from "styled-components";
import { COLOR } from "../../styles/color";

function CourseMainPage() {
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QHRlc3QuY29tIiwiaWF0IjoxNjgzMjUwNjYyLCJleHAiOjE2ODMyODY2NjJ9.BcFjHJuXiBUSk1-MQNGzfVBW7k8yRYwawf8JgGd5wh8";

  const [courses, setCourses] = useState([]);
  const [category, setCategory] = useState("전체");
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const categories = [
    "전체",
    "근교산자락길",
    "생태문화길",
    "근자락길",
    "어쩌고저쩌고",
  ];

  const ClickCategory = (c) => {
    setCategory((prevCategory) => (prevCategory === c ? "" : c));
    console.log(c);
  };

  let filteredCourses = courses;
  if (category !== "전체") {
    filteredCourses = courses.filter((data) => data.category === category);
  }

  useEffect(() => {
    axios
      .get("http://3.37.14.183/api/roads", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setCourses(response.data.result.content);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
          {filteredCourses.map((data) => (
            <CourseCard key={data.routeId} c={data} />
          ))}
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
