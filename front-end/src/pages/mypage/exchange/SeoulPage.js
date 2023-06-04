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
import { Dropdown } from "../../../components/Dropdown";

import axios from "axios";
import styled from "styled-components";
import { COLOR } from "../../../styles/color";
import { motion } from "framer-motion";

function SeoulPage() {
  const token = localStorage.getItem("key");
  const [point, setPoint] = useState(0);
  const [level, setLevel] = useState(0);
  const [userId, setUserId] = usePersistRecoilState(userIdNumber);

  const navigate = useNavigate();
  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const [dropdownVisibility, setDropdownVisibility] = useState(false);

  const options = [
    { value: "1", label: "강남사랑상품권" },
    { value: "2", label: "강동사랑상품권" },
    { value: "3", label: "강북사랑상품권" },
    { value: "4", label: "서울강서사랑상품권" },
    { value: "5", label: "관악사랑상품권" },
    { value: "6", label: "광진사랑상품권" },
    { value: "7", label: "구로사랑상품권" },
    { value: "8", label: "금천G밸리 사랑상품권" },
    { value: "9", label: "노원사랑상품권" },
    { value: "10", label: "도봉사랑상품권" },
    { value: "11", label: "동대문구사랑상품권" },
    { value: "12", label: "동작사랑상품권" },
    { value: "13", label: "마포사랑상품권" },
    { value: "14", label: "서대문사랑상품권" },
    { value: "15", label: "서초사랑상품권" },
    { value: "16", label: "성동사랑상품권" },
    { value: "17", label: "성북사랑상품권" },
    { value: "18", label: "송파사랑상품권" },
    { value: "19", label: "양천사랑상품권" },
    { value: "20", label: "영등포사랑상품권" },
    { value: "21", label: "용산사랑상품권" },
    { value: "22", label: "은평사랑상품권" },
    { value: "23", label: "종로사랑상품권" },
    { value: "24", label: "서울중구사랑상품권" },
    { value: "25", label: "중랑사랑상품권" },
  ];

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
      setErrorMessage("");
      setIsExchange(true);
    }
  };

  // 교환완료 모달
  const [modalOpen, setModalOpen] = useState(false);
  const showModal = () => {
    setModalOpen(true);
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
          <HeaderText>서울사랑상품권 교환</HeaderText>
        </ExchangeHeader>
        <ExchangeContent>
          <Box1>
            <LeftBox>
              <Point>{real_point} P</Point>
              <Text1>현재 보유한 포인트</Text1>
            </LeftBox>
            <ForwardArrow className="arrow" />
            <RightBox>
              <Point>{point} P</Point>
              <Text1>전환 후 보유 포인트</Text1>
            </RightBox>
          </Box1>
          <Box2>교환을 원하는 서울사랑상품권 종류를 선택해주세요</Box2>
          <Box3>
            <DropdownButton
              onClick={(e) => setDropdownVisibility(!dropdownVisibility)}
            >
              {dropdownVisibility ? "상품권을 선택하세요" : "Open"}
            </DropdownButton>
            <Dropdown className="dropdown" visibility={dropdownVisibility}>
              <ul>
                {options.map((option) => (
                  <li
                    className="option"
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </li>
                ))}
              </ul>
            </Dropdown>
          </Box3>
        </ExchangeContent>
        <ExchangeButton>
          {errorMessage && !isExchange ? (
            <DisabledButton disabled="disabled">
              서울사랑상품권 교환하기
            </DisabledButton>
          ) : (
            <Button onClick={showModal}>서울사랑상품권 교환하기</Button>
          )}
        </ExchangeButton>
      </StExchangePage>
    </motion.div>
  );
}
export default SeoulPage;

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
  .dropdown {
    background-color: ${COLOR.MAIN_WHITE};
  }
`;
const DropdownButton = styled.select`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 2px 16px;
  width: 353px;
  height: 41px;
  border: 1px solid ${COLOR.DARK_GRAY};
  border-radius: 8px;

  font-family: "SUIT Variable";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: ${COLOR.DARK_GRAY};
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
