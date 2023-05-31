import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/icons/logo.svg";
import styled from "styled-components";
import { motion } from "framer-motion";

function SplashPage() {
  const navigate = useNavigate();

  const token = localStorage.getItem("key");
  useEffect(() => {
    if (token) {
      setTimeout(() => {
        navigate("/home");
      }, 3000);
    } else {
      setTimeout(() => {
        navigate("/onboard");
      }, 3000);
    }
  }, [token, navigate]);

  return (
    <StLoginPage>
      <motion.div
        className="box"
        initial={{ opacity: 0, scale: 0.2 }}
        animate={{ opacity: 1, scale: 0.8 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        <Logo className="logo" />
      </motion.div>
    </StLoginPage>
  );
}

export default SplashPage;

const StLoginPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
