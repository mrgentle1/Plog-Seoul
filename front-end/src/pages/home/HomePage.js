import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { headerTitleState } from "../../core/headerTitle";
import { HomeHeader } from "../../components/layout/Header";
import { Footer } from "../../components/layout/Footer";

import styled from "styled-components";
import { COLOR } from "../../styles/color";

function HomePage() {
  const setHeaderTitle = useSetRecoilState(headerTitleState);

  useEffect(() => {
    setHeaderTitle("안녕하세요, 이름님!"); // '홈' 값을 할당합니다.
  }, [setHeaderTitle]);

  return (
    <StHomePage>
      <HomeHeader />
      <div>
        <Box1></Box1>
        <Box2></Box2>
        <Box3></Box3>
        <Box4></Box4>
      </div>
      <Footer />
    </StHomePage>
  );
}

export default HomePage;

const StHomePage = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const Box1 = styled.div`
  width: 353px;
  height: 300px;
  background-color: ${COLOR.MEDIUM_GRAY};
`;
const Box2 = styled.div`
  width: 353px;
  height: 150px;
  margin-top: 13px;
  background-color: ${COLOR.MEDIUM_GRAY};
`;
const Box3 = styled.div`
  width: 353px;
  height: 100px;
  margin-top: 13px;
  background-color: ${COLOR.MEDIUM_GRAY};
`;
const Box4 = styled.div`
  width: 353px;
  height: 170px;
  margin-top: 13px;
  background-color: ${COLOR.MEDIUM_GRAY};
`;
