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

const modalData = {
  recording: false,
  title: "오늘의 플로깅은 어떠셨나요?",
  btnText1: "닫기",
  btnText2: "내 포인트 확인",
};
function RecordFinish() {
  const token = localStorage.getItem("key");

  /*point에서 현재 위치 값을 가져와 초기세팅 해줌 */
  const plogRecord = useLocation();
  const recordId = plogRecord.state.recordId;
  const [userData, setUserData] = useState({
    recordId: recordId,
  });

  const [isCourse, sestIsCourse] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const mapRef = useRef();

  const [points, setPoints] = useState([
    { lat: 33.452278, lng: 126.567803 },
    { lat: 33.452671, lng: 126.574792 },
    { lat: 33.451744, lng: 126.572441 },
  ]);

  /* GET -  */
  const [thisRecordData, setThisRecordData] = useState({
    distance: 0,
    startLat: 0,
    startLng: 0,
    endLat: 0,
    endLng: 0,
    runningTime: 0,
    kcal: 0,
  });

  async function getRecordData() {
    // async, await을 사용하는 경우
    try {
      // GET 요청은 params에 실어 보냄
      const response = await axios.get(
        `${process.env.REACT_APP_API_ROOT}/api/plogging/` + userData.recordId,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // 응답 결과(response)를 변수에 저장하거나.. 등 필요한 처리를 해 주면 된다.
      const recordData = {
        distance: response.data.result.distance,
        startLat: response.data.result.startLat,
        startLng: response.data.result.startLng,
        endLat: response.data.result.endLat,
        endLng: response.data.result.endLng,
        runningTime: response.data.result.runningTime,
        kcal: response.data.result.kcal,
      };

      setThisRecordData(recordData);
      console.log("get성공?:", thisRecordData);
    } catch (e) {
      // 실패 시 처리
      console.error(e);
      alert("기록 get 실패.");
    }
  }

  //   const bounds = useMemo(() => {
  //     const bounds = new kakao.maps.LatLngBounds();

  //     points.forEach(point => {
  //       bounds.extend(new kakao.maps.LatLng(point.lat, point.lng))
  //     });
  //     return bounds;
  //   }, [points])

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

  const EventMarkerContainer = ({ position, content }) => {
    const map = useMap();

    return (
      <MapMarker
        position={position} // 마커를 표시할 위치
        image={{
          src: PlogImg, // 마커이미지의 주소입니다
          size: {
            width: 24,
            height: 35,
          }, // 마커이미지의 크기입니다
        }}
        onClick={() => {
          setClickImg(content);
          showImgModal();
        }}
      ></MapMarker>
    );
  };

  useEffect(() => {
    getRecordData();
    console.log("기록가져오는 중");
  }, []);

  useEffect(() => {
    console.log("기록가져옴");
    console.log("rlfhr: %o", thisRecordData.runningTime);
    setIsLoading(false);
    console.log("rlfhr: %o", thisRecordData);
  }, [thisRecordData]);

  return (
    <>
      {modalOpen && (
        <RecordModal setModalOpen={setModalOpen} data={modalData} />
      )}
      {imgOpen && <RecordImgModal setImgOpen={setImgOpen} data={clickImg} />}
      {imgEditOpen && (
        <EditImgModal setImgOpen={setImgEditOpen} data={clickEditImg} />
      )}

      {(modalOpen || imgOpen || imgEditOpen) && <ModalBackground />}
      <StRecordFinish>
        {!isLoading && (
          <>
            <RecordFinishHeader>
              <span>
                {todayMonth}월 {todayDate}일
              </span>
              <p>개운산 숲 나들길</p>
              <CloseWrapper>
                <Close
                  className="headerClose"
                  onClick={() => {
                    isCourse ? showModal() : finish();
                  }}
                />
              </CloseWrapper>
            </RecordFinishHeader>
            {/* <RecordHeader /> */}
            <ContentsContainer>
              <MapContainer>
                <Map // 지도를 표시할 Container
                  id="MapWrapper"
                  center={{
                    // 지도의 중심좌표
                    lat: 37.61177884519635,
                    lng: 126.99642668902881,
                  }}
                  style={{
                    width: "100%",
                    height: "23.6rem",
                  }}
                  level={3} // 지도의 확대 레벨
                  zoomable={false}
                  draggable={false}
                  ref={mapRef}
                >
                  {dummyImg.recordImgData.map((value) => (
                    <EventMarkerContainer
                      key={`EventMarkerContainer-${value.recordId}-${value.imageId}`}
                      position={{ lat: value.imgLat, lng: value.imgLng }}
                      content={value.imgUrl}
                    />
                  ))}
                  <Polyline
                    path={[
                      { lat: 37.610265201223164, lng: 126.99707232277143 },
                      { lat: 37.61040935336232, lng: 126.99683447827957 },
                      { lat: 37.6106616386953, lng: 126.99716291281013 },
                      { lat: 37.61126530538697, lng: 126.99733277671196 },
                      { lat: 37.61154459907716, lng: 126.9968117784994 },
                      { lat: 37.61177884519635, lng: 126.99642668902881 },
                      { lat: 37.611959037372074, lng: 126.99624546610148 },
                      { lat: 37.61167068496873, lng: 126.99524880576455 },
                      { lat: 37.611391364679726, lng: 126.99492037510174 },
                      { lat: 37.611202149030625, lng: 126.99473917550203 },
                      { lat: 37.61098590653716, lng: 126.99462593326892 },
                    ]}
                    strokeWeight={6} // 선의 두께 입니다
                    strokeColor={"#DCFA5C"} // 선의 색깔입니다
                    strokeOpacity={1} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
                    strokeStyle={"solid"} // 선의 스타일입니다
                  />
                </Map>
              </MapContainer>
              <DetailDataContainer>
                <TimeDataContainer>
                  {/* <TimeConvert seconds={thisRecordData.runningTime} /> */}
                  {/* <span>{thisRecordData.runningTime}</span> */}
                  <span>{(thisRecordData.runningTime / 60).toFixed(2)}분</span>
                  <p>걸은 시간</p>
                </TimeDataContainer>
                <OtherDataContainer>
                  <DistDataContainer>
                    <span>{thisRecordData.distance}</span>
                    <p>걸은 킬로미터</p>
                  </DistDataContainer>
                  <CalorieDataContainer>
                    <span>{thisRecordData.kcal}</span>
                    <p>소모한 칼로리</p>
                  </CalorieDataContainer>
                  <PhotoCountDataContainer>
                    <span>4</span>
                    <p>남긴 사진</p>
                  </PhotoCountDataContainer>
                </OtherDataContainer>
              </DetailDataContainer>
              <PhotoGridContainer>
                {dummyImg.recordImgData.map((img) => (
                  <PhotoWrapper key={`${img.recordId}-${img.imageId}`}>
                    <img
                      src={img.imgUrl}
                      alt="img"
                      onClick={() => {
                        console.log(img.imgUrl);
                        setClickEditImg(img.imgUrl);
                        showEditImgModal();
                      }}
                    ></img>
                  </PhotoWrapper>
                ))}
              </PhotoGridContainer>
            </ContentsContainer>
          </>
        )}

        <RecordFinishFooter>
          <Button
            onClick={() => {
              isCourse ? showModal() : finish();
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

export default RecordFinish;

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
    font-style: normal;
    font-weight: 600;
    font-size: 2.4rem;
    line-height: 3rem;
    color: ${COLOR.MAIN_BLACK};
  }

  p {
    font-style: normal;
    font-weight: 500;
    font-size: 1.3rem;
    line-height: 1.6rem;
    color: ${COLOR.INPUT_BORDER_GRAY};
  }
`;

const TimeDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;
const OtherDataContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const DistDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;
const CalorieDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;
const PhotoCountDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
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
  z-index: 20rem;
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
