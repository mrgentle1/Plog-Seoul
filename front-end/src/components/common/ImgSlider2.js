import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import styled from "styled-components";
import { COLOR } from "../../styles/color";

const ImgSlider2 = () => {
  const token = localStorage.getItem("key");
  const [images, setImages] = useState([]);

  const img_url = `${process.env.REACT_APP_API_ROOT}/api/roads/images`;

  useEffect(() => {
    axios
      .get(img_url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setImages(response.data.result.courseImages);
      })
      .catch((error) => {
        console.error("error", error);
      });
  }, []);

  const getRandomImages = () => {
    const shuffledImages = [...images].sort(() => 0.5 - Math.random());
    return shuffledImages.slice(0, 3);
  };

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
      {getRandomImages().map((image) => (
        <div key={image.id}>
          <img src={image.imgUrl} alt="" />
        </div>
      ))}
    </Slider>
  );
};

export default ImgSlider2;

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
