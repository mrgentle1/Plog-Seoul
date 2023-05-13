import { useState } from "react";
import { ReactComponent as Star } from "../../assets/icons/star.svg";
import styled from "styled-components";
import { COLOR } from "../../styles/color";

export default function StarRating({ onClick }) {
  const [clickedStarIndex, setClickedStarIndex] = useState(0);

  const handleStarClick = (index) => {
    if (clickedStarIndex === index) {
      setClickedStarIndex(0);
    } else {
      setClickedStarIndex(index);
    }
    onClick?.();
  };

  return (
    <StStarRating>
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          className={index + 1 <= clickedStarIndex ? "selected" : "unselected"}
          isSelected={index + 1 <= clickedStarIndex}
          onClick={() => handleStarClick(index + 1)}
        />
      ))}
    </StStarRating>
  );
}

const StStarRating = styled.div`
  .selected {
    width: 26px;
    height: 25px;
    color: ${COLOR.MAIN_ORANGE};
  }

  .unselected {
    width: 26px;
    height: 25px;
    color: ${COLOR.LIGHT_GRAY};
  }
`;
