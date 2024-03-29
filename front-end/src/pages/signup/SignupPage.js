import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as BackArrow } from "../../assets/icons/backArrow.svg";
import { Button, DisabledButton } from "../../components/common/Button";

import styled from "styled-components";
import { COLOR } from "../../styles/color";
import axios from "axios";
import { useCookies } from "react-cookie";

function SignupPage() {
  const [name, setName] = useState("");
  const [cookies] = useCookies(["accessToken"]);
  const token = cookies.accessToken;

  const navigate = useNavigate();
  const goBack = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  const [error, setError] = useState("");
  const onChangeName = (e) => {
    const inputValue = e.target.value;
    const filteredValue = inputValue.replace(/[^\wㄱ-ㅎㅏ-ㅣ가-힣]/g, "");
    if (inputValue.length > 6) {
      setError("최대 6글자까지 입력 가능합니다.");
    } else {
      setError("");
    }
    setName(filteredValue);
  };

  const onSubmit = useCallback(() => {
    axios
      .post(
        `${process.env.REACT_APP_API_ROOT}/api/auth/registration`,
        {
          nickname: name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        localStorage.removeItem("key");
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
  }, [name, navigate]);

  return (
    <StSignupPage>
      <SignupHeader>
        <BackArrow className="signupBackArrow" onClick={goBack} />
      </SignupHeader>
      <SignupContent>
        <SignupText>
          <h2>
            플로그 서울에서
            <br />
            사용할 이름을 알려주세요
          </h2>
        </SignupText>
        <SignupInput>
          <SignupInputBox
            maxLength={6}
            placeholder="최대 6글자까지 입력 가능합니다"
            onChange={onChangeName}
          />
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </SignupInput>
        <SignupButton>
          {!name ? (
            <DisabledButton disabled="disabled">시작하기</DisabledButton>
          ) : (
            <Button onClick={onSubmit}>시작하기</Button>
          )}
        </SignupButton>
      </SignupContent>
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
