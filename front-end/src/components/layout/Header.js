import styled from "styled-components";
import { COLOR } from "../../styles/color";
import { useRecoilValue } from "recoil";
import { headerTitleState } from "../../core/headerTitle";

export const HomeHeader = () => {
  const headerTitle = useRecoilValue(headerTitleState);

  return (
    <StHomeHeader>
      <StHeaderTitle>{headerTitle}</StHeaderTitle>
    </StHomeHeader>
  );
};

const StHomeHeader = styled.div`
  position: fixed;
  top: 0;
  background-color: ${COLOR.MAIN_WHITE};
  width: 393px;
  height: 127px;
  padding: 66px 0 36px 20px;

  font-family: "SUIT Variable";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 15px;
  border: 0;

  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: flex-start;
  align-items: center;

  z-index: 100;
`;
const StHeaderTitle = styled.span`
  color: #000000;
  width: 100%;
  height: 50px;
  font-family: "SUIT Variable";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 25px;
  margin-top: 30px;
`;
