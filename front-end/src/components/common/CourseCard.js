import styled from "styled-components";
import { COLOR } from "../../styles/color";
import { useNavigate } from "react-router-dom";

export const CourseCard = ({ c }) => {
  const navigate = useNavigate();
  const handlePageChange = () => {
    navigate(`/course/${c.courseId}`);
  };

  return (
    <>
      <StCourseCard onClick={handlePageChange}>
        <StCourseContent>
          <StCourseText>
            <CourseText>
              <h3>{c.title}</h3>
              <h6>{c.coursename}</h6>
            </CourseText>
            <CourseTag></CourseTag>
          </StCourseText>
          <StCourseImg></StCourseImg>
        </StCourseContent>
        <StCourseLine />
      </StCourseCard>
    </>
  );
};

const StCourseCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 24px;

  width: 353px;
  height: 164px;

  background: #ffffff;

  margin-bottom: 24px;
`;
const StCourseContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0px;
  gap: 57px;

  width: 353px;
  height: 140px;
`;
const StCourseText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0px;

  width: 197px;
  height: 140px;

  h3 {
    font-weight: 600;
    font-size: 15px;
    line-height: 19px;
    color: ${COLOR.MAIN_BLACK};
  }
  h6 {
    margin-top: 12px;
    font-weight: 500;
    font-size: 13px;
    line-height: 16px;
    color: ${COLOR.MAIN_GREEN};
  }
`;
const CourseText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
`;
const CourseTag = styled.div``;
const StCourseImg = styled.div`
  float: right;
  padding: 0px;
  background-color: ${COLOR.DARK_GRAY};
  width: 120px;
  height: 140px;
  border-radius: 14px;
`;

const StCourseLine = styled.div`
  width: 353px;
  text-align: center;
  line-height: 0.1px;
  border: 0.35px solid #8edf82;
`;
