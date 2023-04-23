import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { headerTitleState } from "../../core/headerTitle";
import { Footer } from "../../components/layout/Footer";
import { HomeHeader } from "../../components/layout/Header";

import styled from "styled-components";
import { COLOR } from "../../styles/color";

function CoursePage() {
  const setHeaderTitle = useSetRecoilState(headerTitleState);

  useEffect(() => {
    setHeaderTitle("걷기 코스"); // '홈' 값을 할당합니다.
  }, [setHeaderTitle]);

  return (
    <StCoursePage>
      <HomeHeader />
      <div>코스화면</div>
      <Footer />
    </StCoursePage>
  );
}

export default CoursePage;

const StCoursePage = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
