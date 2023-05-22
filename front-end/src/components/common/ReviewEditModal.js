import styled from "styled-components";
import { COLOR } from "../../styles/color";

import { useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { ReactComponent as Star } from "../../assets/icons/star.svg";
import axios from "axios";

export const ReviewEditModal = ({ setModalOpen, r }) => {
  const token = localStorage.getItem("key");
  const [content, setContent] = useState("");
  const [star, setStar] = useState(0);

  const navigate = useNavigate();

  // 모달 끄기
  const closeModal = () => {
    setModalOpen(false);
  };

  const pathname = window.location.pathname;
  const url = pathname.substring(7);
  const real_pathname = `${process.env.REACT_APP_API_ROOT}/api/roads` + url + `/${r.reviewId}`;

  const changeReview = useCallback(() => {
    axios
      .put(
        real_pathname,
        { content: content, star: star },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setModalOpen(false);
      })
      .catch((error) => {
        console.error(error);
      });
  });

  const handleStarClick = (index) => {
    if (star === index) {
      setStar(0);
    } else {
      setStar(index);
    }
  };

  return (
    <>
      <ModalContainer>
        <ModalText>
          <h3>수정할 후기 내용을 적어주세요</h3>
          <StarBox>
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                className={index + 1 <= star ? "selected" : "unselected"}
                onClick={() => handleStarClick(index + 1)}
              />
            ))}
          </StarBox>
          <ModalInput onChange={(e) => setContent(e.target.value)} />
        </ModalText>
        <ModalLine />
        <ModalButton>
          <CloseButton onClick={closeModal}>취소하기</CloseButton>
          <CheckButton onClick={changeReview}>수정하기</CheckButton>
        </ModalButton>
      </ModalContainer>
    </>
  );
};

export const ModalBackground = styled.div`
  position: fixed;
  z-index: 1000;

  /* 우선은 393px로 하는데 추후에 100%로 바꿔야 할 듯 */

  width: 393px;
  height: 100vh;
  margin-left: -20px;
  margin-top: -145px;

  background: rgba(190, 194, 198, 0.9);
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48px 0px 0px;
  z-index: 2000;

  position: absolute;
  width: 300px;
  height: 297px;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background: ${COLOR.MAIN_WHITE};
  border-radius: 14px;
`;
const ModalText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px;
  width: 207px;
  height: 230px;

  h3 {
    font-family: "SUIT Variable";
    font-style: normal;
    font-weight: 700;
    font-size: 17px;
    line-height: 21px;
    text-align: center;
    color: ${COLOR.MAIN_BLACK};
  }
`;
const StarBox = styled.div`
  margin-top: 20px;
  .selected {
    width: 26px;
    height: 25px;
    color: ${COLOR.MAIN_ORANGE};
  }

  .unselected {
    width: 26px;
    height: 25px;
    color: ${COLOR.LIGHT_GRAY};
  }
`;
const ModalInput = styled.textarea`
  margin-top: 24px;
  margin-bottom: 40px;
  width: 250px;
  height: 90px;
  background: ${COLOR.INPUT_GRAY};
  border: 1px solid ${COLOR.INPUT_BORDER_GRAY};
  border-radius: 8px;
  padding: 12px;
  font-family: "SUIT Variable";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  resize: none;

  ::placeholder {
    color: ${COLOR.INPUT_BORDER_GRAY};
    font-family: "SUIT Variable";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
  }
`;
const ModalLine = styled.div`
  width: 300px;
  border: 0.25px solid ${COLOR.MAIN_GREEN_HOVER};
`;
const ModalButton = styled.div`
  display: flex;
  flex-direction: row;
`;
const CloseButton = styled.button`
  width: 150px;
  height: 48px;
  color: ${COLOR.MAIN_GREEN};
  background: ${COLOR.MAIN_WHITE};
  border-radius: 0px 0px 0px 14px;
  border: none;
  font-family: "SUIT Variable";
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 19px;
`;
const CheckButton = styled.button`
  width: 150px;
  height: 48px;
  background: ${COLOR.MAIN_GREEN};
  border-radius: 0px 0px 14px 0px;
  border: none;
  font-family: "SUIT Variable";
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 19px;
`;
