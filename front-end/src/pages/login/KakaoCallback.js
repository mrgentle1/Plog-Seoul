import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function KakaoCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    async function authenticate() {
      const code = new URL(window.location.href).searchParams.get("code");
      console.log(code);

      try {
        axios
          .get(`http://3.37.14.183/api/auth/kakao?code=${code}`)
          .then((res) => {
            console.log(res);
            navigate("/");
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
