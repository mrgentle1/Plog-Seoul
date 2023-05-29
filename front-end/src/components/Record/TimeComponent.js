import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { COLOR } from "../../styles/color";

export function TimeComponent(props) {
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

export function TimeConvert(props) {
  console.log(props);
  const [isLodaing, setIsLodading] = useState(true);
  var myNum = parseInt(props.time, 10);
  var hours = Math.floor(myNum / 3600);
  var minutes = Math.floor((myNum - hours * 3600) / 60);
  var remainSeconds = myNum - hours * 3600 - minutes * 60;
  console.log(myNum);

  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (remainSeconds < 10) {
    remainSeconds = "0" + remainSeconds;
  }

  useEffect(() => {
    setIsLodading(false);
  }, []);

  return (
    <StTimeConvert>
      {!isLodaing && (
        <>
          <span>{hours + ":" + minutes + ":" + remainSeconds}</span>
        </>
      )}
    </StTimeConvert>
  );
}

const StTimeComponent = styled.div`
  display: flex;

  width: 100%;
  height: 100%;

  span {
    font-style: normal;
    font-weight: 600;
    font-size: 2.4rem;
    line-height: 3rem;
    color: ${COLOR.MAIN_BLACK};
  }
`;

const StTimeConvert = styled.div`
  display: flex;

  /* span {
    font-family: "SUIT Variable";
    font-style: normal;
    font-weight: 600;
    font-size: 2.4rem;
    line-height: 3rem;
    color: ${COLOR.MAIN_BLACK};
  } */
`;
