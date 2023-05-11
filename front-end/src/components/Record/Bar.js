import React from "react";
import styled from "styled-components";
import { COLOR } from "../../styles/color";

function Bar({ value }) {
  console.log("vv:", value);
  const progress = value / 10;
  return (
    <StProgressBar>
      <div className="skill-box">
        <div className="skill-bar">
          <span className="skill-per nodejs" style={{ width: progress }}>
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
    width: 95%;
    border-radius: 6px;
    background: ${COLOR.MAIN_GREEN};
    animation: progress 0.5s ease-in-out forwards;
    opacity: 0;
  }

  .skill-per.nodejs {
    width: 40%;
    animation-delay: 0.3s;
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
