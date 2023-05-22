/* global kakao */
import { useEffect, useState, useRef, useMemo } from "react";
import { Map, MapMarker, Polyline, useMap } from "react-kakao-maps-sdk";
import { Button, BorderGreenThinButton } from "../../components/common/Button";
import styled from "styled-components";
import { COLOR } from "../../styles/color";
import { ReactComponent as Close } from "../../assets/icons/close.svg";
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
  const [userData, setUserData] = useState({
    recordId: recordId,
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
  const [clickImg, setClickImg] = useState("");
  const [imgOpen, setImgOpen] = useState(false);
  const showImgModal = () => {
    setImgOpen(true);
  };

  const [clickEditImg, setClickEditImg] = useState("");
  const [imgEditOpen, setImgEditOpen] = useState(false);
  const showEditImgModal = () => {
    setImgEditOpen(true);
  };

  const getImgUrl = (url) => {
    setClickEditImg(url);
  };

  return (
    <>
      {modalOpen && (
        <RecordModal setModalOpen={setModalOpen} data={modalData} />
      )}
      {imgOpen && <RecordImgModal setImgOpen={setImgOpen} data={clickImg} />}
      {imgEditOpen && (
        <EditImgModal setImgEditOpen={setImgEditOpen} data={clickEditImg} />
      )}

      {(modalOpen || imgOpen || imgEditOpen) && <ModalBackground />}
      <RecordFinishHeader>
        <span>
          {todayMonth}월 {todayDate}일
        </span>
        <p>개운산 숲 나들길</p>
        <CloseWrapper>
          <Close
            className="headerClose"
            onClick={() => {
              isCourse ? showModal() : showModal();
            }}
          />
        </CloseWrapper>
      </RecordFinishHeader>
      <ShowRecordData
        recordId={userData.recordId}
        setModalOpen={setModalOpen}
        setImgOpen={setImgOpen}
        setImgEditOpen={setImgEditOpen}
        getImgUrl={getImgUrl}
      />
      <StRecordFinish>
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
        {/* <RecordFinishFooter setData={setModalOpen} data={modalData} /> */}
      </StRecordFinish>
    </>
  );
}

export default RecordFinishPage;

const StRecordFinish = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 39.3rem;
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
  width: 39.3rem;
  height: 12.7rem;

  display: grid;
  grid-template-columns: 8.8rem auto 1.4rem;

  align-items: center;

  padding-left: 2rem;
  padding-right: 2.5rem;

  background-color: ${COLOR.MAIN_WHITE};

  z-index: 100;

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

const ContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  width: 100%;

  padding-bottom: 12.2rem;

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

const MapContainer = styled.div`
  display: flex;
  position: relative;
  overflow: hidden;

  width: 100%;
  height: 23.6rem;
  border-radius: 1.4rem;

  & > .MapWrapper {
    position: relative;
    overflow: hidden;
  }
`;
const DetailDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  width: 100%;

  padding-top: 2.4rem;
  padding-bottom: 2.4rem;

  span {
    font-family: "SUIT Variable";
    font-style: normal;
    font-weight: 600;
    font-size: 2.4rem;
    line-height: 3rem;
    color: ${COLOR.MAIN_BLACK};
  }

  p {
    font-family: "SUIT Variable";
    font-style: normal;
    font-weight: 500;
    font-size: 1.3rem;
    line-height: 1.6rem;
    color: ${COLOR.INPUT_BORDER_GRAY};
  }
`;

const sharedDataContainerStyle = `display: flex;
flex-direction: column;
gap: 0.6rem;`;

const TimeDataContainer = styled.div`
  ${sharedDataContainerStyle}
`;
const OtherDataContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const DistDataContainer = styled.div`
  ${sharedDataContainerStyle}
`;
const CalorieDataContainer = styled.div`
  ${sharedDataContainerStyle}
`;
const PhotoCountDataContainer = styled.div`
  ${sharedDataContainerStyle}
`;

const PhotoGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;

  padding-top: 2rem;
  gap: 0.8rem;

  border-top: 0.1rem solid ${COLOR.MAIN_GREEN};
`;

const PhotoWrapper = styled.div`
  img {
    width: 10.9rem;
    height: 10.9rem;
    object-fit: cover;
  }
`;

const NonePhotoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 20rem;

  p {
    font-family: "SUIT Variable";
    font-style: normal;
    font-weight: 500;
    font-size: 1.3rem;
    line-height: 1.6rem;
    color: ${COLOR.INPUT_BORDER_GRAY};
  }
`;
const RecordFinishFooter = styled.div`
  display: flex;
  position: fixed;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  bottom: 0;
  padding: 0rem 0.6rem 2rem 2rem;
  gap: 1.2rem;

  width: 39.3rem;
  z-index: 2000;
`;

const PlogFinishBtnWrapper = styled.div`
  display: flex;
  font-style: normal;
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 1.9rem;

  text-align: center;
  color: ${COLOR.MAIN_BLACK};
`;

const PlogShareBtnWrapper = styled.div`
  display: flex;
  font-style: normal;
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 1.9rem;
  text-align: center;
`;
