import styled from "styled-components";
import { COLOR } from "../../styles/color";

import { ReactComponent as ReviewCheck } from "../../assets/icons/reviewCheck.svg";
import { Link } from "react-router-dom";

export const Modal = ({ setModalOpen }) => {
  // 경로
  const pathname = window.location.pathname;
  const real_pathname = pathname.substring(0, 7);

  // 모달 끄기
  const closeModal = () => {
    setModalOpen(false);
  };
  const checkModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <ModalContainer>
        <ModalText>
          <ReviewCheck className="reviewCheck" />
          <h3>소중한 후기 감사합니다!</h3>
          <h5>
            여러분의 소중한 후기로
            <br />더 나은 서비스로 보답할게요
          </h5>
        </ModalText>
        <ModalLine />
        <ModalButton>
          <Link to={real_pathname}>
            <CloseButton onClick={closeModal}>닫기</CloseButton>
          </Link>
          <Link to={real_pathname}>
            <CheckButton onClick={checkModal}>내 포인트 확인</CheckButton>
          </Link>
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
  padding: 48px 0px 0px;
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
