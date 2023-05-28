import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import { COLOR } from "../../styles/color";
import { Button } from "../../components/common/Button";

const Onboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("key");
  useEffect(() => {
    if (token) {
      navigate("/splash");
    }
  }, [token]);

  console.log(token);

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

  return (
    <>
      <OnboardSlider {...settings} ref={sliderRef}>
        <OnboardText>
          환경을 지키며 건강까지 챙겨보는 거 어떤가요?
          <br />
          <br />
          <span>플로깅</span>은 쓰레기를 주우며 조깅을 하는 행위입니다.
        </OnboardText>
        <OnboardText>
          <span>서울 두드림길 정보</span>를 제공하는
          <br />
          <span>플로깅 서울</span>과 함께라면,
          <br />
          <br /> 코스 걱정없이 언제든지 조깅이 가능합니다.
          <br />
          <br />
          더불어 환경을 지킬 수 있죠.
        </OnboardText>
        <OnboardText>
          <span>랭킹</span>을 통해 경쟁하며 <span>포인트</span>를 모아봐요{" "}
          <br />
        </OnboardText>
      </OnboardSlider>
      <OnboardButton>
        <div className="pass" onClick={handlePass}>
          건너뛰기
        </div>
      </OnboardButton>
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

const OnboardSlider = styled(Slider)`
  display: flex;
  flex-direction: center;
  width: 100%;
  height: 90%;
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

const OnboardText = styled.span`
  white-space: nowrap;
  padding-top: 13rem;
  text-align: center;
  font-size: 17px;
  font-family: "SUIT Variable";
  font-style: normal;
  font-weight: 600;
  line-height: 30px;
  span {
    padding-right: 3px;
    font-size: 20px;
    font-weight: 700;
    color: ${COLOR.MAIN_GREEN};
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
