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

export const ImgModalBackground = styled.div`
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

  justify-content: center;
  padding: 66px 20px 0px 20px;
  z-index: 2000;

  position: absolute;

  height: 100vh;

  /* top: 50%;
  left: 50%; */
  /* transform: translate(-50%, -50%); */

  overflow: hidden;
`;

const ModalCloseWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  top: 0;
  width: 41px;
  height: 41px;
  .modalClose {
    display: flex;
    width: 41px;
    height: 41px;
    padding: 0;
  }
`;

const ModalContents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 36px;
`;

const ModalImg = styled.div`
  display: flex;
  width: 353px;
  height: 353px;
  background-color: ${COLOR.MAIN_WHITE};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const ModalText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px;
  margin-top: 27px;

  width: 168px;
  height: 200px;

  .reviewCheck {
    width: 36px;
    height: 36px;
  }
  h3 {
    margin-top: 28px;
    font-weight: 700;
    font-size: 17px;
    line-height: 21px;
    text-align: center;
    color: ${COLOR.MAIN_BLACK};
  }
  h5 {
    margin-top: 12px;
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
