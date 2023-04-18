import { useCallback, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./SignupPage.css";
import { ReactComponent as BackArrow } from "../../assets/icons/backArrow.svg";
import { Button, DisabledButton } from "../../components/common/Button";

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
    <div className="signup">
      <div className="signupHeader">
        <BackArrow className="signupBackArrow" onClick={goBack} />
      </div>
      <div className="signupText">
        <h2>
          플로그 서울에서
          <br />
          사용할 이름을 알려주세요
        </h2>
      </div>
      <div className="signupInput">
        <input
          className="signupInputBox"
          placeholder="이름을 입력해주세요"
          onChange={onChangeName}
        />
      </div>
      <div className="signupButton">
        {!name ? (
          <DisabledButton disabled="disabled">시작하기</DisabledButton>
        ) : (
          <Link to={"/home"}>
            <Button>시작하기</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default SignupPage;
