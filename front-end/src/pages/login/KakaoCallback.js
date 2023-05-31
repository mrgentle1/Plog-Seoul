import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

function KakaoCallback() {
  const navigate = useNavigate();
  const [cookie, setCookie] = useCookies(["accessToken"]);
  const [user, setUser] = useState("");
  const token = cookie.accessToken;

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
            setCookie("accessToken", accessToken);
          });
      } catch (error) {
        console.error("Error fetching authentication:", error);
      }
    }
    authenticate();
  }, [navigate]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_ROOT}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setUser(response.data.result);
        if (response.data.result.isFirst) {
          navigate("/signup");
        } else {
          localStorage.setItem("key", token);
          navigate("/home");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <p>카카오 인증 중...</p>
    </div>
  );
}

export default KakaoCallback;
