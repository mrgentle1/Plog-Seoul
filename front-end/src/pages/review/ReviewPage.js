import { useCallback, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ReactComponent as BackArrow } from "../../assets/icons/backArrow.svg";
import { ReactComponent as Pencil } from "../../assets/icons/pencil.svg";
import { ReactComponent as Star } from "../../assets/icons/star.svg";
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
  const real_url = "http://3.37.14.183/api/roads" + url;

  const token = localStorage.getItem("key");

  const [reviews, setReviews] = useState([]);

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

  return (
    <StReviewPage>
      <ReviewHeader>
        <ReviewBox1>
          <BackArrow className="backArrow" onClick={goBack} />
          <h1>후기</h1>
          <h4>6</h4>
        </ReviewBox1>
        <ReviewBox2>
          <h5>+ 500 포인트</h5>
          <Link to={real_pathname + "/review"}>
            <Pencil className="pencil" />
          </Link>
        </ReviewBox2>
      </ReviewHeader>
      <ReviewMain>
        <ReviewStar>
          <h5>평점</h5>
          <Star className="star" />
          <Star className="star" />
          <Star className="star" />
          <Star className="star" />
          <Star className="star" />
        </ReviewStar>
        <ReviewList>
          {reviews.map((data) => (
            <ReviewCard key={data.reviewId} r={data} />
          ))}
        </ReviewList>
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
  width: 353px;
  height: 88px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const ReviewBox1 = styled.div`
  display: flex;

  .backArrow {
    margin-top: 76px;
  }
  h1 {
    margin-top: 74px;
    margin-left: 20px;
    font-family: "SUIT Variable";
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 25px;
  }
  h4 {
    margin-top: 77px;
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
  margin-top: 76px;

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
  margin-top: 24px;
`;
const ReviewStar = styled.div`
  display: flex;
  margin-top: 12px;
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
const ReviewList = styled.div``;
