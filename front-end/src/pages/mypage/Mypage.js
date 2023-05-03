import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { headerTitleState } from "../../core/headerTitle";
import { Footer } from "../../components/layout/Footer";
import { ReactComponent as ForwardArrow } from "../../assets/icons/forwardArrow.svg";

import styled from "styled-components";
import { COLOR } from "../../styles/color";

function MyPage() {
  const setHeaderTitle = useSetRecoilState(headerTitleState);

  useEffect(() => {
    setHeaderTitle("이름님"); // '홈' 값을 할당합니다.
  }, [setHeaderTitle]);

  return (
    <StMyPage>
      <StMyInfo>
        <MyEmail>abcde123@gmail.com</MyEmail>
        <MyEdit>이름 변경</MyEdit>
      </StMyInfo>
      <StMyContent>
        <MyBox1>
          <MyText>내 포인트</MyText>
          <ForwardArrow className="forwardArrow" />
        </MyBox1>
        <MyBox2>
          <MyText>알림 설정</MyText>
          <ForwardArrow className="forwardArrow" />
        </MyBox2>
        <MyBox3>
          <MyText>서울 두드림길 안내</MyText>
          <ForwardArrow className="forwardArrow" />
        </MyBox3>
      </StMyContent>
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
const StMyInfo = styled.div`
  display: flex;
  justify-content: space-between;
  width: 353px;
`;
const MyEmail = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  color: ${COLOR.MAIN_GREEN};
`;
const MyEdit = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: ${COLOR.DARK_GRAY};
`;

const StMyContent = styled.div`
  width: 353px;
  .forwardArrow {
    width: 20px;
    height: 20px;
  }
`;
const MyBox1 = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 38px;
`;
const MyBox2 = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 29px;
`;
const MyBox3 = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 29px;
`;
const MyText = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  align-items: center;
`;
