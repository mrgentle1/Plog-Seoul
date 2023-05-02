import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { headerTitleState } from "../../core/headerTitle";
import { HomeHeaderV3 } from "../../components/layout/HeaderV3";
import { ReactComponent as Pencil } from "../../assets/icons/pencil.svg";
import { ReactComponent as Star } from "../../assets/icons/star.svg";
import { ReactComponent as Dots } from "../../assets/icons/threedots.svg";

import styled from "styled-components";
import { COLOR } from "../../styles/color";

function CoursePostPage() {
  const pathname = window.location.pathname;

  const setHeaderTitle = useSetRecoilState(headerTitleState);

  useEffect(() => {
    setHeaderTitle("청룡산 나들길"); // '홈' 값을 할당합니다.
  }, [setHeaderTitle]);

  return (
    <StCoursePostPage>
      <HomeHeaderV3 />
      <StCoursePostMain>
        <CoursePostImg></CoursePostImg>
        <CoursePostText></CoursePostText>
        <CoursePostReview>
          <CourseLine />
          <ReviewBox1>
            <Box1>
              <Review>후기</Review>
              <h4>6</h4>
            </Box1>
            <Box2>
              <h5>+ 500 포인트</h5>
              <Link to={pathname + "/review"}>
                <Pencil className="pencil" />
              </Link>
            </Box2>
          </ReviewBox1>
          <ReviewBox2>
            <Star className="star" />
            <Star className="star" />
            <Star className="star" />
            <Star className="star" />
            <Star className="star" />
          </ReviewBox2>
          <CourseLine />
          <ReviewList>
            <ReviewListInfo>
              <Box3>
                <Star className="blackStar" />
                <Star className="blackStar" />
                <Star className="blackStar" />
                <Star className="blackStar" />
                <Star className="blackStar" />
                <h5>user123</h5>
              </Box3>
              <Box2>
                <h6>2023.05.02</h6>
                <Dots className="dots" />
              </Box2>
            </ReviewListInfo>
            <ReviewListContent>
              <p>어쩌구 저쩌구 리뷰 내용</p>
            </ReviewListContent>
          </ReviewList>
          <CourseLine />
        </CoursePostReview>
      </StCoursePostMain>
    </StCoursePostPage>
  );
}

export default CoursePostPage;

const StCoursePostPage = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const StCoursePostMain = styled.div``;
const CoursePostImg = styled.div`
  width: 393px;
  height: 356px;
  margin-top: 46px;
  background-color: ${COLOR.DARK_GRAY};
`;
const CoursePostText = styled.div``;

const CoursePostReview = styled.div`
  width: 353px;
  margin-left: 20px;
`;
const CourseLine = styled.div`
  width: 353px;
  margin-top: 24px;
  margin-bottom: 24px;
  text-align: center;
  line-height: 0.1px;
  border: 0.35px solid #8edf82;
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
    font-weight: 500;
    font-size: 13.5px;
    line-height: 21px;
    text-align: center;
    color: ${COLOR.MAIN_DARK_GREEN};
  }
  h6 {
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
  margin-top: 12px;
  .star {
    width: 24px;
    height: 23px;
    color: ${COLOR.MAIN_ORANGE};
  }
`;
const Review = styled.div`
  font-weight: 700;
  font-size: 17px;
  line-height: 21px;
  color: ${COLOR.MAIN_BLACK};
`;
const ReviewList = styled.div`
  .blackStar {
    width: 17px;
    height: 16px;
    color: ${COLOR.MAIN_BLACK};
  }
`;

const ReviewListInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ReviewListContent = styled.div`
  margin-top: 16px;
  font-weight: 500;
  font-size: 15px;
  line-height: 17px;
  color: ${COLOR.DARK_GRAY};
`;
const Box3 = styled.div`
  display: flex;
  align-items: center;
  width: 138px;
  h5 {
    margin-left: 15px;
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
    color: ${COLOR.INPUT_BORDER_GRAY};
  }
`;
