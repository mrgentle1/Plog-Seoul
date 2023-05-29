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
      const host = window.location.origin;
      const code = new URL(window.location.href).searchParams.get("code");

      try {
        axios
          .get(
            `https://seoul-plog.shop/api/auth/kakao?host=${host}&code=${code}`
          )
          .then((res) => {
            const accessToken = res.data.result.jwt;

            console.log(accessToken);
            setCookie("accessToken", accessToken);

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
