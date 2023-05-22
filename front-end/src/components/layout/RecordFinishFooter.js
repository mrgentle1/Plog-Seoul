import styled from "styled-components";
import { COLOR } from "../../styles/color";
import { useNavigate, Link } from "react-router-dom";
import { Button, BorderGreenThinButton } from "../common/Button";
import { useState } from "react";

export const RecordFinishFooter = (props) => {
  //   const [isDone, setIsDone] = useState(false);
  const navigate = useNavigate();

  const showRecord = () => {
    console.log("showRecord");
    navigate("/record/finish");
  };
  const share = () => {
    console.log("share");
  };

  return (
    <StRecordFinishFooter>
      <Button onClick={() => props.setModalOpen(true)}>
        {props.data.text}
      </Button>

      <BorderGreenThinButton
        onClick={() => {
          share();
        }}
      >
        공유하기
      </BorderGreenThinButton>
    </StRecordFinishFooter>
  );
};

const StRecordFinishFooter = styled.div`
  display: flex;
  position: fixed;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  bottom: 0;
  padding: 0px 6px 20px 20px;
  gap: 12px;

  width: 393px;
  height: 122px;
  z-index: 200px;
`;

const PlogFinishBtnWrapper = styled.div`
  display: flex;
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 19px;

  text-align: center;
  color: ${COLOR.MAIN_BLACK};
`;

const PlogShareBtnWrapper = styled.div`
  display: flex;
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 19px;
  text-align: center;
`;
