import styled from "styled-components";
import { COLOR } from "../../styles/color";

export const Button = ({ children }) => {
  return <StButton>{children}</StButton>;
};

export const DisabledButton = ({ children }) => {
  return <StDisabledButton>{children}</StDisabledButton>;
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
