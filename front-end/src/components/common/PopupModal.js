import styled from "styled-components";
import { COLOR } from "../../styles/color";

import { useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { ReviewEditModal, ModalBackground } from "./ReviewEditModal";
import { ReviewDeleteModal, ModalBackground3 } from "./ReviewDeleteModal";

import axios from "axios";

export const PopupModal = ({ setPopupModal, r }) => {
  const token = localStorage.getItem("key");

  const navigate = useNavigate();

  const pathname = window.location.pathname;
  const url = pathname.substring(7);
  const real_pathname =
    `${process.env.REACT_APP_API_ROOT}/api/roads` + url + `/${r.reviewId}`;

  // 리뷰 수정 모달창 호출
  const [modalOpen, setModalOpen] = useState(false);
  const showModal = () => {
    setModalOpen(true);
    console.log("수정창");
  };

  // 리뷰 삭제 모달창 호출
  const [modal2Open, setModal2Open] = useState(false);
  const showModal2 = () => {
    setModal2Open(true);
    console.log("수정창");
  };

  return (
    <>
      {modalOpen && <ReviewEditModal setModalOpen={setModalOpen} r={r} />}
      {modalOpen && <ModalBackground />}
      {modal2Open && <ReviewDeleteModal setModal2Open={setModal2Open} r={r} />}
      {modal2Open && <ModalBackground3 />}
      {!modalOpen && !modal2Open && (
        <ModalContainer>
          <p>후기</p>
          <ModalText>
            <h5>공유하기</h5>
            <h5 onClick={showModal}>수정하기</h5>
            <h5 onClick={showModal2}>삭제하기</h5>
          </ModalText>
        </ModalContainer>
      )}
    </>
  );
};

export const ModalBackground2 = styled.div`
  position: fixed;
  z-index: 1200;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(190, 194, 198, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;

  padding: 24px 24px;
  position: fixed;
  width: 100%;
  height: 237px;
  bottom: 0px;
  z-index: 2000;

  left: 0;
  bottom: 0;

  background: ${COLOR.MAIN_WHITE};
  border-radius: 14px 14px 0px 0px;

  overflow: hidden;

  p {
    font-family: "SUIT Variable";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 14px;
  }
`;
const ModalText = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 36px;
  width: 393px;
  height: 230px;

  h5 {
    margin-bottom: 30px;
    width: 100%;
    text-align: left;
    font-family: "SUIT Variable";
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 17px;
    color: ${COLOR.MAIN_BLACK};
  }
`;
