import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
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
  const [point, setPoint] = useState(init);

  const initPro = (init / 1000) * 321;
  //   const progress = (point / 1000) * 321;
  const [animationClass, setAnimationClass] = useState("init fade-in");

  //   const [isUpdate, setIsUpdate] = useState(false);
  const isUpdate = useRef(false);
  const isLevelUp = useRef(false);

  const cal = (it) => {
    const calValue = (it / 1000) * 321;
    return calValue;
  };
  const [progress, setProgress] = useState(() => {
    const initValue = cal(init);
    return initValue;
  });
  useEffect(() => {
    console.log("init");
    console.log("width:", progress);
    if (value > 1000) {
      isLevelUp.current = true;
    }

    setTimeout(() => {
      update(value);
    }, 1500);
  }, []);

  const levelUpInit = () => {
    isLevelUp.current = false;
    setProgress(cal(0));
    setTimeout(() => {
      update(1000 - value);
    }, 1500);
  };

  const update = (it) => {
    // setPoint(value);
    isUpdate.current = true;

    setAnimationClass("animate fade-in");
    if (it > 1000) {
      setProgress(cal(1000));
      isLevelUp.current = true;
    } else {
      setProgress(cal(it));
    }

    // setIsUpdate(true);
  };

  useEffect(() => {
    if (isUpdate.current) {
      console.log("움직여라");
      console.log("width:", progress);
    }

    // if (isLevelUp.current) {
    //   const restart = () => {
    //     setTimeout(levelUpInit(), 6000);
    //   };
    //   return restart;
    // }
  }, [progress]);

  return (
    <StProgressBar>
      <div className="skill-box">
        <div className="skill-bar">
          <span
            className={`skill-per ani ${animationClass}`}
            style={{ width: progress }}
          >
            {isUpdate.current && <span className="tooltip">+250</span>}
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

  margin-top: 2rem;

  .container {
    position: relative;
    width: 32.1rem;
    height: 3rem;
    background: #fff;
    margin: 0rem 1.5rem;
    padding: 1rem 2rem;
    border-radius: 0.7rem;
  }

  .container .skill-box {
    width: 100%;
    margin: 2.5rem 0;
  }

  .skill-box .skill-bar {
    height: 0.8rem;
    width: 32.1rem;
    border-radius: 0.6rem;
    margin-top: 0.6rem;
    background: ${COLOR.LIGHT_GRAY};
  }

  .skill-box .skill-per {
    position: relative;
    display: block;
    height: 100%;
    width: 100%;
    border-radius: 0.6rem;
    background: ${COLOR.MAIN_GREEN};

    &.init {
      animation: progress 0s ease-in-out;
      opacity: 1;
    }

    &.animate {
      animation: progress 3s ease-in-out;

      opacity: 0;
    }

    &.fade-in {
      opacity: 1;
    }
  }

  .skill-per.ani {
    animation-delay: 1s;
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
    right: -1.1rem;
    top: -2.3rem;
    font-style: normal;
    font-weight: 500;
    font-size: 1.1rem;
    line-height: 1.4rem;
    color: ${COLOR.MAIN_GREEN};
    padding: 0.2rem 0.6rem;
    border-radius: 0.3rem;
    background: ${COLOR.MAIN_WHITE};
    z-index: 1;
    transition: all 1s;
  }

  .tooltip::before {
    content: "";
    position: absolute;
    left: 50%;
    bottom: -1.7rem;
    height: 1.6rem;
    width: 1.6rem;
    z-index: -1;
    background-color: ${COLOR.MAIN_GREEN};
    border-radius: 2rem;
    transition: all 1s;
  }
`;
