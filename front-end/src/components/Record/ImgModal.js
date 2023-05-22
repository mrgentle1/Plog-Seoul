import styled from "styled-components";
import { COLOR } from "../../styles/color";
import { useEffect, useCallback } from "react";

import { ReactComponent as Close } from "../../assets/icons/arrow_white_btn.svg";
import { useNavigate, useHistory } from "react-router-dom";
import { Button } from "../common/Button";

export const RecordImgModal = ({ setImgOpen, data }) => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate("/record/finish");
  };

  // 경로
  const pathname = window.location.pathname;
  const real_pathname = pathname.substring(0, 7);

  // 모달 끄기
  const closeModal = () => {
    setImgOpen(false);
  };
  const checkModal = () => {
    setImgOpen(false);
  };

  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);

  return (
    <>
      <ModalContainer>
        <ModalCloseWrapper>
          <Close
            className="modalClose"
            onClick={() => {
              closeModal();
            }}
          />
        </ModalCloseWrapper>
        <ModalContents>
          <ModalImg>
            <img src={data} alt="img"></img>
          </ModalImg>
          <ModalButton>
            <Button>공유하기</Button>
          </ModalButton>
        </ModalContents>
      </ModalContainer>
    </>
  );
};

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: center;
  padding: 4.6rem 2rem 0rem 2rem;
  z-index: 2000;

  position: absolute;

  height: 100vh;
  top: 0;

  /* top: 50%;
  left: 50%; */
  /* transform: translate(-50%, -50%); */

  overflow: hidden;
`;

const ModalCloseWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 4.1rem;
  height: 4.1rem;
  .modalClose {
    display: flex;
    width: 4.1rem;
    height: 4.1rem;
    padding: 0;
  }
`;

const ModalContents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 3.6rem;
`;

const ModalImg = styled.div`
  display: flex;
  width: 35.3rem;
  height: 35.3rem;
  background-color: ${COLOR.MAIN_WHITE};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ModalButton = styled.div`
  display: flex;
  flex-direction: row;
`;
