import { Button } from "../../components/common/Button";
import { ReactComponent as Logo } from "../../assets/icons/logo.svg";

import styled from "styled-components";
import { COLOR } from "../../styles/color";

function LoginPage() {
  const kakaoLogin = () => {
    window.location.href = "http://3.37.14.183/api/auth/login";
  };

  return (
    <StLoginPage>
      <LoginText>
        <Logo />
        <h6>
          아름다운 서울을 위해
          <br />
          우리 함께 주워봐요!
        </h6>
      </LoginText>
      <LoginButton>
        <Button onClick={kakaoLogin}>카카오로 시작하기</Button>
      </LoginButton>
    </StLoginPage>
  );
}

export default LoginPage;

const StLoginPage = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 143px;
  margin-left: 20px;
  width: 100%;
  height: 100%;
`;

const LoginText = styled.div`
  h6 {
    margin-top: 36px;
    font-weight: 700;
    font-size: 20px;
    line-height: 25px;
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
