import { useCallback, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ReactComponent as BackArrow } from "../../assets/icons/backArrow.svg";
import { ReactComponent as Pencil } from "../../assets/icons/pencil.svg";
import { ReactComponent as Star } from "../../assets/icons/star.svg";
import { ReactComponent as HalfStar } from "../../assets/icons/halfstar.svg";
import { ReactComponent as QuarterStar } from "../../assets/icons/quarterstar.svg";
import { ReactComponent as ThreeQuarterStar } from "../../assets/icons/threequartersstar.svg";
import { ReviewCard } from "../../components/common/ReviewCard";

import axios from "axios";

import styled from "styled-components";
import { COLOR } from "../../styles/color";

function ReviewPage() {
  const navigate = useNavigate();
  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  // 경로
  const pathname = window.location.pathname;
  const real_pathname = pathname.substring(0, 9);
  const url = pathname.substring(7);
  const url2 = url.substring(0, url.length - "/reviews".length);

  const course_url = `${process.env.REACT_APP_API_ROOT}/api/roads` + url2;
  const real_url = `${process.env.REACT_APP_API_ROOT}/api/roads` + url;

  const token = localStorage.getItem("key");

  const [course, setCourse] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get(course_url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("코스", response);
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

  const reviewSum = course.reviewSum / course.reviewCnt;
  const filledStars = Math.floor(reviewSum);

  return (
    <StReviewPage>
      <ReviewHeader>
        <ReviewBox1>
          <BackArrow className="backArrow" onClick={goBack} />
          <h1>후기</h1>
          <h4>{course.reviewCnt}</h4>
        </ReviewBox1>
        <ReviewBox2>
          <h5>+ 100 포인트</h5>
          <Link to={real_pathname + "/review"}>
            <Pencil className="pencil" />
          </Link>
        </ReviewBox2>
      </ReviewHeader>
      <ReviewMain>
        {course.reviewCnt === 0 ? (
          <div className="noReview">
            <h5>아직 후기가 없어요</h5>
            <h3>첫 후기를 남겨주세요!</h3>
          </div>
        ) : (
          <>
            <ReviewStar>
              <h1>
                {reviewSum % 0.5 === 0
                  ? reviewSum.toFixed(1)
                  : reviewSum.toFixed(2)}
              </h1>
              {[...Array(5)].map((_, index) => {
                if (index < filledStars) {
                  return <Star key={index} className="star" />;
                } else if (index === filledStars) {
                  if (reviewSum - filledStars >= 0.65) {
                    return <ThreeQuarterStar key={index} className="star" />;
                  } else if (reviewSum - filledStars >= 0.35) {
                    return <HalfStar key={index} className="star" />;
                  } else if (reviewSum - filledStars > 0) {
                    return <QuarterStar key={index} className="star" />;
                  }
                }
                return null;
              })}
            </ReviewStar>
            <ReviewList>
              {reviews.map((data) => (
                <ReviewCard key={data.reviewId} r={data} />
              ))}
            </ReviewList>
          </>
        )}
      </ReviewMain>
    </StReviewPage>
  );
}

export default ReviewPage;

const StReviewPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-top: 88px;
`;
const ReviewHeader = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 105px;
  padding-left: 20px;
  padding-right: 20px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  background-color: ${COLOR.MAIN_WHITE};
  z-index: 1;
`;
const ReviewBox1 = styled.div`
  display: flex;

  .backArrow {
    margin-top: 53px;
  }
  h1 {
    margin-top: 49px;
    margin-left: 20px;
    font-family: "SUIT Variable";
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 25px;
  }
  h4 {
    margin-top: 51px;
    margin-left: 6px;
    font-family: "SUIT Variable";
    font-style: normal;
    font-weight: 700;
    font-size: 17px;
    line-height: 21px;
    color: ${COLOR.INPUT_BORDER_GRAY};
  }
`;
const ReviewBox2 = styled.div`
  display: flex;
  justify-content: space-between;
  width: 110px;
  margin-top: 53px;

  h5 {
    font-family: "SUIT Variable";
    font-style: normal;
    font-weight: 500;
    font-size: 13.5px;
    line-height: 21px;
    text-align: center;
    color: ${COLOR.MAIN_DARK_GREEN};
  }
  .pencil {
    width: 23px;
    height: 23px;
  }
`;
const ReviewMain = styled.div`
  margin-left: 20px;
  margin-right: 20px;
  width: 100%;
  margin-top: 10px;
  padding-bottom: 30px;
  .noReview {
    margin-top: 300px;
    h5 {
      font-family: "SUIT Variable";
      font-style: normal;
      font-weight: 700;
      font-size: 17px;
      line-height: 21px;
      text-align: center;
      color: ${COLOR.INPUT_BORDER_GRAY};
    }
    h3 {
      margin-top: 12px;
      font-family: "SUIT Variable";
      font-style: normal;
      font-weight: 700;
      font-size: 17px;
      line-height: 21px;
      text-align: center;
      color: ${COLOR.DARK_GRAY};
    }
  }
`;
const ReviewStar = styled.div`
  display: flex;
  align-items: center;
  margin-top: 12px;
  h1 {
    margin-left: 20px;
    margin-right: 8px;
    font-family: "SUIT Variable";
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 16px;
  }
  h5 {
    margin-top: 5px;
    margin-right: 10px;
    font-family: "SUIT Variable";
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    color: ${COLOR.MAIN_BLACK};
  }
  .star {
    margin: -1px;
    width: 24px;
    height: 23px;
    color: ${COLOR.MAIN_ORANGE};
  }
`;
const ReviewList = styled.div`
  margin-left: 20px;
  margin-right: 20px;
`;
