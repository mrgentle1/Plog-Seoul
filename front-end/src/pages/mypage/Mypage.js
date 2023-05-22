import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { headerTitleState } from "../../core/headerTitle";
import { Footer } from "../../components/layout/Footer";
import { ReactComponent as ForwardArrow } from "../../assets/icons/forwardArrow.svg";
import {
  ModalBackground,
  NickNameModal,
} from "../../components/common/NickNameModal";
import {
  LogoutModal,
  ModalBackground2,
} from "../../components/common/modal/LogoutModal";

import axios from "axios";
import styled from "styled-components";
import { COLOR } from "../../styles/color";
import { Link } from "react-router-dom";

function MyPage() {
  const token = localStorage.getItem("key");
  const [user, setUser] = useState([]);

  const form_url =
    "https://docs.google.com/forms/d/e/1FAIpQLSfVS54a7GgefELlOGcm6GSWRfD7XMD1sg4ar3421iG4PRfG-g/viewform?usp=sf_link";

  const setHeaderTitle = useSetRecoilState(headerTitleState);

  // 닉네임 변경 모달창 호출
  const [modalOpen, setModalOpen] = useState(false);
  const showModal = () => {
    setModalOpen(true);
  };

  // 로그아웃 모달창 호출
  const [modalOpen2, setModalOpen2] = useState(false);
  const showModal2 = () => {
    setModalOpen2(true);
  };

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
      })
      .catch((error) => {
        console.error(error);
      });
  }, [user]);

  useEffect(() => {
    setHeaderTitle(user.nickname);
  });

  return (
    <>
      {modalOpen && <NickNameModal setModalOpen={setModalOpen} />}
      {modalOpen && <ModalBackground />}
      {modalOpen2 && <LogoutModal setModalOpen2={setModalOpen2} />}
      {modalOpen2 && <ModalBackground2 />}
      <StMyPage>
        <StHeader>
          <MyEdit onClick={showModal}>닉네임 변경</MyEdit>
        </StHeader>
        <StMyInfo>
          <MyName>{user.name}</MyName>
          <MyEmail>{user.email}</MyEmail>
        </StMyInfo>
        <StMyContent>
          <Link to="/plog/level">
            <MyBox1>
              <MyText>내 포인트</MyText>
              <ForwardArrow className="forwardArrow" />
            </MyBox1>
          </Link>
          <Link to="/my/notice">
            <MyBox2>
              <MyText>공지사항</MyText>
              <ForwardArrow className="forwardArrow" />
            </MyBox2>
          </Link>
          <MyBox3
            onClick={() => {
              window.open(form_url, "_blank");
            }}
          >
            <MyText>문의하기</MyText>
            <ForwardArrow className="forwardArrow" />
          </MyBox3>
          <Link to="/info">
            <MyBox4>
              <MyText>서울 두드림길 안내</MyText>
              <ForwardArrow className="forwardArrow" />
            </MyBox4>
          </Link>
          <MyBox5 onClick={showModal2}>로그아웃</MyBox5>
        </StMyContent>
        <Footer />
      </StMyPage>
    </>
  );
}

export default MyPage;

const StMyPage = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const StHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  text-align: right;
  z-index: 100;
`;
const MyEdit = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  width: 60px;
  height: 30px;
  margin-top: -60px;
  font-family: "SUIT Variable";
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 16px;
  color: ${COLOR.DARK_GRAY};
`;
const StMyInfo = styled.div`
  display: flex;
  width: 353px;
  z-index: 100;
`;
const MyEmail = styled.div`
  margin-left: 12px;
  font-family: "SUIT Variable";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  color: ${COLOR.MAIN_GREEN};
`;
const MyName = styled.div`
  font-family: "SUIT Variable";
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 19px;
  color: ${COLOR.DARK_GRAY};
`;

const StMyContent = styled.div`
  width: 353px;
  .forwardArrow {
    width: 20px;
    height: 20px;
  }
`;
const MyBox1 = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 46px;
`;
const MyBox2 = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 29px;
`;
const MyBox3 = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 29px;
`;
const MyBox4 = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 29px;
`;
const MyBox5 = styled.div`
  display: flex;
  margin-top: 46px;
  font-family: "SUIT Variable";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  color: ${COLOR.INPUT_BORDER_GRAY};
`;
const MyText = styled.div`
  font-family: "SUIT Variable";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  align-items: center;
`;
