import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/icons/logo.svg";
import { ReactComponent as KakaoButton } from "../../assets/icons/kakaoButton.svg";

import styled from "styled-components";
import { COLOR } from "../../styles/color";
import { useCookies } from "react-cookie";
import { userIdNumber, usePersistRecoilState } from "../../core/userId";

function LoginPage() {
  const navigate = useNavigate();

  const [contentIndex, setContentIndex] = useState(0);
  const content = "아름다운 서울을 위해\n우리 함께 주워봐요!";

  // typing 함수
  const typing = () => {
    setContentIndex((index) => index + 1);
  };

  useEffect(() => {
    const intervalId = setInterval(typing, 30);
    return () => clearInterval(intervalId);
  }, []);

  const token = localStorage.getItem("key");
  useEffect(() => {
    if (token) {
      navigate("/splash");
    }
  }, [token]);

  console.log(token);

  const kakaoLogin = () => {
    window.location.href = process.env.REACT_APP_KAKAO_LOGIN_URL;
  };

  return (
    <StLoginPage>
      <LoginText>
        <Logo className="logo" />
        <p
          className="txt"
          dangerouslySetInnerHTML={{
            __html: content.substring(0, contentIndex).replace(/\n/g, "<br>"),
          }}
        ></p>
        {contentIndex > content.length && (
          <LoginButton>
            <KakaoButton onClick={kakaoLogin}>카카오로 시작하기</KakaoButton>
          </LoginButton>
        )}
      </LoginText>
    </StLoginPage>
  );
}

export default LoginPage;

const StLoginPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const LoginText = styled.div`
  width: 353px;
  height: 100%;

  margin-top: 20px;
  .logo {
    position: absolute;
    width: 171px;
    height: 119px;
    top: calc(50% - 119px / 2 - 223.5px);
  }
  p {
    position: absolute;
    top: 34.98%;
    bottom: 59.15%;

    font-family: "SUIT Variable";
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 32px;
    color: ${COLOR.MAIN_BLACK};
  }
`;

const LoginButton = styled.div`
  position: fixed;
  bottom: 0;
  margin-bottom: 40px;
  padding: 0;

  display: flex;
  flex-direction: row;
`;
