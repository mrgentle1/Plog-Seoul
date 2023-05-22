import styled from "styled-components";
import { COLOR } from "../../styles/color";

import { useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { ReactComponent as Notice } from "../../assets/icons/notice.svg";
import axios from "axios";

export const ReviewDeleteModal = ({ setModal2Open, r }) => {
  const token = localStorage.getItem("key");

  const pathname = window.location.pathname;
  const url = pathname.substring(7);
  const real_pathname = `${process.env.REACT_APP_API_ROOT}/api/roads` + url + `/${r.reviewId}`;

  const navigate = useNavigate();

  // 모달 끄기
  const closeModal = () => {
    setModal2Open(false);
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
        navigate(-1);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <ModalContainer>
        <ModalText>
          <Notice className="notice" />
          <h3>후기를 삭제할까요?</h3>
          <h5>삭제하면 적립된 포인트도 함께 사라집니다.</h5>
        </ModalText>
        <ModalLine />
        <ModalButton>
          <CloseButton onClick={closeModal}>취소하기</CloseButton>
          <CheckButton onClick={onDelete}>삭제하기</CheckButton>
        </ModalButton>
      </ModalContainer>
    </>
  );
};

export const ModalBackground3 = styled.div`
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
  width: 260px;
  height: 230px;
  margin-top: 20px;

  h3 {
    margin-top: 27px;
    font-family: "SUIT Variable";
    font-style: normal;
    font-weight: 700;
    font-size: 17px;
    line-height: 21px;
    text-align: center;
    color: ${COLOR.MAIN_BLACK};
  }
  h5 {
    margin-top: 12px;
    margin-bottom: 10px;
    font-family: "SUIT Variable";
    font-style: normal;
    font-weight: 600;
    font-size: 15px;
    line-height: 19px;
    text-align: center;
    color: ${COLOR.INPUT_BORDER_GRAY};
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
