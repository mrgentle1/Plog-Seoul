import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import { COLOR } from "../../styles/color";

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
          bottom: "24px",
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
        <img src={require("../../assets/images/course1.png")} alt="Image 1" />
      </div>
      <div>
        <img src={require("../../assets/images/course2.png")} alt="Image 2" />
      </div>
      <div>
        <img src={require("../../assets/images/course2.png")} alt="Image 3" />
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
