import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import { COLOR } from "../../styles/color";
import ImgSlide from "../../assets/images/imgSlide.svg";
import ImgSlide2 from "../../assets/images/imgSlide2.svg";
import ImgSlide3 from "../../assets/images/imgSlide3.svg";

const ImgSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    draggable: true,
    appendDots: (dots) => (
      <Dots
        className="dots_custom"
        style={{
          display: "flex",
          width: "100%",
          position: "absolute",
          bottom: "1px",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: "10px",
        }}
      >
        <ul> {dots} </ul>
      </Dots>
    ),
  };

  return (
    <Slider {...settings}>
      <div>
        <img src={ImgSlide} width="100%" />
      </div>
      <div>
        <img src={ImgSlide2} width="100%" />
      </div>
      <div>
        <img src={ImgSlide3} width="100%" />
      </div>
    </Slider>
  );
};

export default ImgSlider;

const Dots = styled.div`
  .dots_custom {
    display: inline-block;
    vertical-align: middle;
    margin: auto 0;
    padding: 0;
    background: ${COLOR.MAIN_WHITE};
  }

  .dots_custom li {
    list-style: none;
    cursor: pointer;
    display: inline-block;
    margin: 0 6px;
    padding: 0;
  }
`;
