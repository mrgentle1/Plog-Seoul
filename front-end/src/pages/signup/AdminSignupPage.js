import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as BackArrow } from "../../assets/icons/backArrow.svg";
import { Button, DisabledButton } from "../../components/common/Button";

import styled from "styled-components";
import { COLOR } from "../../styles/color";
import axios from "axios";

function AdminSignupPage() {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState(true);

  const token = process.env.REACT_APP_TOKEN;

  const navigate = useNavigate();
  const goBack = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  const [error, setError] = useState("");

  const onChangeCode = (e) => {
    setCode(e.target.value);
    if (e.target.value === process.env.REACT_APP_CODE) {
      setCodeError(false);
    } else {
      setCodeError(true);
    }
  };

  const onSubmit = useCallback(() => {
    if (!codeError && code === process.env.REACT_APP_CODE) {
      axios
        .post(
          `${process.env.REACT_APP_API_ROOT}/api/auth/registration`,
          {
            nickname: code,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          localStorage.setItem("key", token);
          if (window.Android) {
            window.Android.showToastMessage(name + "님, 환영합니다!");
          }
          navigate("/home");
        })
        .catch((err) => {
          console.error(err);
          // handle error
        });
    }
  }, [name, navigate, token, code, codeError]);

  return (
    <StSignupPage>
      <SignupHeader>
        <BackArrow className="signupBackArrow" onClick={goBack} />
      </SignupHeader>
      <SignupContent>
        <SignupText>
          <h2>
            관리자용 페이지입니다.
            <br />
            미리 발급받은 코드를 입력하세요.
          </h2>
        </SignupText>
        <SignupInput>
          <SignupInputBox onChange={onChangeCode} />
          {codeError && (
            <ErrorMessage>없는 코드입니다. 다시 입력하세요.</ErrorMessage>
          )}
        </SignupInput>
        <SignupButton>
          {codeError || code === "" ? (
            <DisabledButton disabled="disabled">시작하기</DisabledButton>
          ) : (
            <Button onClick={onSubmit}>시작하기</Button>
          )}
        </SignupButton>
      </SignupContent>
    </StSignupPage>
  );
}

export default AdminSignupPage;

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

  .signupBackArrow {
    margin-top: 50px;
    margin-left: 20px;
  }
`;
const SignupContent = styled.div`
  width: 353px;
  height: 100%;

  margin-top: 20px;
`;
const SignupText = styled.div`
  width: 100%;
  text-align: left;
  margin: 0;
  padding: 0;
  font-family: "SUIT Variable";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 25px;
`;
const SignupInput = styled.div`
  width: 353px;
  height: 41px;
  text-align: center;
  margin-top: 36px;
`;
const SignupInputBox = styled.input`
  width: 100%;
  height: 41px;
  background: ${COLOR.INPUT_GRAY};
  border: 1px solid ${COLOR.INPUT_BORDER_GRAY};
  border-radius: 8px;
  padding: 12px;
  font-family: "SUIT Variable";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;

  ::placeholder {
    color: ${COLOR.INPUT_BORDER_GRAY};
    font-family: "SUIT Variable";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
  }
`;
const ErrorMessage = styled.div`
  width: 100%;
  text-align: left;
  padding-left: 5px;
  color: #ff2c2c;
  font-size: 12px;
  margin-top: 4px;
`;
const SignupButton = styled.div`
  position: fixed;
  bottom: 0;
  margin-bottom: 40px;
  padding: 0;

  display: flex;
  flex-direction: row;
`;
