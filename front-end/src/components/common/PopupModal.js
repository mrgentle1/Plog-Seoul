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
  const real_pathname = "http://3.37.14.183/api/roads" + url + `/${r.reviewId}`;

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
  z-index: 1000;

  /* 우선은 393px로 하는데 추후에 100%로 바꿔야 할 듯 */

  width: 393px;
  height: 100%;
  margin-left: -20px;
  margin-top: -145px;

  background: rgba(190, 194, 198, 0.9);
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  margin-left: -20px;

  padding: 24px 24px;
  position: absolute;
  width: 393px;
  height: 237px;
  bottom: 0px;
  z-index: 2000;

  background: ${COLOR.MAIN_WHITE};
  border-radius: 14px 14px 0px 0px;

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
