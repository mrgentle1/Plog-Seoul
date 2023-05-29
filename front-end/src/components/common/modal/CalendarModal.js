import styled from "styled-components";
import { COLOR } from "../../../styles/color";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarList } from "../CalendarList";

export const CalendarModal = ({ setModalOpen, plogging, specialDate }) => {
  const navigate = useNavigate();

  console.log("모달창", plogging);
  console.log("모달창스페셜", specialDate);

  const [isSelected, setIsSelected] = useState(false);
  const [selectedRecordId, setSelectedRecordId] = useState(null);

  const handleSelect = (recordId) => {
    setSelectedRecordId(recordId);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSelectAndNavigate = () => {
    if (selectedRecordId) {
      navigate("/record/test", {
        state: { recordId: selectedRecordId, isShowPlog: true },
      });
      closeModal();
    }
  };

  return (
    <>
      <ModalContainer>
        <ModalText>
          <h3>플로그 기록</h3>
          <h5>보고싶은 기록을 선택하세요</h5>
        </ModalText>
        <DateList>
          {plogging
            .filter((data) => data.createdAt.substring(0, 10) === specialDate) // Filter data based on createdAt matching specialDate
            .map((data, index, array) => (
              <CalendarList
                key={index}
                p={data}
                onClick={() => handleSelect(data.recordId)}
                isSelected={selectedRecordId === data.recordId}
                isLastItem={index === array.length - 1} // Use filtered array length for determining the last item
              />
            ))}
        </DateList>
        <ModalLine />
        <ModalButton>
          <CloseButton onClick={closeModal}>취소</CloseButton>
          <CheckButton onClick={handleSelectAndNavigate}>선택하기</CheckButton>
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
  margin-top: -127px;

  background: rgba(190, 194, 198, 0.9);
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2000;

  position: absolute;
  width: 300px;
  height: 327px;

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
  width: 260px;
  height: 90px;
  margin-top: 20px;

  h3 {
    margin-top: 17px;
    font-family: "SUIT Variable";
    font-style: normal;
    font-weight: 700;
    font-size: 17px;
    line-height: 21px;
    text-align: center;
    color: ${COLOR.MAIN_BLACK};
  }
  h5 {
    margin-top: 15px;
    font-family: "SUIT Variable";
    font-style: normal;
    font-weight: 600;
    font-size: 15px;
    line-height: 19px;
    text-align: center;
    color: ${COLOR.INPUT_BORDER_GRAY};
  }
`;
const DateList = styled.div`
  margin-bottom: 20px;
  padding-right: 10px;
  width: 250px;
  height: 150px;
  overflow: scroll;
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
