import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as BackArrow } from "../../../assets/icons/backArrow.svg";
import { ReactComponent as ExchangeIcon } from "../../../assets/icons/exchange.svg";
import { GreenThinButton } from "../../../components/common/Button";
import { userIdNumber, usePersistRecoilState } from "../../../core/userId";

import axios from "axios";
import styled from "styled-components";
import { COLOR } from "../../../styles/color";
import { motion } from "framer-motion";

function SeoulPage() {
  const token = localStorage.getItem("key");
  const [point, setPoint] = useState(0);
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
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const whiteBoxVariants = {
    hover: {
      backgroundColor: `${COLOR.MAIN_WHITE_HOVER}`,
      border: `${COLOR.MAIN_WHITE_HOVER}`,
      scale: 0.97,
    },
    rest: {
      backgroundColor: `${COLOR.MAIN_WHITE}`,
      scale: 1,
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <StExchangePage>
        <ExchangeHeader>
          <BackArrow className="ExchangeBackArrow" onClick={goBack} />
          <HeaderText>포인트 사용</HeaderText>
        </ExchangeHeader>
        <ExchangeContent>
          <Box1>
            <ExchangeIcon />
            <Point>{point} P</Point>
            <Text1>현재 보유한 포인트</Text1>
          </Box1>
          <Box
            variants={whiteBoxVariants}
            whileHover="hover"
            whileTap="hover"
            whileFocus="hover"
            initial="rest"
            animate="rest"
          >
            <GreenThinButton>제로페이 포인트 전환</GreenThinButton>
          </Box>
          <Box
            variants={whiteBoxVariants}
            whileHover="hover"
            whileTap="hover"
            whileFocus="hover"
            initial="rest"
            animate="rest"
          >
            <GreenThinButton>서울사랑상품권 교환</GreenThinButton>
          </Box>
        </ExchangeContent>
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
  width: 353px;
  height: 121px;
  margin-top: 20px;
  margin-bottom: 36px;
  border-radius: 14px;
  padding: 12px 19px;
  border: 1px solid ${COLOR.MAIN_GREEN};
  background-color: ${COLOR.MAIN_WHITE};
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
  margin-top: 6px;
  font-family: "SUIT Variable";
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 19px;
  color: ${COLOR.DARK_GRAY};
`;
const Box = styled(motion.div)``;
