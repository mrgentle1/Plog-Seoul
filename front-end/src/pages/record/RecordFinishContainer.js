/* global kakao */
import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { Map, MapMarker, Polyline, useMap } from "react-kakao-maps-sdk";
import { Button, BorderGreenThinButton } from "../../components/common/Button";
import styled from "styled-components";
import { COLOR } from "../../styles/color";
import { ReactComponent as Close } from "../../assets/icons/close.svg";
import { ReactComponent as BackArrow } from "../../assets/icons/backArrow.svg";
import PlogImg from "../../assets/icons/imgMarker.svg";
import { useNavigate, Link, useLocation } from "react-router-dom";
import axios from "axios";

import {
  RecordModal,
  ModalBackground,
} from "../../components/common/RecordModal";

import dummyImg from "../../dummys/recordImgData.json";
import { RecordHeader } from "../../components/layout/RecordHeader";
import { RecordImgModal } from "../../components/Record/ImgModal";
import { EditImgModal } from "./EditImg";
import { TimeConvert } from "../../components/Record/TimeComponent";
import { path } from "d3-path";
import ShowRecordData from "./ShowRecordData";

const modalData = {
  recording: false,
  title: "오늘의 플로깅은 어떠셨나요?",
  btnText1: "닫기",
  btnText2: "내 포인트 확인",
};
function RecordFinishPage() {
  const token = localStorage.getItem("key");

  /*point에서 현재 위치 값을 가져와 초기세팅 해줌 */
  const plogRecord = useLocation();
  const recordId = plogRecord.state.recordId;
  const isShowPlog = plogRecord.state.isShowPlog;

  const [userData, setUserData] = useState({
    recordId: recordId,
    isShowPlog: isShowPlog,
  });

  const [isCourse, sestIsCourse] = useState(false);

  // 오늘 날짜
  let now = new Date();
  let todayMonth = now.getMonth() + 1;
  let todayDate = now.getDate();

  const [modalOpen, setModalOpen] = useState(false);
  const showModal = () => {
    setModalOpen(true);
  };
  const navigate = useNavigate();
  const finish = () => {
    navigate("/record");
  };
  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);
  const [clickImg, setClickImg] = useState("");
  const [imgOpen, setImgOpen] = useState(false);
  const showImgModal = () => {
    setImgOpen(true);
  };

  const [clickEditImg, setClickEditImg] = useState("");
  const [recordImgData, setRecordImgData] = useState({});
  const [imgEditOpen, setImgEditOpen] = useState(false);
  const showEditImgModal = () => {
    setImgEditOpen(true);
  };

  const getImgUrl = (url) => {
    setClickImg(url);
  };

  const getData = (data) => {
    setRecordImgData(data);
  };

  return (
    <>
      {modalOpen && (
        <RecordModal setModalOpen={setModalOpen} data={modalData} />
      )}
      {imgOpen && <RecordImgModal setImgOpen={setImgOpen} data={clickImg} />}
      {imgEditOpen && (
        <EditImgModal
          setImgEditOpen={setImgEditOpen}
          img={clickImg}
          data={recordImgData}
        />
      )}

      {(modalOpen || imgOpen || imgEditOpen) && <ModalBackground />}
      {!userData.isShowPlog ? (
        <RecordFinishHeader>
          <span>
            {todayMonth}월 {todayDate}일
          </span>
          <p></p>
          <CloseWrapper>
            <Close
              className="headerClose"
              onClick={() => {
                isCourse ? showModal() : showModal();
              }}
            />
          </CloseWrapper>
        </RecordFinishHeader>
      ) : (
        <PlogHeader>
          <BackArrow className="noticeBackArrow" onClick={goBack} />
          <HeaderText>랭킹</HeaderText>
        </PlogHeader>
      )}

      <ShowRecordData
        recordId={userData.recordId}
        setModalOpen={setModalOpen}
        setImgOpen={setImgOpen}
        setImgEditOpen={setImgEditOpen}
        getImgUrl={getImgUrl}
        getData={getData}
      />

      {!userData.isShowPlog ? (
        <RecordFinishFooter>
          <Button
            onClick={() => {
              isCourse ? showModal() : showModal();
            }}
          >
            플로깅 종료하기
          </Button>
          <BorderGreenThinButton>공유하기</BorderGreenThinButton>
        </RecordFinishFooter>
      ) : (
        <PlogRecordFooter>
          <Button
          // onClick={() => {
          //   isCourse ? showModal() : showModal();
          // }}
          >
            공유하기
          </Button>
        </PlogRecordFooter>
      )}

      {/* <RecordFinishFooter setData={setModalOpen} data={modalData} /> */}
    </>
  );
}

export default RecordFinishPage;

const StRecordFinish = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
  padding-top: 12.7rem;
  padding-bottom: 20rem;
  padding-left: 2rem;
  padding-right: 2rem;

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

const RecordFinishHeader = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 12.7rem;

  display: grid;
  grid-template-columns: 8.8rem auto 1.4rem;

  align-items: center;

  padding-left: 2rem;
  padding-right: 2.5rem;

  background-color: ${COLOR.MAIN_WHITE};

  z-index: 500;

  span {
    font-style: normal;
    font-weight: 700;
    font-size: 2rem;
    line-height: 2.5rem;
    color: ${COLOR.MAIN_BLACK};
  }

  p {
    font-style: normal;
    font-weight: 500;
    font-size: 1.4rem;
    line-height: 1.7rem;
    color: ${COLOR.MAIN_GREEN};
  }

  .signupBackArrow {
    margin-top: 5rem;
    margin-left: 2rem;
  }
`;

const CloseWrapper = styled.div`
  .headerClose {
    width: 2.7rem;
    height: 2.7rem;
    color: ${COLOR.MAIN_BLACK};
  }
`;

const PlogHeader = styled.div`
  position: fixed;
  top: 0;
  width: 39.3rem;
  height: 11.8rem;
  background: ${COLOR.MAIN_WHITE};
  z-index: 100;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  padding: 0rem 2rem;
  gap: 2.4rem;

  .noticeBackArrow {
    /* margin-top: 40px;
    margin-left: 20px; */
  }
`;
const HeaderText = styled.div`
  font-family: "SUIT Variable";
  font-style: normal;
  font-weight: 700;
  font-size: 2rem;
  line-height: 2.5rem;
  color: ${COLOR.MAIN_BLACK};
`;

const RecordFinishFooter = styled.div`
  display: flex;
  position: fixed;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  bottom: 0;
  padding: 0rem 2rem 0.6rem 2rem;
  gap: 1.2rem;

  width: 100%;
  z-index: 500;
`;

const PlogRecordFooter = styled.div`
  display: flex;
  position: fixed;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  bottom: 0;
  padding: 0rem 2rem 2rem 2rem;
  gap: 1.2rem;

  width: 100%;
  z-index: 500;
`;
