import styled from "styled-components";
import { COLOR } from "../../styles/color";

export const CalendarList = ({ p, onClick, isSelected, isLastItem }) => {
  const createdAt = p.createdAt;
  const date = createdAt.substring(0, 10);
  const time = createdAt.substring(11, 16);

  const runningTime = Math.floor(p.runningTime / 60);
  const runningTime2 = p.runningTime % 60;

  const handleSelect = () => {
    onClick(p.recordId);
  };

  return (
    <>
      <StCalendarList onClick={handleSelect} isSelected={isSelected}>
        <ReviewListInfo>
          <h6>
            {date} {time}
          </h6>
          <h5>
            {runningTime}분 {runningTime2}초
          </h5>
        </ReviewListInfo>
      </StCalendarList>
      {!isLastItem && <CourseLine />}
    </>
  );
};

const StCalendarList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0px;
  padding: 0px;
  width: 100%;
  height: 77px;
  background: ${({ isSelected }) =>
    isSelected ? COLOR.MAIN_GREEN_HOVER : COLOR.MAIN_WHITE};
  cursor: pointer;
  &:hover {
    background: ${COLOR.MAIN_GREEN_HOVER};
  }
`;

const ReviewListInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding-top: 5px;
  h6 {
    font-family: "SUIT Variable";
    font-style: normal;
    font-weight: 600;
    font-size: 15px;
    line-height: 19px;
  }
  h5 {
    font-family: "SUIT Variable";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 19px;
  }
`;

const CourseLine = styled.div`
  width: 100%;
  text-align: center;
  line-height: 0.1px;
  border: 0.35px solid ${COLOR.MAIN_GREEN};
`;
