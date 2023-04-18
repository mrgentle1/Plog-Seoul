import { Link } from "react-router-dom";
import "./LoginPage.css";
import { Button } from "../../components/common/Button";

function LoginPage() {
  return (
    <div className="login">
      <div className="loginText">
        <h3>플로그 서울</h3>
        <h6>
          아름다운 서울을 위해
          <br />
          우리 함께 주워봐요!
        </h6>
      </div>
      <div className="loginButton">
        <Link to={"/signup"}>
          <Button>카카오로 시작하기</Button>
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;
