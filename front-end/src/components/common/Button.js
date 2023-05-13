import styled from "styled-components";
import { COLOR } from "../../styles/color";
import { ReactComponent as ArrowGreen } from "../../assets/icons/arrow_green.svg";

export const Button = ({ children, onClick }) => {
  return <StButton onClick={onClick}>{children}</StButton>;
};

export const DisabledButton = ({ children, onClick }) => {
  return <StDisabledButton onClick={onClick}>{children}</StDisabledButton>;
};

export const BorderButton = ({ children, onClick }) => {
  return <StBorderButton onClick={onClick}>{children}</StBorderButton>;
};

export const BorderThinButton = ({ children, onClick }) => {
  return (
    <StBorderThinButton onClick={onClick}>
      {children} <ArrowGreen className="arrow" />
    </StBorderThinButton>
  );
};

export const GBorderButton = ({ children }) => {
  return <StGBorderButton>{children}</StGBorderButton>;
};

const StButton = styled.button`
  width: 353px;
  height: 60px;
  border: none;
  border-radius: 14px;
  background-color: ${COLOR.MAIN_GREEN};
  color: ${COLOR.MAIN_BLACK};
  /* font-family: "SUIT Variable"; */
  font-style: normal;
  font-weight: 600;
  line-height: 19px;
  letter-spacing: 1.2px;
  :hover {
    background-color: ${COLOR.MAIN_GREEN_HOVER};
  }
`;

const StDisabledButton = styled.button`
  width: 353px;
  height: 60px;
  border: none;
  border-radius: 14px;
  background-color: ${COLOR.LIGHT_GRAY};
  color: ${COLOR.DARK_GRAY};
  font-family: "SUIT Variable";
  font-style: normal;
  font-weight: 600;
  line-height: 19px;
  letter-spacing: 1.2px;
`;

const StBorderButton = styled.button`
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  color: ${COLOR.DARK_GRAY};
  width: 353px;
  height: 60px;
  border: 1px solid ${COLOR.DARK_GRAY};
  border-radius: 14px;
  background-color: ${COLOR.MAIN_WHITE};
  font-weight: 600;
  line-height: 19px;
  letter-spacing: 1.2px;
`;

const StBorderThinButton = styled.button`
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  text-align: left;
  align-items: flex-start;
  padding: 12px 16px;
  width: 353px;
  height: 54px;
  background-color: ${COLOR.MAIN_WHITE};
  border: 1px solid ${COLOR.MAIN_GREEN};
  border-radius: 14px;
  font-weight: 600;
  font-size: 15px;
  line-height: 27px;
  color: ${COLOR.MAIN_BLACK};
  p {
    font-weight: 500;
    font-size: 15px;
    line-height: 27px;
    color: ${COLOR.MAIN_GREEN};
  }
  .arrow {
    text-align: right;
  }
`;

const StGBorderButton = styled.button`
  width: 353px;
  height: 44px;
  border: 1px solid ${COLOR.MAIN_GREEN};
  border-radius: 14px;
  background-color: ${COLOR.MAIN_WHITE};
  color: ${COLOR.MAIN_GREEN};
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
`;
