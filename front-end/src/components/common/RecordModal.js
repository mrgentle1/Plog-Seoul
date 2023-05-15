import styled from "styled-components";
import { COLOR } from "../../styles/color";
import React, { useCallback, useEffect, useState, useRef } from "react";

import { ReactComponent as ReviewCheck } from "../../assets/icons/reviewCheck.svg";
import { ReactComponent as RecordAlert } from "../../assets/icons/closeAlert.svg";
import { Link, useNavigate } from "react-router-dom";

export const RecordModal = ({ setModalOpen, data }) => {
  const navigate = useNavigate();
  // 경로
  const pathname = window.location.pathname;
  const real_pathname = pathname.substring(0, 7);

  // 모달 끄기
  const closeModal = () => {
    console.log("close");
    setModalOpen(false);
  };
  const gotoModal = () => {
    console.log("goto");

    setModalOpen(false);
  };

  const exitModal = () => {
    console.log("check");
    setModalOpen(false);
    navigate("/record/");
  };

  return (
    <>
      <ModalContainer>
        <ModalContents>
          {data.recording ? (
            <>
              <RecordAlert className="modalIcon" />
              <ModalText>
                <h3>{data.title}</h3>
                <h5>
                  지금 종료하면
                  <br />
                  오늘의 플로깅 기록이 사라져요
                </h5>
              </ModalText>
            </>
          ) : (
            <>
              <ReviewCheck className="modalIcon" />
              <ModalText>
                <h3>{data.title}</h3>
                <h5>
                  여러분의 소중한 후기로
                  <br />더 나은 서비스를 보답할게요
                </h5>
              </ModalText>
            </>
          )}
        </ModalContents>

        <ModalLine />
        <ModalButton>
          <CloseButton
            onClick={() => {
              data.recording ? exitModal() : closeModal();
            }}
          >
            {data.btnText1}
          </CloseButton>

          <CheckButton
            onClick={() => {
              data.isrecording ? closeModal() : gotoModal();
            }}
          >
            {data.btnText2}
          </CheckButton>
        </ModalButton>
      </ModalContainer>
    </>
  );
};

export const ModalBackground = styled.div`
  position: fixed;
  z-index: 1000;

  /* 우선은 393px로 하는데 추후에 100%로 바꿔야 할 듯 */

  width: 400px;
  height: 100%;

  background: rgba(190, 194, 198, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 76px 0px 0px;
  z-index: 2000;

  position: absolute;
  width: 300px;
  height: 324px;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background: ${COLOR.MAIN_WHITE};
  border-radius: 14px;
`;

const ModalContents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  gap: 15px;

  .modalIcon {
    width: 36px;
    height: 36px;
  }
`;
const ModalText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px;

  width: 100%;
  height: 100%;

  gap: 12px;

  h3 {
    /* font-family: "SUIT Variable"; */
    font-style: normal;
    font-weight: 700;
    font-size: 17px;
    line-height: 21px;
    text-align: center;

    color: ${COLOR.MAIN_BLACK};
  }
  h5 {
    margin-bottom: 70px;
    font-weight: 500;
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
  justify-content: flex-end;
`;
const CloseButton = styled.button`
  width: 150px;
  height: 48px;
  color: ${COLOR.MAIN_GREEN};
  background: ${COLOR.MAIN_WHITE};
  border-radius: 0px 0px 0px 14px;
  border: none;
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
  font-weight: 600;
  font-size: 15px;
  line-height: 19px;
`;
