import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { headerTitleState } from "../../core/headerTitle";
import { Footer } from "../../components/layout/Footer";
import { ReactComponent as ForwardArrow } from "../../assets/icons/forwardArrow.svg";

import axios from "axios";
import styled from "styled-components";
import { COLOR } from "../../styles/color";

function MyPage() {
  const token = localStorage.getItem("key");

  const [user, setUser] = useState([]);

  const setHeaderTitle = useSetRecoilState(headerTitleState);

  useEffect(() => {
    axios
      .get("http://3.37.14.183/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        setUser(response.data.result);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    setHeaderTitle(user.name);
  });

  return (
    <StMyPage>
      <StMyInfo>
        <MyEmail>{user.email}</MyEmail>
        <MyEdit>이름 변경</MyEdit>
      </StMyInfo>
      <StMyContent>
        <MyBox1>
          <MyText>내 포인트</MyText>
          <ForwardArrow className="forwardArrow" />
        </MyBox1>
        <MyBox2>
          <MyText>공지사항</MyText>
          <ForwardArrow className="forwardArrow" />
        </MyBox2>
        <MyBox3>
          <MyText>문의하기</MyText>
          <ForwardArrow className="forwardArrow" />
        </MyBox3>
        <MyBox4>
          <MyText>서울 두드림길 안내</MyText>
          <ForwardArrow className="forwardArrow" />
        </MyBox4>
        <MyBox5>로그아웃</MyBox5>
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
  margin-top: 46px;
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
const MyBox4 = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 29px;
`;
const MyBox5 = styled.div`
  display: flex;
  margin-top: 46px;
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  color: ${COLOR.INPUT_BORDER_GRAY};
`;
const MyText = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  align-items: center;
`;
