import { useCallback, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ReactComponent as BackArrow } from "../../assets/icons/backArrow.svg";
import { Button, DisabledButton } from "../../components/common/Button";

import styled from "styled-components";
import { COLOR } from "../../styles/color";

function SignupPage() {
  const [name, setName] = useState("");

  const navigate = useNavigate();
  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  return (
    <StSignupPage>
      <SignupHeader>
        <BackArrow className="signupBackArrow" onClick={goBack} />
      </SignupHeader>
      <SignupText>
        <h2>
          플로그 서울에서
          <br />
          사용할 이름을 알려주세요
        </h2>
      </SignupText>
      <SignupInput>
        <SignupInputBox
          placeholder="이름을 입력해주세요"
          onChange={onChangeName}
        />
      </SignupInput>
      <SignupButton>
        {!name ? (
          <DisabledButton disabled="disabled">시작하기</DisabledButton>
        ) : (
          <Link to={"/home"}>
            <Button>시작하기</Button>
          </Link>
        )}
      </SignupButton>
    </StSignupPage>
  );
}

export default SignupPage;

const StSignupPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-top: 88px;
`;
const SignupHeader = styled.div`
  position: fixed;
  top: 0;
  width: 393px;
  height: 88px;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  z-index: 100;

  .signupBackArrow {
    margin-top: 50px;
    margin-left: 20px;
  }
`;
const SignupText = styled.div`
  width: 100%;
  text-align: left;
  width: 100%;
  margin-left: 45px;
  margin-top: 50px;
  font-weight: 700;
  font-size: 20px;
  line-height: 25px;
`;
const SignupInput = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 36px;
`;
const SignupInputBox = styled.input`
  width: 353px;
  height: 41px;
  background: ${COLOR.INPUT_GRAY};
  border: 1px solid ${COLOR.INPUT_BORDER_GRAY};
  border-radius: 8px;
  padding: 12px;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;

  ::placeholder {
    color: ${COLOR.INPUT_BORDER_GRAY};
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
  }
`;
const SignupButton = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 0;
  margin-bottom: 40px;
`;