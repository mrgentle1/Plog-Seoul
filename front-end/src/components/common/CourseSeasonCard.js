import styled from "styled-components";
import { COLOR } from "../../styles/color";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Shop } from "../../assets/icons/shop.svg";

export const CourseSeasonCard = ({ c }) => {
  const navigate = useNavigate();
  const handlePageChange = () => {
    navigate(`/home/season/${c.RNUM}`);
  };

  return (
    <>
      <StCourseCard onClick={handlePageChange}>
        <StCourseContent>
          <StCourseText>
            <CourseText>
              <h2>
                {c.AREA_GU} - {c.CODE_NAME}
              </h2>
              <h3>{c.COURSE_NAME}</h3>
              <h6>{c.TRAFFIC_INFO}</h6>
            </CourseText>
            <CourseTag>
              <Tag>
                <Shop className="shop" />
                <p>{c.RELATE_SUBWAY}</p>
              </Tag>
              <Tag>
                <Shop className="shop" />
                <p>{c.COURSE_LEVEL}</p>
              </Tag>
              <Tag>
                <Shop className="shop" />
                <p>{c.LEAD_TIME}</p>
              </Tag>
            </CourseTag>
          </StCourseText>
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
  margin-top: 10px;
  width: 353px;
  height: 230px;

  background: #ffffff;
`;
const StCourseContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0px;

  width: 353px;
  height: 230px;
`;
const StCourseText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  width: 353px;
  height: 140px;

  h2 {
    font-family: "SUIT Variable";
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 19px;
    color: ${COLOR.DARK_GRAY};
  }
  h3 {
    margin-top: 3px;
    font-family: "SUIT Variable";
    font-style: normal;
    font-weight: 600;
    font-size: 17px;
    line-height: 19px;
    color: ${COLOR.MAIN_BLACK};
  }
  h6 {
    margin-top: 12px;
    font-family: "SUIT Variable";
    font-style: normal;
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
const CourseTag = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-top: 10px;
  gap: 6px;

  height: 24px;
`;
const Tag = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px 8px 4px 6px;
  height: 24px;
  background: ${COLOR.INPUT_GRAY};
  border-radius: 8px;
  color: ${COLOR.DARK_GRAY};

  .shop {
    margin-right: 5.41px;
  }
  p {
    margin-top: 1.5px;
    font-family: "SUIT Variable";
    font-style: normal;
    font-weight: 500;
    font-size: 11px;
    line-height: 14px;
    color: ${COLOR.DARK_GRAY};
  }
`;
const StCourseLine = styled.div`
  width: 353px;
  text-align: center;
  line-height: 0.1px;
  border: 0.35px solid #8edf82;
`;
