import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HomeHeaderV3 } from "../../components/layout/HeaderV3";
import { ReactComponent as Pencil } from "../../assets/icons/pencil.svg";
import { ReactComponent as Star } from "../../assets/icons/star.svg";
import { ReactComponent as HalfStar } from "../../assets/icons/halfstar.svg";
import { NReviewCard } from "../../components/common/NReviewCard";
import { ReactComponent as Shop } from "../../assets/icons/shop.svg";

import axios from "axios";

import styled from "styled-components";
import { COLOR } from "../../styles/color";
import { BorderButton } from "../../components/common/Button";
import ImgSlider2 from "../../components/common/ImgSlider2";

function CoursePostPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 경로
  const pathname = window.location.pathname;
  const url = pathname.substring(7);

  const full_url = `${process.env.REACT_APP_API_ROOT}/api/roads` + url;
  const real_url =
    `${process.env.REACT_APP_API_ROOT}/api/roads` + url + "/reviews";

  const token = localStorage.getItem("key");

  const [course, setCourse] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get(full_url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        setCourse(response.data.result);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(real_url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setReviews(response.data.result.content);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const headerTitle = course.name;
  // 헤더 배경색
  const [headerBackground, setHeaderBackground] = useState("transparent");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 206) {
        setHeaderBackground(COLOR.MAIN_WHITE);
      } else {
        setHeaderBackground("transparent");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [headerBackground]);

  const reviewSum = course.reviewSum / course.reviewCnt;
  const filledStars = Math.floor(reviewSum);
  const hasHalfStar = reviewSum - filledStars >= 0.5;

  return (
    <StCoursePostPage>
      <HomeHeaderV3
        headerBackground={headerBackground}
        headerTitle={headerTitle}
      />
      <StCoursePostMain>
        <CoursePostImg>
          <ImgGradation />
          <ImgSlider2 />
        </CoursePostImg>
        <CoursePostText>
          <Text1>서울두드림길 포인트 1.5배 적립</Text1>
          <Text2>
            <Dis>{course.distance}km</Dis>
            <Time>{course.duration}</Time>
            <Level>{course.difficulty}</Level>
          </Text2>
          <Text3>{course.courseDetail}</Text3>
          <Text4>{course.description}</Text4>
          <CourseTag>
            <Tag>
              <Shop className="shop" />
              <p>{course.city}</p>
            </Tag>
            <Tag>
              <Shop className="shop" />
              <p>{course.category}</p>
            </Tag>
            <Tag>
              <Shop className="shop" />
              <p>{course.difficulty}</p>
            </Tag>
          </CourseTag>
        </CoursePostText>
        <CoursePostReview>
          <CourseLine />
          <ReviewBox1>
            <Box1>
              <Review>후기</Review>
              <h4>{course.reviewCnt}</h4>
            </Box1>
            <Box2>
              <h5>+ 100 포인트</h5>
              <Link to={pathname + "/review"}>
                <Pencil className="pencil" />
              </Link>
            </Box2>
          </ReviewBox1>
          <ReviewBox2>
            <h1>
              {reviewSum % 0.5 === 0
                ? reviewSum.toFixed(1)
                : reviewSum.toFixed(2)}
            </h1>
            {[...Array(5)].map((_, index) => {
              if (index < filledStars) {
                return <Star key={index} className="star" />;
              } else if (index === filledStars && hasHalfStar) {
                return (
                  <HalfStar
                    key={index}
                    className="star"
                    style={{ marginTop: -1 }}
                  />
                );
              } else {
                return null;
              }
            })}
          </ReviewBox2>
          <ReviewList>
            {reviews.map((data) => (
              <NReviewCard key={data.userId} r={data} />
            ))}
          </ReviewList>
        </CoursePostReview>
      </StCoursePostMain>
      <StCoursePostFooter>
        <Link to={pathname + "/reviews"}>
          <BorderButton>전체 후기 보기</BorderButton>
        </Link>
        <CourseLine />
      </StCoursePostFooter>
    </StCoursePostPage>
  );
}

export default CoursePostPage;

const StCoursePostPage = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;
const StCoursePostMain = styled.div`
  margin-bottom: 24px;
  width: 100%;
`;
const CoursePostImg = styled.div`
  position: relative;
  width: 100%;
  height: 356px;
  margin-top: 46px;

  overflow: hidden;
`;
const ImgGradation = styled.div`
  position: absolute;
  width: 100%;
  height: 177px;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.3) 36.1%,
    rgba(0, 0, 0, 0) 100%
  );
  z-index: 1;
`;
const CoursePostText = styled.div`
  margin-left: 20px;
  margin-right: 20px;
`;
const Text1 = styled.div`
  margin-top: 24px;
  font-family: "SUIT Variable";
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 19px;
  color: ${COLOR.MAIN_DARK_GREEN};
`;
const Text2 = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
  font-family: "SUIT Variable";
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 30px;
`;
const Dis = styled.div`
  width: 90px;
`;
const Time = styled.div`
  width: 115px;
`;
const Level = styled.div`
  width: 98px;
`;
const Text3 = styled.div`
  margin-top: 12px;
  font-family: "SUIT Variable";
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  color: ${COLOR.MAIN_DARK_GREEN};
`;
const Text4 = styled.div`
  margin-top: 24px;
  margin-bottom: 24px;
  font-family: "SUIT Variable";
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 18px;
  color: ${COLOR.DARK_GRAY};
`;
const CourseTag = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 6px;

  height: 24px;
`;
const Tag = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px 8px 4px 6px;
  height: 24px;
  background: ${COLOR.INPUT_GRAY};
  border-radius: 8px;
  color: ${COLOR.DARK_GRAY};

  .shop {
    margin-right: 5.41px;
  }
  p {
    margin-top: 1.5px;
    font-family: "SUIT Variable";
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
    color: ${COLOR.DARK_GRAY};
  }
`;

const CoursePostReview = styled.div`
  margin-left: 20px;
  margin-right: 20px;
`;
const CourseLine = styled.div`
  margin-top: 24px;
  margin-bottom: 24px;
  text-align: center;
  line-height: 0.1px;
  border: 0.35px solid ${COLOR.MAIN_GREEN};
`;
const ReviewBox1 = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  .pencil {
    width: 23px;
    height: 23px;
  }
`;
const Box1 = styled.div`
  display: flex;
  justify-content: space-between;
  width: 53px;
  align-items: center;

  h4 {
    font-family: "SUIT Variable";
    font-style: normal;
    font-weight: 700;
    font-size: 17px;
    line-height: 21px;
    color: ${COLOR.INPUT_BORDER_GRAY};
  }
`;
const Box2 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 105px;

  h5 {
    font-family: "SUIT Variable";
    font-style: normal;
    font-weight: 500;
    font-size: 13.5px;
    line-height: 21px;
    text-align: center;
    color: ${COLOR.MAIN_DARK_GREEN};
  }
  h6 {
    font-family: "SUIT Variable";
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    line-height: 16px;
    color: ${COLOR.INPUT_BORDER_GRAY};
  }
  .dots {
    margin-right: 10px;
  }
`;
const ReviewBox2 = styled.div`
  display: flex;
  align-items: center;
  margin-top: 12px;
  .star {
    width: 24px;
    height: 23px;
    color: ${COLOR.MAIN_ORANGE};
  }
  h1 {
    margin-right: 8px;
    font-family: "SUIT Variable";
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 16px;
  }
`;
const Review = styled.div`
  font-family: "SUIT Variable";
  font-style: normal;
  font-weight: 700;
  font-size: 17px;
  line-height: 21px;
  color: ${COLOR.MAIN_BLACK};
`;
const ReviewList = styled.div``;
const StCoursePostFooter = styled.div`
  height: 100px;
`;
