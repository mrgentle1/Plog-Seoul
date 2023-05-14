import { useState } from "react";
import styled from "styled-components";
import { COLOR } from "../../styles/color";
import axios from "axios";

import { ReactComponent as Star } from "../../assets/icons/star.svg";
import { ReactComponent as Dots } from "../../assets/icons/threedots.svg";

export const ReviewCard = ({ r }) => {
  const createdAt = r.createdAt;
  const date = createdAt.substring(0, 10);
  const time = createdAt.substring(11, 16);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const token = localStorage.getItem("key");

  const content = r.content;
  const pathname = window.location.pathname;
  const url = pathname.substring(7);
  const real_pathname = "http://3.37.14.183/api/roads" + url + `/${r.reviewId}`;

  const onEdit = () => {
    axios
      .put(real_pathname, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onDelete = () => {
    axios
      .delete(real_pathname, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
              <h5>{r.userNickname}</h5>
            </Box3>
            <Box2>
              <h6>
                {date} {time}
              </h6>
              <div onClick={toggleDropdown}>
                <Dots className="dots" />
                {isDropdownOpen && (
                  <DropdownBox>
                    <EditButton onClick={onEdit}>수정</EditButton>
                    <DeleteButton onClick={onDelete}>삭제</DeleteButton>
                  </DropdownBox>
                )}
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
const EditButton = styled.button`
  font-size: 13px;
  color: ${COLOR.MAIN_BLACK};
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 5px;
  margin-bottom: 5px;
`;
const DeleteButton = styled.button`
  font-size: 13px;
  color: ${COLOR.MAIN_BLACK};
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 5px;
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
    color: ${COLOR.INPUT_BORDER_GRAY};
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
