import styled from "styled-components";
import { COLOR } from "../../styles/color";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Shop } from "../../assets/icons/shop.svg";

export const CourseMainCard = ({ c }) => {
  const navigate = useNavigate();
  const handlePageChange = () => {
    navigate(`/course/${c.routeId}`);
  };

  return (
    <>
      <StCourseCard onClick={handlePageChange}>
        <StCourseImg></StCourseImg>
        <StCourseText>
          <CourseText>
            <h3>{c.title}</h3>
            <h6>{c.name}</h6>
          </CourseText>
          <CourseTag>
            <Tag>
              <Shop className="shop" />
              <p>{c.category}</p>
            </Tag>
            <Tag>
              <Shop className="shop" />
              <p>{c.difficulty}</p>
            </Tag>
          </CourseTag>
        </StCourseText>
      </StCourseCard>
    </>
  );
};

const StCourseCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;

  width: 353px;
  height: 372px;

  background: #ffffff;

  margin-bottom: 24px;
`;
const StCourseImg = styled.div`
  width: 353px;
  height: 257px;

  background: #fbe2c8;
  border-radius: 14px;
`;
const StCourseText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px 0px;
  gap: 12px;

  width: 353px;
  height: 115px;

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
const CourseTag = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
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
    font-weight: 500;
    font-size: 11px;
    line-height: 14px;
    color: ${COLOR.DARK_GRAY};
  }
`;
