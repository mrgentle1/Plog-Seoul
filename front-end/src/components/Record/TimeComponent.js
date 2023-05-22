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

export function TimeConvert(seconds) {
  console.log(seconds);
  const [isLodaing, setIsLodading] = useState(true);

  const cal = () => {
    h();
    m();
    s();
    setIsLodading(false);
  };
  const h = () => {
    if (seconds < 3600) {
      console.log("seconds < 3600");
      return <span>00</span>;
    } else {
      return <span>{String(seconds / 3600).padStart(2, "0")}</span>;
    }
  };
  const m = () => {
    if (seconds < 60) {
      console.log("seconds < 60");
      return <span>00</span>;
    } else {
      return <span>{String((seconds % 3600) / 60).padStart(2, "0")}</span>;
    }
  };
  const s = () => {
    console.log("s");
    return <span>{String(seconds % 60).padStart(2, "0")}</span>;
  };

  useEffect(() => {
    cal();
  }, []);
  useEffect(() => {
    if (!isLodaing) {
      console.log("done");
    }
  }, [isLodaing]);
  // var hour =
  //   parseInt(seconds / 3600) < 10
  //     ? "0" + parseInt(seconds / 3600)
  //     : parseInt(seconds / 3600);
  // var min =
  //   parseInt((seconds % 3600) / 60) < 10
  //     ? "0" + parseInt((seconds % 3600) / 60)
  //     : parseInt((seconds % 3600) / 60);
  // var sec = seconds % 60 < 10 ? "0" + (seconds % 60) : seconds % 60;

  return (
    <StTimeConvert>
      {!isLodaing && (
        <>
          {h()}&nbsp;<span>:</span>&nbsp;
          {m()}&nbsp;<span>:</span>&nbsp;
          {s()}
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
