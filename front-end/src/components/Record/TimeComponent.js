import React from "react";
import styled from "styled-components";
import { COLOR } from "../../styles/color";

function TimeComponent(props) {
  const h = () => {
    if (props.time.h === 0) {
      return <span>00</span>;
    } else {
      return (
        <span>{props.time.h >= 10 ? props.time.h : "0" + props.time.h}</span>
      );
    }
  };
  return (
    <StTimeComponent>
      {h()}&nbsp;<span>:</span>&nbsp;
      <span>{props.time.m >= 10 ? props.time.m : "0" + props.time.m}</span>
      &nbsp;<span>:</span>&nbsp;
      <span>{props.time.s >= 10 ? props.time.s : "0" + props.time.s}</span>
    </StTimeComponent>
  );
}

export default TimeComponent;

const StTimeComponent = styled.div`
  display: flex;

  width: 100%;
  height: 100%;

  span {
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 30px;
    color: ${COLOR.MAIN_BLACK};
  }
`;
