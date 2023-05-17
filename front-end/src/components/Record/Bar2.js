import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { COLOR } from "../../styles/color";
const useLoading = () => {
  const [loading, setLoading] = useState(false);

  // 컴포넌트 마운트 시 loading true로 업데이트
  useEffect(() => setLoading(true), []);
  return loading;
};
function Bar({ init, value }) {
  const loading = useLoading();
  console.log("vv:", init, value);
  const [point, setPoint] = useState(0);

  const initPro = (init / 1000) * 321;
  const progress = (value / 1000) * 321;
  const [animationClass, setAnimationClass] = useState("fade-in");
  const ani = useRef("fade-in");

  const [isInit, setIsInit] = useState(false);

  useEffect(() => {
    if (loading) {
      console.log("????loading:", loading);
      console.log("first:", value);
      console.log("FisrtcurrentBar::::", init, value);
      ani.current = "init";
    }
  }, []);
  useEffect(() => {
    if (loading) {
      ani.current = "init";
    }
    // console.log("?!!!!!loading:", loading);
    // console.log("FaaacurrentBar::::", init, value);
  }, [loading]);

  //   useEffect(() => {
  //     if (init === value) {
  //       console.log("currentBar::::", init, value);
  //     }
  //   }, [point]);

  useEffect(() => {
    // console.log("????loading:", loading);
    // setIsUpdate(isUpdate);
    // setIsLevelUp(isLevelUp);

    console.log("????USeData:", update, levelUp);
    if (levelUp) {
      console.log("#.Lee", value);
      ani.current = "animate fade-in";

      console.log("#.class:", ani.current);
      console.log("#.LeeeData:", update, levelUp);
    } else if (update) {
      console.log("##.upup", value);
      //   setTimeout(setAnimationClass("init"), 4000);
      //   setAnimationClass("init");
      ani.current = "animate fade-in";

      setIsLevelUp(isLevelUp);
      console.log("##UPUPData:", update, levelUp);
      console.log("##.class:", ani.current);
    } else {
      console.log("###.no", value);
      ani.current = "animate fade-in";
      console.log("###.class:", ani.current);

      console.log("###NoData:", update, levelUp);
      setIsUpdate(isUpdate);
    }
  });

  //   useEffect(() => {
  //     if (isUpdate || isLevelUp) {
  //       setAnimationClass("animate");

  //       const time1 = setTimeout(() => {
  //         setAnimationClass("animate fade-in");
  //       }, 1000);
  //       return () => {
  //         clearTimeout(time1);
  //       };
  //     }
  //   }, [isUpdate, isLevelUp]);

  return (
    <StProgressBar>
      <div className="skill-box">
        <div className="skill-bar">
          <span
            className={`skill-per nodejs ${ani.current}`}
            style={{ width: progress }}
          >
            <span className="tooltip">+250</span>
          </span>
        </div>
      </div>
    </StProgressBar>
  );
}

export default Bar;

const StProgressBar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin-top: 20px;

  .container {
    position: relative;
    width: 321px;
    height: 30px;
    background: #fff;
    margin: 0 15px;
    padding: 10px 20px;
    border-radius: 7px;
  }

  .container .skill-box {
    width: 100%;
    margin: 25px 0;
  }

  .skill-box .skill-bar {
    height: 8px;
    width: 321px;
    border-radius: 6px;
    margin-top: 6px;
    background: ${COLOR.LIGHT_GRAY};
  }

  .skill-box .skill-per {
    position: relative;
    display: block;
    height: 100%;
    width: 100%;
    border-radius: 6px;
    background: ${COLOR.MAIN_GREEN};

    &.init {
      animation: progress 1s ease-in-out;
      opacity: 1;
      -webkit-animation-play-state: paused;
      animation-play-state: paused;
    }

    &.animate {
      animation: progress 3s ease-in-out;
      -webkit-animation-play-state: running;
      animation-play-state: running;

      opacity: 0;
    }

    &.fade-in {
      opacity: 1;
    }
  }

  .skill-per.nodejs {
    animation-delay: 0s;
  }

  @keyframes progress {
    0% {
      width: 0;
      opacity: 1;
    }

    100% {
      opacity: 1;
    }
  }

  .skill-per .tooltip {
    position: absolute;
    right: -11px;
    top: -23px;
    font-style: normal;
    font-weight: 500;
    font-size: 11px;
    line-height: 14px;
    color: ${COLOR.MAIN_GREEN};
    padding: 2px 6px;
    border-radius: 3px;
    background: ${COLOR.MAIN_WHITE};
    z-index: 1;
  }

  .tooltip::before {
    content: "";
    position: absolute;
    left: 50%;
    bottom: -17px;
    height: 16px;
    width: 16px;
    z-index: -1;
    background-color: ${COLOR.MAIN_GREEN};
    border-radius: 20px;
    /* transform: translateX(-50%) rotate(45deg); */
  }
`;
