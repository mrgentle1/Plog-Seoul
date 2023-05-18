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
    <StBorderButtonWrapper>
      <StBorderThinButton onClick={onClick}>
        <div className="text">{children}</div>
        <ArrowGreen className="arrow" />
      </StBorderThinButton>
    </StBorderButtonWrapper>
  );
};

export const BorderGreenThinButton = ({ children, onClick }) => {
  return (
    <StBorderGreenThinButton onClick={onClick}>
      {children}
    </StBorderGreenThinButton>
  );
};

const StButton = styled.button`
  width: 353px;
  height: 60px;
  border: none;
  border-radius: 14px;
  background-color: ${COLOR.MAIN_GREEN};
  color: ${COLOR.MAIN_BLACK};
  font-family: "SUIT Variable";
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
  font-family: "SUIT Variable";
  font-style: normal;

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

const StBorderButtonWrapper = styled.button`
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
  margin-bottom: 12px;
`;
const StBorderThinButton = styled.button`
  border: none;
  background-color: ${COLOR.MAIN_WHITE};
  font-weight: 600;
  font-size: 15px;
  line-height: 27px;
  color: ${COLOR.MAIN_BLACK};

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px;
  gap: 12px;

  width: 321px;
  height: 30px;

  font-family: "SUIT Variable";
  font-style: normal;

  .text {
    display: flex;
    flex-direction: row;
  }
  p {
    text-align: left;
    font-family: "SUIT Variable";
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 27px;
    color: ${COLOR.MAIN_GREEN};
  }
  .arrow {
    flex: none;
    order: 1;
    flex-grow: 0;
  }
`;

const StBorderGreenThinButton = styled.button`
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
