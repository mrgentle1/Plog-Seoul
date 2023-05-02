import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { headerTitleState } from "../../core/headerTitle";
import { HomeHeaderV3 } from "../../components/layout/HeaderV3";
import { ReactComponent as Pencil } from "../../assets/icons/pencil.svg";
import { ReactComponent as Star } from "../../assets/icons/star.svg";
import { ReviewCard } from "../../components/common/ReviewCard";

import styled from "styled-components";
import { COLOR } from "../../styles/color";
import { BorderButton } from "../../components/common/Button";

function CoursePostPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  // 경로
  const pathname = window.location.pathname;

  const setHeaderTitle = useSetRecoilState(headerTitleState);

  useEffect(() => {
    setHeaderTitle("청룡산 나들길");
  }, [setHeaderTitle]);

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
    <StCoursePostPage>
      <HomeHeaderV3 headerBackground={headerBackground} />
      <StCoursePostMain>
        <CoursePostImg></CoursePostImg>
        <CoursePostText>
          <Text1>서울두드림길 포인트 1.5배 적립</Text1>
          <Text2>
            <Dis>5.87km</Dis>
            <Time>1시간 50분</Time>
            <Level>초급</Level>
          </Text2>
          <Text3>청룡산 공원~누수식 생태연못~청룡상 산림욕장</Text3>
          <Text4>
            청룡산은 서울대입구역과 서울대정문 사이에 위치한 조그마한 산으로
            주택과 인접하고 있어 간단히 산책을 즐길 수 있는 곳으로 계곡물을 이용
            많은 습지가 조성되어 있다. <br />
            ※경사가 완만하고 물이 풍부하여 생태연못 및 유아숲체험장이 조성되어
            특히 봄에 아이들과 천천히 거닐며 자연생태를 관찰 할 수 있다.
          </Text4>
        </CoursePostText>
        <CoursePostReview>
          <CourseLine />
          <ReviewBox1>
            <Box1>
              <Review>후기</Review>
              <h4>6</h4>
            </Box1>
            <Box2>
              <h5>+ 500 포인트</h5>
              <Pencil className="pencil" />
            </Box2>
          </ReviewBox1>
          <ReviewBox2>
            <Star className="star" />
            <Star className="star" />
            <Star className="star" />
            <Star className="star" />
            <Star className="star" />
          </ReviewBox2>
          <ReviewList>
            {dummydata.map((data) =>
              data ? <ReviewCard key={data.id} r={data} /> : null
            )}
          </ReviewList>
        </CoursePostReview>
      </StCoursePostMain>
      <StCoursePostFooter>
        <Link to={pathname + "/review"}>
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
`;
const StCoursePostMain = styled.div`
  margin-bottom: 24px;
`;
const CoursePostImg = styled.div`
  width: 393px;
  height: 356px;
  margin-top: 46px;
  background-color: ${COLOR.DARK_GRAY};
`;
const CoursePostText = styled.div`
  width: 353px;
  margin-left: 20px;
`;
const Text1 = styled.div`
  margin-top: 24px;
  font-weight: 600;
  font-size: 15px;
  line-height: 19px;
  color: ${COLOR.MAIN_DARK_GREEN};
`;
const Text2 = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 12px;

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
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  color: ${COLOR.MAIN_DARK_GREEN};
`;
const Text4 = styled.div`
  margin-top: 24px;
  font-weight: 500;
  font-size: 13px;
  line-height: 16px;
  color: ${COLOR.DARK_GRAY};
`;

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
const ReviewList = styled.div``;
const StCoursePostFooter = styled.div`
  height: 100px;
`;
