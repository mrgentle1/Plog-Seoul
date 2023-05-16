/* global kakao */
import React, { useCallback, useEffect, useState, useRef } from "react";
import moment from "moment";
import { useLocation } from "react-router-dom";
import { Map, MapMarker, Polyline } from "react-kakao-maps-sdk";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { COLOR } from "../../styles/color";
import TimeComponent from "../../components/Record/TimeComponent";
import current from "../../assets/icons/walk.svg";
import trashCanImg from "../../assets/icons/trash.svg";
import imgMarker from "../../assets/icons/imgMarker.svg";
import { ReactComponent as Close } from "../../assets/icons/close.svg";
import { ReactComponent as RelocateBtn } from "../../assets/icons/relocateInactivate.svg";
import { ReactComponent as RelocateAtiveBtn } from "../../assets/icons/relocateActivate.svg";
import {
  RecordModal,
  ModalBackground,
} from "../../components/common/RecordModal";
import { ReactComponent as CamBtn } from "../../assets/icons/camera.svg";
import MapRecording from "../../components/Record/MapRecordingComponent3";

import axios from "axios";

const { kakao } = window;
let options = {
  enableHighAccuracy: false,
  timeout: 1000 * 5 * 1, // 1 min (1000 ms * 60 sec * 1 minute = 60 000ms),
  maximumAge: 3600,
};
const modalData = {
  recording: true,
  title: "플로깅 기록을 종료할까요?",
  btnText1: "닫기",
  btnText2: "계속하기",
};

function RecordIngPage() {
  const token = localStorage.getItem("key");

  const navigate = useNavigate();
  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const [lastLocation, setLastLocation] = useState({ lat: 0, lng: 0 });
  const [allDist, setAllDist] = useState(0);
  const [runTime, setRunTime] = useState(0);

  /*main에서 현재 위치 값을 가져와 초기세팅 해줌 */
  const location = useLocation();
  const startLat = location.state.lat;
  const startLng = location.state.lng;

  /*사용자 이동 기록*/
  const [state, setState] = useState([
    {
      center: {
        lat: startLat,
        lng: startLng,
      },
      errMsg: null,
      isLoading: true,
    },
  ]);
  // 오늘 날짜
  let today = new Date();
  let todayMonth = today.getMonth() + 1;
  let todayDate = today.getDate();

  var now = moment();

  /* GET - 쓰레기통 위치 */
  const [trashCanData, setTrashCanData] = useState([
    { trashcanId: 0, title: "쓰레기통", latlng: { lat: 0, lng: 0 } },
  ]);

  async function getTrashCanData() {
    // async, await을 사용하는 경우
    try {
      // GET 요청은 params에 실어 보냄
      const response = await axios.get("http://3.37.14.183:80/api/trash-cans", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // 응답 결과(response)를 변수에 저장하거나.. 등 필요한 처리를 해 주면 된다.
      const initTrash = response.data.result.map((it) => {
        return {
          trashCanId: it.trashCanId,
          title: it.address,
          latlng: { lat: it.lat, lng: it.lng },
        };
      });
      setTrashCanData(initTrash);
    } catch (e) {
      // 실패 시 처리
      console.error(e);
    }
  }

  /* POST - init Record data */
  const [recordUserData, setRecordUserData] = useState([
    {
      userId: 0,
      recordId: 0,
    },
  ]);
  async function postRecordData() {
    // async, await을 사용하는 경우
    try {
      // GET 요청은 params에 실어 보냄
      const response = await axios.post(
        "http://3.37.14.183:80/api/plogging",
        {
          distance: 0,
          startLat: startLat,
          startLng: startLng,
          endLat: 0,
          endLng: 0,
          runningTime: 0,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // 응답 결과(response)를 변수에 저장하거나.. 등 필요한 처리를 해 주면 된다.
      const initRecord = response.data.result.map((it) => {
        return {
          userId: it.userId,

          recordId: it.recordId,
        };
      });
      setRecordUserData(initRecord);
    } catch (e) {
      // 실패 시 처리
      console.error(e);
      alert("기록 시작 실패. 재시도해주세요.");
    }
  }

  /* PATCH - Record data */

  async function patchRecordData() {
    // async, await을 사용하는 경우
    try {
      // GET 요청은 params에 실어 보냄
      const response = await axios.patch(
        "http://3.37.14.183:80/api/plogging/" + recordUserData.recordId,
        {
          distance: allDist,
          endLat: lastLocation.lat,
          endLng: lastLocation.lng,
          runningTime: runTime,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // 응답 결과(response)를 변수에 저장하거나.. 등 필요한 처리를 해 주면 된다.
      // const initRecord = response.data.result.map((it) => {
      //   return {
      //     userId: it.userId,
      //     userName: it.userName,
      //     recordId: it.recordId,
      //     distance: it.distance,
      //     startLat: it.startLat,
      //     startLng: it.startLng,
      //     endLat: it.endLat,
      //     endLng: it.endLng,
      //     runningTime: it.runningTime,
      //   };
      // });
      // setRecordData(initRecord);
      navigate("/record/point", {
        state: {
          recordId: `${recordUserData.recordId}`,
          userId: `${recordUserData.userId}`,
        },
      });
    } catch (e) {
      // 실패 시 처리
      console.error(e);
      alert("기록 저장 실패.");
    }
  }

  /* POST - Record Img */
  /*
  const [imgData, setImgData] = useState([
    {
      img:""
    },
  ]);
  async function postImgData() {
    // async, await을 사용하는 경우
    try {
      // GET 요청은 params에 실어 보냄
      const response = await axios.post(
        "http://3.37.14.183:80/api/plogging",
        {
          distance: 0,
          startLat: startLat,
          startLng: startLng,
          endLat: 0,
          endLng: 0,
          runningTime: 0,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // 응답 결과(response)를 변수에 저장하거나.. 등 필요한 처리를 해 주면 된다.
      const initRecord = response.data.result.map((it) => {
        return {
          userId: it.userId,
          userName: it.userName,
          recordId: it.recordId,
          distance: it.distance,
          startLat: it.startLat,
          startLng: it.startLng,
          endLat: it.endLat,
          endLng: it.endLng,
          runningTime: it.runningTime,
        };
      });
      setRecordData(initRecord);
    } catch (e) {
      // 실패 시 처리
      console.error(e);
      alert("기록 시작 실패. 재시도해주세요.");
    }
  }
  */

  /*polyline path를 위함 */
  const [locationList, setLocationList] = useState([
    {
      center: {
        lat: startLat,
        lng: startLng,
      },
    },
  ]);
  const beforeRecord = useRef({ lat: startLat, lng: startLng });
  const [watchId, setWatchId] = useState(-1); // watchPosition 중지를 위함

  const [recording, setRecording] = useState(false); //기록 중
  const [isMove, setIsMove] = useState(false);
  const mapRef = useRef();

  const handleRelocate = () => {
    //지도 중심좌표 이동
    const map = mapRef.current;
    if (map)
      map.setCenter(
        new kakao.maps.LatLng(
          state[state.length - 1].center.lat,
          state[state.length - 1].center.lng
        )
      );
  };

  useEffect(() => {
    getTrashCanData(); //쓰레기통 위치 정보

    run();
    setInterv(setInterval(run, 10));
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      // let before_record = state[state.length - 1];
      // console.log("bef: %o", before_record);
      const newId = navigator.geolocation.watchPosition(
        (position) => {
          console.log("watchPosition: %o", position);
          console.log("startlat: %o", startLat);
          console.log("startlng: %o", startLng);

          console.log("befor: %o", beforeRecord.current);

          const coordinates = [
            new kakao.maps.LatLng(
              beforeRecord.current.lat,
              beforeRecord.current.lng
            ),
            new kakao.maps.LatLng(
              position.coords.latitude,
              position.coords.longitude
            ),
          ];

          const linePatha = new kakao.maps.Polyline({
            path: coordinates,
          });

          const distDiff = linePatha.getLength();
          console.log("이동거리:", distDiff.toFixed(2), "m");

          console.log("location: %o", locationList);
          if (distDiff !== 0 && distDiff < 800) {
            console.log("이동함");
            setState((prev) => [
              ...prev,
              {
                center: {
                  lat: position.coords.latitude, // 위도
                  lng: position.coords.longitude, // 경도
                },
                isLoading: false,
              },
            ]);

            setLocationList((prev) => [
              ...prev,
              {
                lat: position.coords.latitude, // 위도
                lng: position.coords.longitude,
              },
            ]);
            setLastLocation({
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude,
            });
            setAllDist(allDist + distDiff);
            console.log("listlocation: %o", locationList);
          }
        },
        (err) => {
          console.log(err);
          console.log("err");
        },
        options
      );
      setWatchId(newId);
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      setState((prev) => ({
        ...prev,
        errMsg: "geolocation을 사용할수 없어요..",
        isLoading: false,
      }));
    }
  }, []);

  //   이동 시간 표시
  const [time, setTime] = useState({ ms: 0, s: 0, m: 0, h: 0 });
  const [interv, setInterv] = useState();

  var updatedMs = time.ms,
    updatedS = time.s,
    updatedM = time.m,
    updatedH = time.h;

  const run = () => {
    if (updatedM === 60) {
      updatedH++;
      updatedM = 0;
    }
    if (updatedS === 60) {
      updatedM++;
      updatedS = 0;
    }
    if (updatedMs === 100) {
      updatedS++;
      updatedMs = 0;
    }
    updatedMs++;
    return setTime({ ms: updatedMs, s: updatedS, m: updatedM, h: updatedH });
  };

  const recordStopHandler = async (e) => {
    e.preventDefault();
    try {
      if (watchId !== -1) {
        navigator.geolocation.clearWatch(watchId);
        setWatchId(-1);
        //const finDist = getFinDist(locationList);
        let finish = 1;
        // if (locationList.length < 3 || finDist > 0.2) {
        //   finish = 0;
        // }
        console.log("기록 종료 버튼 클릭");
        if (finish === 0) {
          alert(
            "정상적인 종료 조건이 아닙니다.(3곳 이상 방문, 시작점, 마지막점 200m이내)"
          );
        }

        // setRecordcode(-1);
        // setReadyRecord(true);
        setRecording(false);
        navigate("/record/point", { state: { recordUserData } });
      }
    } catch (err) {
      alert(err.message);
    }

    clearInterval(interv);
  };
  // console.log(state);
  // console.log("ff");
  //   console.log("path: %o", locationList);

  const [modalOpen, setModalOpen] = useState(false);
  const showModal = () => {
    setModalOpen(true);
  };

  return (
    <>
      {modalOpen && (
        <RecordModal setModalOpen={setModalOpen} data={modalData} />
      )}
      {modalOpen && <ModalBackground />}
      <StRecordIngPage>
        <SignupHeader>
          <span>
            {todayMonth}월 {todayDate}일
          </span>
          <p></p>
          <CloseWrapper>
            <Close
              className="headerClose"
              onClick={() => {
                showModal();
              }}
            />
          </CloseWrapper>
        </SignupHeader>
        <MapContainer>
          <Map
            center={state[state.length - 1].center} // 지도의 중심 좌표
            style={{ width: "100%", height: "100%" }} // 지도 크기
            level={2} // 지도 확대 레벨
            isPanto={true}
            onDragEnd={() => setIsMove(true)}
            ref={mapRef}
          >
            {!state.isLoading && (
              <div>
                <MapMarker // 마커를 생성합니다
                  position={
                    // 마커가 표시될 위치입니다
                    state[state.length - 1].center
                  }
                  image={{
                    src: current, // 마커이미지의 주소입니다
                    size: {
                      width: 64,
                      height: 69,
                    }, // 마커이미지의 크기입니다
                    options: {
                      offset: {
                        x: 27,
                        y: 69,
                      }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
                    },
                  }}
                />
                {trashCanData.map((position, index) => (
                  <MapMarker
                    key={`${position.trashCanId}-${position.title}`}
                    position={{
                      lat: position.latlng.lat,
                      lng: position.latlng.lng,
                    }} // 마커를 표시할 위치
                    image={{
                      src: trashCanImg, // 마커이미지의 주소입니다
                      size: {
                        width: 64,
                        height: 64,
                      }, // 마커이미지의 크기입니다
                    }}
                    title={position.title} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                  />
                ))}
                <Polyline
                  path={locationList}
                  strokeWeight={5} // 선의 두께 입니다
                  strokeColor={"#FFAE00"} // 선의 색깔입니다
                  strokeOpacity={0.7} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
                  strokeStyle={"solid"} // 선의 스타일입니다
                />
              </div>
            )}
          </Map>
          {/* Reloacate-지도 이동 확인 O -> activate Btn */}
          <RelocateWrapper>
            {isMove ? (
              <RelocateBtn
                onClick={() => {
                  handleRelocate();
                  setIsMove(false);
                }}
              />
            ) : (
              <RelocateAtiveBtn
                onClick={() => {
                  // handleRelocate();
                }}
              />
            )}
          </RelocateWrapper>
        </MapContainer>
        <RecordDetailContainer>
          <StopWatchContainer>
            <TimeComponent time={time} />
          </StopWatchContainer>
          <RecordDetailTxt>
            플로깅 사진을 함께 인증 기록으로 남겨요!
          </RecordDetailTxt>
          <RecordBtnContainer>
            <RecordCamBtnWrapper>
              <CamBtn />
            </RecordCamBtnWrapper>
            <RecordFinishBtn onClick={recordStopHandler}>
              <p>완료하기</p>
            </RecordFinishBtn>
          </RecordBtnContainer>
        </RecordDetailContainer>
      </StRecordIngPage>
    </>
  );
}

export default RecordIngPage;

const StRecordIngPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-top: 127px;
  padding-bottom: 200px;
`;
const SignupHeader = styled.div`
  position: fixed;
  top: 0;
  width: 393px;
  height: 127px;

  display: grid;
  grid-template-columns: 88px auto 14px;

  align-items: center;

  padding-left: 20px;
  padding-right: 25px;

  background-color: ${COLOR.MAIN_WHITE};

  z-index: 100;

  span {
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 25px;
    color: ${COLOR.MAIN_BLACK};
  }

  p {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: ${COLOR.MAIN_GREEN};
  }
`;

const CloseWrapper = styled.div`
  .headerClose {
    width: 27px;
    height: 27px;
    color: ${COLOR.MAIN_BLACK};
  }
`;

const MapContainer = styled.div`
  display: flex;
  position: relative;
  overflow: hidden;

  width: 100%;
  height: 100%;

  & > .MapWrapper {
    position: relative;
    overflow: hidden;
  }
  .startBtn {
    margin-top: 28px;
  }
`;

const RelocateWrapper = styled.div`
  display: flex;
  position: absolute;
  overflow: hidden;
  top: 10px;
  right: 10px;

  z-index: 10;
`;

const RecordDetailContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 393px;
  height: 200px;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  z-index: 100;
  padding-top: 10px;
`;

const StopWatchContainer = styled.div`
  display: flex;
`;

const RecordDetailTxt = styled.p`
  display: flex;

  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 16px;

  color: ${COLOR.DARK_GRAY};
`;

const RecordBtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  width: 100%;
  height: 40%;
`;

const RecordCamBtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px;
`;

const RecordFinishBtn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;

  width: 281px;
  height: 60px;

  background: ${COLOR.MAIN_GREEN};
  border-radius: 14px;

  p {
    font-style: normal;
    font-weight: 600;
    font-size: 15px;
    line-height: 19px;
    text-align: center;

    color: ${COLOR.MAIN_BLACK};
  }
`;
