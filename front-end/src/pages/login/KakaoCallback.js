import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../../core/cookie";
import axios from "axios";
import { useCookies } from "react-cookie";

function KakaoCallback() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["accessToken"]);

  useEffect(() => {
    async function authenticate() {
      const code = new URL(window.location.href).searchParams.get("code");

      try {
        axios
          .get(`http://3.37.14.183/api/auth/kakao?code=${code}`)
          .then((res) => {
            const accessToken = res.data.result.jwt;
            const token = cookies.access_token;
            setCookie(token);

            navigate("/signup");
          });
      } catch (error) {
        console.error("Error fetching authentication:", error);
      }
    }

    authenticate();
  }, [navigate]);

  return (
    <div>
      <p>카카오 인증 중...</p>
    </div>
  );
}

export default KakaoCallback;
