import { Link } from "react-router-dom";
import "./LoginPage.css";

function LoginPage() {
  return (
    <div className="login">
      <div>로그인 화면</div>
      <Link to={"/home"}>
        <button>홈화면 가기</button>
      </Link>
    </div>
  );
}

export default LoginPage;
