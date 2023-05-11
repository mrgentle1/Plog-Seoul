import React, { useState, useEffect } from "react";
import styled from "styled-components";

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 20px;
  background-color: #f0f0f0;
  border-radius: 10px;
`;

const Progress = styled.div`
  width: 321px;
  height: 10px;
  background-color: #4caf50;
  border-radius: 10px;
  transition: width 0.5s;
`;

const ProgressBar = ({ value, max }) => {
  const [currentValue, setCurrentValue] = useState(value);
  const [currentMax, setCurrentMax] = useState(max);

  useEffect(() => {
    console.log("befor", currentValue);
    const updatedValue = value + 250;
    setCurrentValue(updatedValue);

    if (updatedValue > currentMax) {
      setCurrentMax(800);
    }
  }, [value, currentMax]);

  const progress = ((currentValue - 0) / (currentMax - 0)) * 100 + "%";

  return (
    <ProgressBarContainer>
      <Progress value={currentValue} min={0} max={currentMax} />
    </ProgressBarContainer>
  );
};

export default ProgressBar;
