import styled from "styled-components";
import { COLOR } from "../../styles/color";
import { useNavigate } from "react-router-dom";

import { ReactComponent as Star } from "../../assets/icons/star.svg";
import { ReactComponent as Dots } from "../../assets/icons/threedots.svg";

export const ReviewCard = ({ r }) => {
  return (
    <>
      <StReviewCard>
        <CourseLine />
        <ReviewList>
          <ReviewListInfo>
            <Box3>
              <Star className="blackStar" />
              <Star className="blackStar" />
              <Star className="blackStar" />
              <Star className="blackStar" />
              <Star className="blackStar" />
              <h5>{r.user}</h5>
            </Box3>
            <Box2>
              <h6>{r.date}</h6>
              <Dots className="dots" />
            </Box2>
          </ReviewListInfo>
          <ReviewListContent>
            <p>{r.content}</p>
          </ReviewListContent>
        </ReviewList>
      </StReviewCard>
    </>
  );
};

const StReviewCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0px;
  padding: 0px;

  width: 353px;
  height: 77px;

  background: #ffffff;

  margin-bottom: 24px;
`;
const ReviewList = styled.div`
  width: 100%;

  .blackStar {
    width: 17px;
    height: 16px;
    color: ${COLOR.MAIN_BLACK};
  }
`;

const ReviewListInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ReviewListContent = styled.div`
  margin-top: 16px;
  font-weight: 500;
  font-size: 15px;
  line-height: 17px;
  color: ${COLOR.DARK_GRAY};
`;
const Box2 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 105px;

  h6 {
    font-weight: 500;
    font-size: 13px;
    line-height: 16px;
    color: ${COLOR.INPUT_BORDER_GRAY};
  }
  .dots {
    margin-right: 10px;
  }
`;
const Box3 = styled.div`
  display: flex;
  align-items: center;
  width: 138px;
  h5 {
    margin-left: 15px;
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
    color: ${COLOR.INPUT_BORDER_GRAY};
  }
`;
const CourseLine = styled.div`
  width: 353px;
  margin-top: 24px;
  margin-bottom: 24px;
  text-align: center;
  line-height: 0.1px;
  border: 0.35px solid #8edf82;
`;
