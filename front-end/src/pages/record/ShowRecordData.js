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

const modalData = {
  recording: false,
  title: "오늘의 플로깅은 어떠셨나요?",
  btnText1: "닫기",
  btnText2: "내 포인트 확인",
};
function ShowRecordData({ recordId, setImgOpen, setImgEditOpen }) {
  const token = localStorage.getItem("key");

  /*point에서 현재 위치 값을 가져와 초기세팅 해줌 */
  //   const plogRecord = useLocation();
  //   const recordId = plogRecord.state.recordId;
  //   const [userData, setUserData] = useState({
  //     recordId: recordId,
  //   });

  const [isCourse, sestIsCourse] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [isPathLoading, setIsPathLoading] = useState(true);
  const [isImgLoading, setIsImgLoading] = useState(true);
  const [isImgData, setIsImgData] = useState(false);

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
        `${process.env.REACT_APP_API_ROOT}/api/plogging/${recordId}`,
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

  /* GET - Record path */

  const [pathData, setPathData] = useState([
    {
      lat: 0,
      lng: 0,
    },
  ]);

  async function getPathData() {
    // async, await을 사용하는 경우
    try {
      // GET 요청은 params에 실어 보냄
      const response = await axios.get(
        `${process.env.REACT_APP_API_ROOT}/api/plogging/${recordId}/paths/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("get경로: %o", response);
      const initPath = response.data.result.content.map((it) => {
        return {
          lat: it.wayLat,
          lng: it.wayLng,
        };
      });
      setPathData(initPath);
    } catch (e) {
      // 실패 시 처리
      console.error(e);
      alert("경로 get 실패. 재시도해주세요.");
    }
  }

  /* GET - Record Img */

  const [imgData, setImgData] = useState([
    {
      imageId: 0,
      recordId: 0,
      imgUrl: "",
      imgLat: 0,
      imgLng: 0,
    },
  ]);
  async function getImgData() {
    // async, await을 사용하는 경우
    try {
      // GET 요청은 params에 실어 보냄
      const response = await axios.get(
        `${process.env.REACT_APP_API_ROOT}/api/plogging/${recordId}/images/`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("get이미지: %o", response);
      const initImg = response.data.result.map((it) => {
        return {
          imageId: it.imageId,
          recordId: it.recordId,
          imgUrl: it.imgUrl,
          imgLat: it.imgLat,
          imgLng: it.imgLng,
        };
      });
      setImgData(initImg);
    } catch (e) {
      // 실패 시 처리
      console.error(e);
      setIsImgData(false);
      // alert("이미지 get 실패. 재시도해주세요.");
    }
  }

  const bounds = useMemo(() => {
    const bounds = new kakao.maps.LatLngBounds();

    pathData.forEach((point) => {
      bounds.extend(new kakao.maps.LatLng(point.lat, point.lng));
    });
    return bounds;
  }, [pathData]);

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

  const showImgModal = () => {
    setImgOpen(true);
  };

  const [clickEditImg, setClickEditImg] = useState("");

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
    getPathData();
    getImgData();
    console.log("기록가져오는 중");
  }, []);

  useEffect(() => {
    console.log("data기록가져옴");
    console.log("rlfhr: %o", thisRecordData.runningTime);

    setIsDataLoading(false);

    console.log("rlfhr: %o", thisRecordData);
  }, [thisRecordData]);

  useEffect(() => {
    console.log("path기록가져옴");

    console.log("1.경로: %o", pathData);
    // const map = mapRef.current;
    // if (map) map.setBounds(bounds);
    setIsPathLoading(false);
    console.log("2.경로: %o", pathData);
  }, [pathData]);

  useEffect(() => {
    console.log("img기록가져옴", recordId);
    console.log("이미지id: %o", imgData[0].recordId);

    if (imgData[0].recordId == recordId) {
      console.log("이미지 기록이 있다.");
      setIsImgData(true);
    }
    setIsImgLoading(false);
    console.log("이미지: %o", imgData);
  }, [imgData]);

  useEffect(() => {
    if (!isDataLoading && !isPathLoading) {
      const map = mapRef.current;
      if (map) {
        map.setBounds(bounds);
        setIsLoading(false);
      }
    }
  }, [thisRecordData, pathData]);

  return (
    <>
      <StRecordFinish>
        {/* {!isDataLoading && !isPathLoading && !isImgLoading && ( */}
        {!isLoading && (
          <>
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
                  {isImgData &&
                    imgData.map((value) => (
                      <EventMarkerContainer
                        key={`EventMarkerContainer-${value.recordId}-${value.imageId}`}
                        position={{ lat: value.imgLat, lng: value.imgLng }}
                        content={value.imgUrl}
                      />
                    ))}
                  <Polyline
                    path={pathData}
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
                    <span>{thisRecordData.distance.toFixed(2)}</span>
                    <p>걸은 킬로미터</p>
                  </DistDataContainer>
                  <CalorieDataContainer>
                    <span>{thisRecordData.kcal}</span>
                    <p>소모한 칼로리</p>
                  </CalorieDataContainer>
                  <PhotoCountDataContainer>
                    <span>{isImgData ? imgData.length : 0}</span>
                    <p>남긴 사진</p>
                  </PhotoCountDataContainer>
                </OtherDataContainer>
              </DetailDataContainer>
              {isImgData ? (
                <PhotoGridContainer>
                  {imgData.map((img) => (
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
              ) : (
                <NonePhotoWrapper>
                  <p>인증 사진이 없습니다.</p>
                </NonePhotoWrapper>
              )}
            </ContentsContainer>
          </>
        )}

        {/* <RecordFinishFooter setData={setModalOpen} data={modalData} /> */}
      </StRecordFinish>
    </>
  );
}

export default ShowRecordData;

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
