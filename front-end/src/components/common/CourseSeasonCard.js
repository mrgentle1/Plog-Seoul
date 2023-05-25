import styled from "styled-components";
import { COLOR } from "../../styles/color";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Shop } from "../../assets/icons/shop.svg";

export const CourseSeasonCard = ({ c, isLastCard }) => {
  return (
    <>
      <StCourseCard>
        <StCourseContent>
          <StCourseText>
            <CourseText>
              <h3>{c.COURSE_NAME}</h3>
              <h2>
                {c.AREA_GU} - {c.CODE_NAME}
              </h2>
              <span>{c.DETAIL_COURSE}</span>
            </CourseText>
            <CourseTag>
              <Tag>
                <Shop className="shop" />
                <p>{c.LEAD_TIME}</p>
              </Tag>
              <Tag>
                <Shop className="shop" />
                <p>{c.COURSE_LEVEL}</p>
              </Tag>
              <Tag>
                <Shop className="shop" />
                <p>{c.RELATE_SUBWAY}</p>
              </Tag>
            </CourseTag>
          </StCourseText>
        </StCourseContent>
        {!isLastCard && <StCourseLine />}
      </StCourseCard>
    </>
  );
};

const StCourseCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 353px;
  background: #ffffff;
`;
const StCourseContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0px;
  width: 353px;
`;
const StCourseText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 353px;
  margin-top: 20px;
  margin-bottom: 20px;

  h3 {
    font-family: "SUIT Variable";
    font-style: normal;
    font-weight: 600;
    font-size: 15px;
    line-height: 19px;
    color: ${COLOR.MAIN_BLACK};
  }
  h2 {
    margin-top: 12px;
    font-family: "SUIT Variable";
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    line-height: 16px;
    color: ${COLOR.MAIN_DARK_GREEN};
  }
  span {
    margin-top: 12px;
    font-family: "SUIT Variable";
    font-style: normal;
    font-weight: 500;
    font-size: 11px;
    line-height: 14px;
    color: ${COLOR.DARK_GRAY};
    white-space: normal;
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
  border: 0.35px solid #8edf82;
`;
