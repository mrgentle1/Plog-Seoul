import styled from "styled-components";
import { COLOR } from "../../styles/color";
import React, { useCallback, useEffect, useState, useRef } from "react";
import axios from "axios";
import { ReactComponent as ReviewCheck } from "../../assets/icons/reviewCheck.svg";
import { ReactComponent as RecordAlert } from "../../assets/icons/closeAlert.svg";
import { Link, useNavigate } from "react-router-dom";

export const RecordModal = ({ setModalOpen, data, id }) => {
  const token = localStorage.getItem("key");
  const navigate = useNavigate();
  // 경로
  const pathname = window.location.pathname;
  const real_pathname = pathname.substring(0, 7);

  /* DELETE - DELETE Record data */

  async function deleteRecordData() {
    // async, await을 사용하는 경우
    try {
      // GET 요청은 params에 실어 보냄
      const response = await axios.delete(
        `${process.env.REACT_APP_API_ROOT}/api/plogging/${id}/`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("success Delete");
      // 응답 결과(response)를 변수에 저장하거나.. 등 필요한 처리를 해 주면 된다.
    } catch (e) {
      // 실패 시 처리
      console.error(e);
      alert("기록 삭제 실패. 재시도해주세요.");
    }
  }

  // 모달 끄기
  const closeModal = () => {
    console.log("close");
    setModalOpen(false);
    navigate("/record");
  };
  const gotoModal = () => {
    console.log("goto");

    setModalOpen(false);
  };

  const exitModal = () => {
    console.log("check");
    setModalOpen(false);
    deleteRecordData();
    navigate("/record");
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
              data.recording ? closeModal() : gotoModal();
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

  width: 100vw;
  height: 100vh;

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
  padding: 7.6rem 0rem 0rem;
  z-index: 2000;

  position: absolute;
  width: 30rem;
  height: 32.4rem;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background: ${COLOR.MAIN_WHITE};
  border-radius: 1.4rem;
`;

const ModalContents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  gap: 1.5rem;

  .modalIcon {
    width: 3.6rem;
    height: 3.6rem;
  }
`;
const ModalText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0rem;

  width: 100%;
  height: 100%;

  gap: 1.2rem;

  h3 {
    /* font-family: "SUIT Variable"; */
    font-style: normal;
    font-weight: 700;
    font-size: 1.7rem;
    line-height: 2.1rem;
    text-align: center;

    color: ${COLOR.MAIN_BLACK};
  }
  h5 {
    margin-bottom: 7rem;
    font-weight: 500;
    font-size: 1.5rem;
    line-height: 1.9rem;
    text-align: center;
    color: ${COLOR.INPUT_BORDER_GRAY};
  }
`;
const ModalLine = styled.div`
  width: 30rem;
  border: 0.025rem solid ${COLOR.MAIN_GREEN_HOVER};
`;
const ModalButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;
const CloseButton = styled.button`
  width: 15rem;
  height: 4.8rem;
  color: ${COLOR.MAIN_GREEN};
  background: ${COLOR.MAIN_WHITE};
  border-radius: 0rem 0rem 0rem 1.4rem;
  border: none;
  font-weight: 500;
  font-size: 1.5rem;
  line-height: 1.9rem;
`;
const CheckButton = styled.button`
  width: 15rem;
  height: 4.8rem;
  background: ${COLOR.MAIN_GREEN};
  border-radius: 0rem 0rem 1.4rem 0rem;
  border: none;
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 1.9rem;
`;
