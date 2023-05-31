import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as BackArrow } from "../../../assets/icons/backArrow.svg";
import { ReactComponent as ForwardArrow } from "../../../assets/icons/forwardArrow.svg";
import { userIdNumber, usePersistRecoilState } from "../../../core/userId";
import { Button, DisabledButton } from "../../../components/common/Button";
import {
  ZeroModal,
  ZeroModalBackground,
} from "../../../components/common/modal/ZeroModal";

import axios from "axios";
import styled from "styled-components";
import { COLOR } from "../../../styles/color";
import { motion } from "framer-motion";

function ZeroPage() {
  const token = localStorage.getItem("key");
  const [point, setPoint] = useState(0);
  const [level, setLevel] = useState(0);
  const [userId, setUserId] = usePersistRecoilState(userIdNumber);

  const navigate = useNavigate();
  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const url = `${process.env.REACT_APP_API_ROOT}/api/users/${userId}`;

  useEffect(() => {
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setPoint(response.data.result.point);
        setLevel(response.data.result.level);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const real_point = level * 1000 + point - 1000;
  const [changePoint, setChangePoint] = useState(0);

  const [errorMessage, setErrorMessage] = useState(" ");
  const [isExchange, setIsExchange] = useState(false);

  const onChange = (e) => {
    const inputValue = e.target.value.replace(/\D/g, "");
    const validInput = Math.floor(Number(inputValue) / 1000) * 1000;

    if (validInput > real_point) {
      setErrorMessage("보유한 포인트보다 전환하려는 포인트가 더 많습니다.");
    } else if (inputValue !== validInput.toString()) {
      setErrorMessage("포인트 입력은 1000단위로 해야합니다.");
    } else {
      setChangePoint(validInput);
      setErrorMessage("");
      setIsExchange(true);
    }
  };

  const change_point = real_point - changePoint;
  console.log(change_point);

  const title = "제로페이 포인트 전환";
  const url2 = `${
    process.env.REACT_APP_API_ROOT
  }/api/users/${userId}/point?newPoint=${-changePoint}&title=${title}&type=제로페이`;

  // 교환완료 모달
  const [modalOpen, setModalOpen] = useState(false);
  const showModal = () => {
    setModalOpen(true);
    axios
      .put(
        url2,
        {
          userId: userId,
          newPoint: -changePoint,
          title: title,
          type: "후기작성",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log("포인트 적립 성공!");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {modalOpen && <ZeroModal setModalOpen={setModalOpen} />}
      {modalOpen && <ZeroModalBackground />}
      <StExchangePage>
        <ExchangeHeader>
          <BackArrow className="ExchangeBackArrow" onClick={goBack} />
          <HeaderText>제로페이 전환</HeaderText>
        </ExchangeHeader>
        <ExchangeContent>
          <Box1>
            <LeftBox>
              <Point>{real_point} P</Point>
              <Text1>현재 보유한 포인트</Text1>
            </LeftBox>
            <ForwardArrow className="arrow" />
            <RightBox>
              <Point>{change_point} P</Point>
              <Text1>전환 후 보유 포인트</Text1>
            </RightBox>
          </Box1>
          <Box2>제로페이로 전환할 포인트를 입력하세요</Box2>
          <Box3>최소 1,000P부터 1,000P 단위로 전환 가능해요</Box3>
          <InputBox onChange={onChange} />
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </ExchangeContent>
        <ExchangeButton>
          {errorMessage && !isExchange ? (
            <DisabledButton disabled="disabled">
              제로페이 포인트 전환하기
            </DisabledButton>
          ) : (
            <Button onClick={showModal}>제로페이 포인트 전환하기</Button>
          )}
        </ExchangeButton>
      </StExchangePage>
    </motion.div>
  );
}
export default ZeroPage;

const StExchangePage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-top: 108px;
`;
const ExchangeHeader = styled.div`
  position: fixed;
  top: 0;
  width: 393px;
  height: 98px;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background-color: ${COLOR.MAIN_WHITE};
  z-index: 1;

  .ExchangeBackArrow {
    margin-top: 28px;
    margin-left: 20px;
  }
`;
const HeaderText = styled.div`
  margin-top: 28px;
  margin-left: 22px;
  font-family: "SUIT Variable";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 25px;
  color: ${COLOR.MAIN_BLACK};
`;
const ExchangeContent = styled.div`
  font-family: "SUIT Variable";
  font-style: normal;
  font-weight: 600;
  font-size: 17px;
  line-height: 21px;
  color: ${COLOR.INPUT_BORDER_GRAY};
`;
const Box1 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 353px;
  height: 60px;
  margin-top: 10px;
  margin-bottom: 46px;
  border-radius: 14px;
  .arrow {
    width: 20px;
    height: 20px;
    align-items: center;
    color: ${COLOR.MAIN_GREEN};
  }
`;
const LeftBox = styled.div`
  text-align: left;
`;
const RightBox = styled.div`
  text-align: right;
`;
const Point = styled.div`
  margin-top: 10px;
  font-family: "SUIT Variable";
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 30px;
  color: ${COLOR.MAIN_BLACK};
`;
const Text1 = styled.div`
  margin-top: 8px;
  font-family: "SUIT Variable";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: ${COLOR.INPUT_BORDER_GRAY};
`;
const Box2 = styled.div`
  font-family: "SUIT Variable";
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 19px;
  color: ${COLOR.MAIN_BLACK};
`;
const Box3 = styled.div`
  margin-top: 6px;
  font-family: "SUIT Variable";
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 19px;
  color: ${COLOR.MAIN_DARK_GREEN};
`;
const InputBox = styled.input`
  width: 100%;
  height: 41px;
  background: ${COLOR.INPUT_GRAY};
  border: 1px solid ${COLOR.INPUT_BORDER_GRAY};
  border-radius: 8px;
  padding: 12px;
  margin-top: 24px;
  font-family: "SUIT Variable";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;

  ::placeholder {
    color: ${COLOR.INPUT_BORDER_GRAY};
    font-family: "SUIT Variable";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
  }

  -moz-appearance: textfield; /* Firefox */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none; /* Safari */
    margin: 0;
  }
`;
const ErrorMessage = styled.div`
  color: ${COLOR.MAIN_ORANGE};
  margin-top: 4px;
  font-family: "SUIT Variable";
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 19px;
`;
const ExchangeButton = styled.div`
  position: fixed;
  bottom: 0;
  margin-bottom: 40px;
  padding: 0;

  display: flex;
  flex-direction: row;
`;
