import React, { useState } from "react";
import styled from "styled-components";
import { COLOR } from "../styles/color";

const Dropdown = ({ visibility, children }) => {
  const [isOpen, setIsOpen] = useState(visibility);

  const handleOptionClick = () => {
    setIsOpen(false);
  };

  return (
    <StyledDropdown visibility={visibility && isOpen}>
      {children && (
        <ul>
          {React.Children.map(children, (child) => {
            return React.cloneElement(child, {
              onClick: handleOptionClick,
            });
          })}
        </ul>
      )}
    </StyledDropdown>
  );
};

const StyledDropdown = styled.div`
  display: ${(props) => (props.visibility ? "block" : "none")};
  position: absolute;
  top: 45px;
  width: 353px;
  border: 1px solid ${COLOR.DARK_GRAY};
  border-radius: 8px;
  background-color: ${COLOR.MAIN_WHITE};
  z-index: 2;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    padding: 8px 16px;
    cursor: pointer;

    &:hover {
      background-color: ${COLOR.MAIN_LIGHT_GRAY};
    }
  }
`;

export { Dropdown };
