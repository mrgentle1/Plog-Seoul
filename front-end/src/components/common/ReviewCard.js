import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { COLOR } from "../../styles/color";
import axios from "axios";

import { ReactComponent as Star } from "../../assets/icons/star.svg";
import { ReactComponent as Dots } from "../../assets/icons/threedots.svg";
import { PopupModal, ModalBackground2 } from "./PopupModal";
import { userIdNumber, usePersistRecoilState } from "../../core/userId";

export const ReviewCard = ({ r }) => {
  const navigate = useNavigate();

  const createdAt = r.createdAt;
  const date = createdAt.substring(0, 10);
  const time = createdAt.substring(11, 16);

  const token = localStorage.getItem("key");
  const [userId, setUserId] = usePersistRecoilState(userIdNumber);

  const pathname = window.location.pathname;
  const url = pathname.substring(7);
  const real_pathname = `${process.env.REACT_APP_API_ROOT}/api/roads` + url + `/${r.reviewId}`;

  // 수정/삭제 팝업창 호출
  const [popupOpen, setPopupOpen] = useState(false);
  const popupModal = () => {
    setPopupOpen(!popupOpen);
  };

  return (
    <>
      {popupOpen && <PopupModal setPopupOpen={setPopupOpen} r={r} />}
      {popupOpen && <ModalBackground2 onClick={popupModal} />}
      <StReviewCard>
        <CourseLine />
        <ReviewList>
          <ReviewListInfo>
            <Box3 isCurrentUser={userId === r.userId}>
              {[...Array(5)].map(
                (_, index) =>
                  index < r.star && <Star key={index} className="blackStar" />
              )}
              <h5>{r.userNickname}</h5>
            </Box3>
            <Box2>
              <h6>
                {date} {time}
              </h6>
              <div onClick={popupModal}>
                {userId === r.userId && <Dots className="dots" />}
              </div>
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

  background: ${COLOR.MAIN_WHITE};

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

  position: relative;
`;
const ReviewListContent = styled.div`
  margin-top: 16px;
  font-family: "SUIT Variable";
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 17px;
  color: ${COLOR.DARK_GRAY};
`;
const DropdownBox = styled.div`
  position: absolute;
  top: 20px;
  right: 0;
  display: flex;
  flex-direction: column;
`;
const Box2 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 130px;

  h6 {
    font-family: "SUIT Variable";
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    line-height: 16px;
    color: ${COLOR.INPUT_BORDER_GRAY};
  }
  .dots {
    margin-right: 10px;
    &:hover + ${DropdownBox} {
      display: block; /* 드롭다운 아이콘에 마우스를 올리면 드롭다운 박스를 보여줌 */
    }
  }
`;

const Box3 = styled.div`
  display: flex;
  align-items: center;
  width: 138px;
  h5 {
    margin-left: 15px;
    font-family: "SUIT Variable";
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
    color: ${(props) =>
      props.isCurrentUser ? COLOR.MAIN_DARK_GREEN : COLOR.INPUT_BORDER_GRAY};
  }
`;
const CourseLine = styled.div`
  width: 353px;
  margin-top: 24px;
  margin-bottom: 24px;
  text-align: center;
  line-height: 0.1px;
  border: 0.35px solid ${COLOR.MAIN_GREEN};
`;
