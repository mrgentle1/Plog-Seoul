import { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as BackArrow } from "../../assets/icons/backArrow.svg";
import { CourseCard } from "../../components/common/CourseCard";
import Spinner from "../../assets/images/spinner.gif";

import axios from "axios";

import styled from "styled-components";
import { COLOR } from "../../styles/color";

function CourseMainPage() {
  const token = localStorage.getItem("key");

  const [courses, setCourses] = useState([]);
  const [category, setCategory] = useState("전체");
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const categories = [
    "전체",
    "서울둘레길",
    "한양도성길",
    "근교산자락길",
    "생태문화길",
    "한강지천길/계절길",
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const ClickCategory = (c) => {
    setCategory((prevCategory) => (prevCategory === c ? "" : c));
    window.scrollTo(0, 0);
  };

  let filteredCourses = courses;
  if (category !== "전체") {
    filteredCourses = courses.filter((data) => data.category === category);
  }

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_ROOT}/api/roads?pagingIndex=0&pagingSize=150`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        setCourses(response.data.result.content);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
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
          {isLoading ? (
            <Loading src={Spinner} alt="로딩중" width="16%" />
          ) : (
            <>
              {filteredCourses.map((data) => (
                <CourseCard key={data.routeId} c={data} />
              ))}
            </>
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
  padding-top: 8.8rem;
`;
const CourseMainHeader = styled.div`
  position: fixed;
  top: 0;
  width: 39.3rem;
  height: 8.8rem;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background-color: ${COLOR.MAIN_WHITE};

  .courseBackArrow {
    margin-top: 5rem;
    margin-left: 2rem;
  }
  z-index: 100;
`;
const HeaderText = styled.div`
  margin-top: 5.25rem;
  margin-left: 2.2rem;
  font-family: "SUIT Variable";
  font-style: normal;
  font-weight: 700;
  font-size: 2rem;
  line-height: 2.5rem;
  color: ${COLOR.MAIN_BLACK};
`;
const CourseMainCategory = styled.div`
  display: flex;
  overflow: auto;
  white-space: nowrap;
  width: 39.3rem;
  height: 7.6rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
  padding-left: 2rem;
  padding-right: 0.5rem;
  background-color: ${COLOR.MAIN_WHITE};

  z-index: 100;
  position: fixed;
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;
const CourseCategory = styled.button`
  margin-right: 0.6rem;
  width: 14rem;
  height: 3.6rem;
  border: none;
  border-radius: 0.8rem;
  padding: 0.85rem 1.2rem;
  font-family: "SUIT Variable";
  font-style: normal;
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 1.9rem;
  text-align: left;

  background-color: ${(props) =>
    props.isSelected ? COLOR.MAIN_GREEN : COLOR.MAIN_WHITE};
  border: ${(props) =>
    props.isSelected
      ? `0.1rem solid ${COLOR.MAIN_GREEN}`
      : `0.1rem solid ${COLOR.MEDIUM_GRAY}`};
  color: ${(props) =>
    props.isSelected ? COLOR.MAIN_BLACK : COLOR.MEDIUM_GRAY};
  cursor: pointer;
`;

const CourseMainContent = styled.div`
  width: 35.3rem;
  margin-top: 8rem;
`;

const Loading = styled.img`
  margin-top: 2rem;
`;

const CourseList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
