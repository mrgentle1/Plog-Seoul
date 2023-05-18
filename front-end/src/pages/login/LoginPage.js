import { useState, useEffect } from "react";
import { Button } from "../../components/common/Button";
import { ReactComponent as Logo } from "../../assets/icons/logo.svg";

import styled from "styled-components";
import { COLOR } from "../../styles/color";

function LoginPage() {
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

  const kakaoLogin = () => {
    window.location.href = "http://3.37.14.183/api/auth/login";
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
      </LoginText>
      {contentIndex > content.length && (
        <LoginButton>
          <Button onClick={kakaoLogin}>카카오로 시작하기</Button>
        </LoginButton>
      )}
    </StLoginPage>
  );
}

export default LoginPage;

const StLoginPage = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  width: 100%;
  height: 100%;
`;

const LoginText = styled.div`
  .logo {
    position: absolute;
    width: 171px;
    height: 119px;
    left: calc(50% - 171px / 2 - 91px);
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
