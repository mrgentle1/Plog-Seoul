import { Link } from "react-router-dom";
import { Button } from "../../components/common/Button";

import styled from "styled-components";
import { COLOR } from "../../styles/color";

function LoginPage() {
  return (
    <StLoginPage>
      <LoginText>
        <h3>플로그 서울</h3>
        <h6>
          아름다운 서울을 위해
          <br />
          우리 함께 주워봐요!
        </h6>
      </LoginText>
      <LoginButton>
        <Link to={"/signup"}>
          <Button>카카오로 시작하기</Button>
        </Link>
      </LoginButton>
    </StLoginPage>
  );
}

export default LoginPage;

const StLoginPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const LoginText = styled.div`
  h3 {
    font-weight: 700;
    font-size: 20px;
    line-height: 25px;
    text-align: center;
  }
  h6 {
    margin-top: 36px;
    font-weight: 700;
    font-size: 17px;
    line-height: 21px;
    text-align: center;
  }
`;
const LoginButton = styled.div`
  display: flex;
  position: fixed;
  bottom: 0;
  margin-bottom: 40px;
  padding: 0;

  display: flex;
  flex-direction: row;
`;
