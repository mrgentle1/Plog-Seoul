import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import { COLOR } from "../../styles/color";
import { Button, BorderGreenThinButton } from "../../components/common/Button";
import Img1 from "../../assets/images/onboard1.svg";
import Img2 from "../../assets/images/onboard2.svg";
import Img3 from "../../assets/images/onboard3.svg";

const Onboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("key");
  // useEffect(() => {
  //   if (token) {
  //     navigate("/");
  //   }
  // }, [token]);

  // console.log(token);

  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    dotsClass: "customDots",
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current, next) => setCurrentSlide(next),
  };
  const isLastSlide = currentSlide === 2;

  const handlePass = () => {
    setCurrentSlide(2);
    sliderRef.current.slickGoTo(2);
  };

  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  return (
    <>
      <OnboardSlider {...settings} ref={sliderRef}>
        <Slide1>
          <OnboardText>
            <span>플로깅 Plogging</span>이란
            <br /> <span>쓰레기를 주우며 조깅</span>을 하는 행위를 말해요
          </OnboardText>
          <img className="img1" src={Img1} />
        </Slide1>
        <Slide2>
          <OnboardText>
            플로그 서울에서 <span>코스 걱정 없이</span>
            <br /> <span>서울두드림길</span> 플로깅을 도전해보세요!
          </OnboardText>
          <img className="img2" src={Img2} />
        </Slide2>
        <Slide3>
          <OnboardText>
            환경과 건강을 지키면서
            <br />
            <span>포인트</span>를 모으고, <span>랭킹</span>을 올려봐요!
          </OnboardText>
          <img className="img3" src={Img3} />
        </Slide3>
      </OnboardSlider>
      {!isLastSlide && (
        <OnboardTopButton>
          <div className="pass" onClick={handlePass}>
            건너뛰기
          </div>
        </OnboardTopButton>
      )}
      {!isLastSlide && (
        <OnboardButton>
          <BorderGreenThinButton onClick={handleNext}>
            다음으로
          </BorderGreenThinButton>
        </OnboardButton>
      )}
      {isLastSlide && (
        <OnboardButton>
          <Link to="/login">
            <Button>플로그 서울 시작하기</Button>
          </Link>
        </OnboardButton>
      )}
    </>
  );
};
export default Onboard;

const OnboardTopButton = styled.div`
  justify-content: flex-end;
  position: absolute;
  right: 0;
  top: 3.3rem;
  padding-right: 20px;
  .pass {
    font-family: "SUIT Variable";
    font-style: normal;
    font-size: 15px;
    font-weight: 500;
    color: ${COLOR.INPUT_BORDER_GRAY};
  }
`;

const OnboardSlider = styled(Slider)`
  display: flex;
  flex-direction: center;
  width: 100%;
  height: 100%;
  .slick-prev::before,
  .slick-next::before {
    opacity: 0;
    display: none;
  }
  .customDots {
    position: absolute;
    top: 3rem;
    width: 100%;
    padding: 0;
    margin: 0;
    list-style: none;
    text-align: center;
  }

  .customDots li {
    position: relative;
    display: inline-block;
    width: 2rem;
    height: 2rem;
    margin: 0 0.4rem;
    padding: 0;
    cursor: pointer;
  }
  .customDots li button {
    font-size: 0;
    line-height: 0;
    display: block;
    width: 1rem;
    height: 1rem;
    padding: 0.3rem;
    cursor: pointer;
    color: transparent;
    border: 0;
    outline: none;
    background: transparent;
  }
  .customDots li button:before {
    font-family: "slick";
    font-size: 1rem;
    line-height: 2rem;
    position: absolute;
    top: 0;
    left: 0;
    width: 1rem;
    height: 1rem;
    content: "•";
    text-align: center;
    color: ${COLOR.MEDIUM_GRAY};
    -webkit-font-smoothing: antialiased;
  }
  .customDots li.slick-active button:before {
    position: absolute;
    top: 0.4rem;
    width: 2rem;
    height: 1rem;
    margin: 0rem 0rem 0rem -0.4rem;
    content: "";
    border-radius: 5rem;
    background-color: ${COLOR.MAIN_GREEN};
    color: ${COLOR.MAIN_GREEN};
  }
`;

const Slide1 = styled.div`
  width: 100%;
  height: 100%;
  .img1 {
    margin-left: 5%;
    width: 90%;
    text-align: center;
    justify-content: center;
  }
`;
const Slide2 = styled.div`
  width: 100%;
  height: 100%;
  .img2 {
    margin-left: 5%;
    width: 90%;
    text-align: center;
    justify-content: center;
  }
`;
const Slide3 = styled.div`
  width: 100%;
  height: 100%;
  .img3 {
    margin-left: 5%;
    width: 90%;
    text-align: center;
    justify-content: center;
  }
`;

const OnboardText = styled.div`
  width: 100%;
  white-space: nowrap;
  padding-top: 13rem;
  margin-left: 2rem;
  text-align: left;
  font-size: 18px;
  font-family: "SUIT Variable";
  font-style: normal;
  font-weight: 600;
  line-height: 30px;
  color: ${COLOR.DARK_GRAY};
  span {
    padding-right: 3px;
    font-size: 19px;
    font-weight: 700;
    color: ${COLOR.MAIN_BLACK};
  }
`;

const OnboardButton = styled.div`
  width: 100%;
  text-align: center;
  position: absolute;
  bottom: 4.4rem;
  .pass {
    padding-bottom: 20px;
    letter-spacing: 1.3px;
    font-family: "SUIT Variable";
    font-style: normal;
    font-size: 16px;
    font-weight: 700;
    color: ${COLOR.INPUT_BORDER_GRAY};
  }
`;
