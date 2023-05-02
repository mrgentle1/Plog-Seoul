import { useCallback, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ReactComponent as BackArrow } from "../../assets/icons/backArrow.svg";
import { ReactComponent as Pencil } from "../../assets/icons/pencil.svg";
import { ReactComponent as Star } from "../../assets/icons/star.svg";
import { ReviewCard } from "../../components/common/ReviewCard";

import styled from "styled-components";
import { COLOR } from "../../styles/color";

function ReviewPage() {
  const navigate = useNavigate();
  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const dummydata = [
    {
      id: 1,
      user: "user1",
      date: "2023.05.02",
      content: "어쩌구저쩌구 이것은 후기입니다",
    },
    {
      id: 2,
      user: "user12",
      date: "2023.05.02",
      content: "어쩌구저쩌구 이것은 후기입니다",
    },
    {
      id: 3,
      user: "user123",
      date: "2023.05.03",
      content: "리뷰의 예시",
    },
    {
      id: 4,
      user: "user124",
      date: "2021.05.05",
      content: "어쩌구저쩌구 이것은 후기입니다",
    },
    {
      id: 5,
      user: "user1235",
      date: "2022.05.02",
      content: "리이이이이이뷰우우우우우웅",
    },
  ];

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
          <Pencil className="pencil" />
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
          {dummydata.map((data) =>
            data ? <ReviewCard key={data.id} r={data} /> : null
          )}
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
    font-weight: 700;
    font-size: 20px;
    line-height: 25px;
  }
  h4 {
    margin-top: 76px;
    margin-left: 6px;
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
