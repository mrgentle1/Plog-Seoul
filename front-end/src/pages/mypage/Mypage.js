import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { headerTitleState } from "../../core/headerTitle";
import { HomeHeader } from "../../components/layout/Header";
import { Footer } from "../../components/layout/Footer";

import styled from "styled-components";
import { COLOR } from "../../styles/color";

function MyPage() {
  const setHeaderTitle = useSetRecoilState(headerTitleState);

  useEffect(() => {
    setHeaderTitle("이름님"); // '홈' 값을 할당합니다.
  }, [setHeaderTitle]);

  return (
    <StMyPage>
      <HomeHeader />
      <div>마이페이지</div>
      <Footer />
    </StMyPage>
  );
}

export default MyPage;

const StMyPage = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
