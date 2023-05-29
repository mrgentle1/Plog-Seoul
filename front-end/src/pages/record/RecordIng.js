/* global kakao */
import React, { useCallback, useEffect, useState, useRef } from "react";
import moment from "moment";
import { useLocation } from "react-router-dom";
import { Map, MapMarker, Polyline, useMap } from "react-kakao-maps-sdk";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { COLOR } from "../../styles/color";
import { TimeComponent } from "../../components/Record/TimeComponent";
import current from "../../assets/icons/walk.svg";
import trashCanImg from "../../assets/icons/trash.svg";
import PlogImg from "../../assets/icons/imgMarker.svg";
import { ReactComponent as Close } from "../../assets/icons/close.svg";
import { ReactComponent as RelocateBtn } from "../../assets/icons/relocateInactivate.svg";
import { ReactComponent as RelocateAtiveBtn } from "../../assets/icons/relocateActivate.svg";
import { ReactComponent as TrashCanAtiveBtn } from "../../assets/icons/trashCanActivate.svg";
import { ReactComponent as TrashCanBtn } from "../../assets/icons/trash.svg";
import {
  RecordModal,
  ModalBackground,
} from "../../components/common/RecordModal";
import { ReactComponent as CamBtn } from "../../assets/icons/camera.svg";

import axios from "axios";
import { RecordImgModal } from "../../components/Record/ImgModal";

const { kakao } = window;
let options = {
  enableHighAccuracy: true,
  timeout: 1000 * 5 * 1, // 1 min (1000 ms * 60 sec * 1 minute = 60 000ms),
  maximumAge: 0,
};
const modalData = {
  recording: true,
  title: "플로깅 기록을 종료할까요?",
  contents: "지금 종료하면\n오늘의 플로깅 기록이 사라져요",
  btnText1: "종료하기",
  btnText2: "계속하기",
};
const notMoreThanData = {
  recording: true,
  title: "플로깅 기록을 종료할까요?",
  contents: "1분 미만 기록은\n저장되지 않아요",
  btnText1: "종료하기",
  btnText2: "계속하기",
};

function RecordIngPage() {
  const token = localStorage.getItem("key");

  const navigate = useNavigate();
  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  // const [lastLocation, setLastLocation] = useState({ lat: 0, lng: 0 });
  // const [allDist, setAllDist] = useState(0);

  /*main에서 현재 위치 값을 가져와 초기세팅 해줌 */
  const location = useLocation();
  const startLat = location.state.lat;
  const startLng = location.state.lng;

  /*사용자 이동 기록*/
  const [state, setState] = useState({
    level: 2,
    center: {
      lat: startLat,
      lng: startLng,
    },
  });

  /*polyline path를 위함 */
  const [locationList, setLocationList] = useState([
    {
      lat: startLat,
      lng: startLng,
    },
  ]);

  // 오늘 날짜
  let today = new Date();
  let todayMonth = today.getMonth() + 1;
  let todayDate = today.getDate();

  /* GET - 쓰레기통 위치 */
  const [trashCanData, setTrashCanData] = useState([
    { trashcanId: 0, title: "쓰레기통", latlng: { lat: 0, lng: 0 } },
  ]);

  async function getTrashCanData() {
    // async, await을 사용하는 경우
    try {
      // GET 요청은 params에 실어 보냄
      const response = await axios.get(
        `${process.env.REACT_APP_API_ROOT}/api/trash-cans`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

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
  const [recordUserData, setRecordUserData] = useState({
    userId: 0,
    recordId: 0,
  });
  async function postRecordData() {
    // async, await을 사용하는 경우
    try {
      // GET 요청은 params에 실어 보냄
      const response = await axios.post(
        `${process.env.REACT_APP_API_ROOT}/api/plogging`,
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
      const initRecord = {
        userId: response.data.result.userId,
        recordId: response.data.result.recordId,
      };
      setRecordUserData(initRecord);
    } catch (e) {
      // 실패 시 처리
      console.error(e);
      alert("기록 시작 실패. 재시도해주세요.");
    }
  }

  /* DELETE - DELETE Record data */

  async function deleteRecordData() {
    // async, await을 사용하는 경우
    try {
      // GET 요청은 params에 실어 보냄
      const response = await axios.delete(
        `${process.env.REACT_APP_API_ROOT}/api/plogging/${recordUserData.recordId}/`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // 응답 결과(response)를 변수에 저장하거나.. 등 필요한 처리를 해 주면 된다.
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
      const response = await axios.patch(
        `${process.env.REACT_APP_API_ROOT}/api/plogging/${recordUserData.recordId}/`,
        {
          distance: distAll.current / 1000,
          endLat: locationList[locationList.length - 1].lat,
          endLng: locationList[locationList.length - 1].lng,
          runningTime: time.all,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // navigate("/record/point", {
      //   state: {
      //     recordId: `${recordUserData.recordId}`,
      //     userId: `${recordUserData.userId}`,
      //   },
      // });
    } catch (e) {
      // 실패 시 처리
      console.error(e);
      deleteRecordData();
      alert("기록 저장 실패.");
    }
  }

  /* POST - Record Img */
  const [imageUrl, setImageUrl] = useState("");

  // Define the callback function
  window.receiveImageURL = function (url) {
    imgUrlLoading.current = true;
    setImageUrl(url);
  };

  /* POST - Record Img */

  const [imgData, setImgData] = useState([]);
  async function postImgData() {
    // async, await을 사용하는 경우
    const sendImgData = {
      imageUrl: imageUrl,
      imgLat: locationList[locationList.length - 1].lat,
      imgLng: locationList[locationList.length - 1].lng,
    };
    try {
      // GET 요청은 params에 실어 보냄
      const response = await axios.post(
        `${process.env.REACT_APP_API_ROOT}/api/plogging/${recordUserData.recordId}/images/`,
        sendImgData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setImgData([...imgData, sendImgData]);
    } catch (e) {
      // 실패 시 처리
      console.error(e);
      alert("이미지 업로드 실패. 재시도해주세요.");
    }
  }

  /* POST - Record path */

  async function postPathData() {
    // async, await을 사용하는 경우

    try {
      // GET 요청은 params에 실어 보냄
      const response = await axios.post(
        `${process.env.REACT_APP_API_ROOT}/api/plogging/${recordUserData.recordId}/paths/`,
        locationList,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (e) {
      // 실패 시 처리
      console.error(e);
      alert("경로 업로드 실패. 재시도해주세요.");
    }
  }

  const beforeRecord = useRef({ lat: startLat, lng: startLng });
  const [watchId, setWatchId] = useState(-1); // watchPosition 중지를 위함

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const distAll = useRef(0);
  const imgUrlLoading = useRef(false);
  // const [runTime, setRunTime] = useState(0);
  const [recording, setRecording] = useState(false); //기록 중
  const [isMove, setIsMove] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isShowCan, setIsShowCan] = useState(false);
  const [level, setLevel] = useState(3);
  const mapRef = useRef();

  const start = () => {
    run();
    setInterv(setInterval(run, 1000));
  };

  const handleRelocate = () => {
    //지도 중심좌표 이동
    const map = mapRef.current;
    if (map) {
      map.setCenter(
        new kakao.maps.LatLng(
          locationList[locationList.length - 1].lat,
          locationList[locationList.length - 1].lng
        )
      );
      // map.setLevel(2);
      // setState({
      //   center: {
      //     lat: locationList[locationList.length - 1].la,
      //     lng: locationList[locationList.length - 1].lng,
      //   },
      // });
    }
  };

  useEffect(() => {}, [locationList]);

  const recordPosition = () => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다

      const newId = navigator.geolocation.watchPosition(
        success,
        showError,
        options
      );
      setWatchId(newId);
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      // setState((prev) => ({
      //   ...prev,
      //   errMsg: "geolocation을 사용할수 없어요..",
      //   isLoading: false,
      // }));
      alert("geolocation을 사용할수 없어요");
    }
  };

  const recordCurrentPositon = () => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition((position) => {
        return {
          lat: position.coords.latitude, // 위도
          lng: position.coords.longitude, // 경도
        };
      }, showError);
    } else {
      // setState((prev) => ({
      //   ...prev,
      //   errMsg: "geolocation을 사용할수 없어요..",
      //   isLoading: false,
      // }));
      alert("geolocation을 사용할수 없어요");
    }
  };

  const success = (position) => {
    const coordinates = [
      new kakao.maps.LatLng(beforeRecord.current.lat, beforeRecord.current.lng),
      new kakao.maps.LatLng(
        position.coords.latitude,
        position.coords.longitude
      ),
    ];

    const linePath = new kakao.maps.Polyline({
      path: coordinates,
    });

    const distDiff = linePath.getLength();

    if (distDiff !== 0 && position.coords.accuracy < 20 && distDiff < 800) {
      beforeRecord.current = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      distAll.current = distAll.current + distDiff;
      setLocationList((prev) => [
        ...prev,
        {
          lat: position.coords.latitude, // 위도
          lng: position.coords.longitude,
        },
      ]);
    }
  };

  const showError = (err) => {
    switch (err.code) {
      case err.PERMISSION_DENIED:
        setErrorMessage(
          "이 문장은 사용자가 Geolocation API의 사용 요청을 거부했을 때 나타납니다!"
        );
        break;
      case err.POSITION_UNAVAILABLE:
        setErrorMessage(
          "이 문장은 가져온 위치 정보를 사용할 수 없을 때 나타납니다!"
        );
        break;
      case err.TIMEOUT:
        setErrorMessage(
          "이 문장은 위치 정보를 가져오기 위한 요청이 허용 시간을 초과했을 때 나타납니다!"
        );
        break;
      case err.UNKNOWN_ERROR:
        setErrorMessage("이 문장은 알 수 없는 오류가 발생했을 때 나타납니다!");
        break;
      default:
        setErrorMessage("알 수 없는 오류가 발생했습니다.");
        break;
    }
  };

  useEffect(() => {
    postRecordData();
    getTrashCanData(); //쓰레기통 위치 정보
    start(); // 타이머 시작
    recordPosition();
  }, []);

  //   이동 시간 표시
  const [time, setTime] = useState({ s: 0, m: 0, h: 0, all: 0 });
  const [interv, setInterv] = useState();

  var updatedS = time.s,
    updatedM = time.m,
    updatedH = time.h,
    updatedTime = time.all;

  const run = () => {
    if (updatedM === 59) {
      updatedH++;
      updatedM = 0;
    }
    if (updatedS === 59) {
      updatedM++;
      updatedS = 0;
    }
    updatedS++;
    updatedTime++;
    return setTime({ s: updatedS, m: updatedM, h: updatedH, all: updatedTime });
  };

  const recordStopHandler = async (e) => {
    e.preventDefault();
    try {
      if (watchId !== -1) {
        navigator.geolocation.clearWatch(watchId);
        setWatchId(-1);

        setRecording(false);
        patchRecordData();
        postPathData();
        navigate("/record/point", {
          state: {
            recordId: `${recordUserData.recordId}`,
            userId: `${recordUserData.userId}`,
          },
        });
      }
    } catch (err) {
      alert(err.message);
    }

    clearInterval(interv);
  };

  useEffect(() => {
    if (time.all > 59) {
      setIsActive(true);
    }
  }, [time]);

  // useEffect(() => {
  //   if (imgUrlLoading) {
  //     const { lat, lng } = recordCurrentPositon();
  //     const newData = { img: imageUrl, imgLat: lat, imgLng: lng };
  //     setImgData([...imgData, newData]);
  //   }
  // }, [imageUrl]);

  useEffect(() => {
    if (!isMove) {
      setState({
        level: 2,
        center: {
          lat: locationList[locationList.length - 1].lat,
          lng: locationList[locationList.length - 1].lng,
        },
      });
    }
  }, [locationList]);

  useEffect(() => {
    if (imgUrlLoading.current) {
      console.log("변경된 이미지: ", imageUrl);
      postImgData();
    }
  }, [imageUrl]);

  const [markerSize, setMarkerSize] = useState({ width: 64, height: 64 });
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    console.log(level);
    // if (level < 4) {
    //   setMarkerSize({ width: 64, height: 64 });
    // } else if (level < 7) {
    //   setMarkerSize({ width: 32, height: 32 });
    // } else {
    //   setMarkerSize({ width: 8, height: 8 });
    // }

    if (level > 5) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  }, [level]);

  const EventTrashCanContainer = ({ position, mSize, title }) => {
    // console.log("현사이즈", mSize);
    // console.log("사이즈", markerSize);
    const map = useMap();

    // if (0 < mapLevel && mapLevel < 4) {
    //   setMarkerSize({ width: 64, height: 64 });
    //   // } else if (3 < mapLevel && mapLevel < 6) {
    //   //   markerSize = { width: 32, height: 32 };
    //   // } else if (5 < mapLevel && mapLevel < 15) {
    //   //   markerSize = { width: 16, height: 16 };
    // } else {
    //   setMarkerSize({ width: 32, height: 32 });
    // }

    return (
      <MapMarker
        position={position} // 마커를 표시할 위치
        image={{
          src: trashCanImg, // 마커이미지의 주소입니다
          size: { markerSize }, // 마커이미지의 크기입니다
        }}
        title={title} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
      ></MapMarker>
    );
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

  const [modalOpen, setModalOpen] = useState(false);
  const [isMoreThan, setIsMoreThan] = useState(false);
  const showModal = () => {
    setModalOpen(true);
  };
  const [clickImg, setClickImg] = useState("");
  const [imgOpen, setImgOpen] = useState(false);
  const showImgModal = () => {
    setImgOpen(true);
  };

  // Define the callback function
  window.receiveBackPressed = function (backPressed) {
    setModalOpen(backPressed);
  };

  useEffect(() => {}, [modalOpen]);
  // Define the callback function
  window.receiveRecordingExit = function (realExit) {
    setModalOpen(realExit);
    deleteRecordData();
    navigate("/record", { replace: true });
  };

  return (
    <>
      {modalOpen &&
        (isMoreThan ? (
          <RecordModal
            setModalOpen={setModalOpen}
            data={modalData}
            id={recordUserData.recordId}
          />
        ) : (
          <RecordModal
            setModalOpen={setModalOpen}
            data={notMoreThanData}
            id={recordUserData.recordId}
          />
        ))}
      {imgOpen && <RecordImgModal setImgOpen={setImgOpen} data={clickImg} />}
      {(modalOpen || imgOpen) && <ModalBackground />}
      <StRecordIngPage>
        <RecordIngHeader>
          <span>
            {todayMonth}월 {todayDate}일
          </span>
          <p></p>
          <CloseWrapper>
            <Close
              className="headerClose"
              onClick={() => {
                setIsMoreThan(true);
                showModal();
              }}
            />
          </CloseWrapper>
        </RecordIngHeader>
        <MapContainer>
          <Map
            center={state.center} // 지도의 중심 좌표
            style={{ width: "100%", height: "100%" }} // 지도 크기
            level={2} // 지도 확대 레벨
            isPanto={true}
            onDragEnd={() => setIsMove(true)}
            onZoomChanged={(map) => setLevel(map.getLevel())}
            ref={mapRef}
            onCenterChanged={(map) =>
              setState({
                level: map.getLevel(),
                center: {
                  lat: map.getCenter().getLat(),
                  lng: map.getCenter().getLng(),
                },
              })
            }
          >
            <div>
              <MapMarker // 마커를 생성합니다
                position={
                  // 마커가 표시될 위치입니다

                  locationList[locationList.length - 1]
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
              {isShowCan &&
                isVisible &&
                trashCanData.map((position) => (
                  <EventTrashCanContainer
                    key={`${position.trashCanId}-${position.title}`}
                    position={{
                      lat: position.latlng.lat,
                      lng: position.latlng.lng,
                    }} // 마커를 표시할 위치
                    mSize={markerSize}
                    title={position.title} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                  />
                ))}
              {imgData.map((value) => (
                <EventMarkerContainer
                  key={`EventMarkerContainer-${value.imageUrl}`}
                  position={{ lat: value.imgLat, lng: value.imgLng }}
                  content={value.imageUrl}
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
          </Map>
          {/* Reloacate-지도 이동 확인 O -> activate Btn */}
          <RelocateWrapper>
            {isMove ? (
              <RelocateBtn
                onClick={() => {
                  setIsMove(false);
                  handleRelocate();
                }}
              />
            ) : (
              <RelocateAtiveBtn
                onClick={() => {
                  // handleRelocate();
                  // setIsMove(true);
                }}
              />
            )}
          </RelocateWrapper>
          <ShowTrashCanWrapper>
            {isShowCan ? (
              <TrashCanAtiveBtn
                onClick={() => {
                  setIsShowCan(false);
                }}
              />
            ) : (
              <TrashCanBtn
                onClick={() => {
                  setIsShowCan(true);
                }}
              />
            )}
          </ShowTrashCanWrapper>
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
              <CamBtn onClick={() => window.Android?.openCamera()} />
            </RecordCamBtnWrapper>
            {isActive ? (
              <RecordFinishBtn
                onClick={recordStopHandler}
                bgColor={COLOR.MAIN_GREEN}
                color={COLOR.MAIN_BLACK}
              >
                <p>완료하기</p>
              </RecordFinishBtn>
            ) : (
              <DisabledFinishButton
                onClick={() => {
                  setIsMoreThan(false);
                  showModal();
                }}
                bgColor={COLOR.LIGHT_GRAY}
                color={COLOR.DARK_GRAY}
              >
                <p>완료하기</p>
              </DisabledFinishButton>
            )}
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
  padding-top: 12.7rem;
  padding-bottom: 20rem;
`;
const RecordIngHeader = styled.div`
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
`;

const CloseWrapper = styled.div`
  .headerClose {
    width: 2.7rem;
    height: 2.7rem;
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
    margin-top: 2.8rem;
  }
`;

const RelocateWrapper = styled.div`
  display: flex;
  position: absolute;
  overflow: hidden;
  top: 1rem;
  right: 1rem;

  z-index: 10;
`;

const ShowTrashCanWrapper = styled.div`
  display: flex;
  position: absolute;
  overflow: hidden;
  top: 6rem;
  right: 1rem;

  /* width: 4.4rem;
  height: 4.4rem; */

  z-index: 10;
`;

const RecordDetailContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 20rem;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  z-index: 100;
  padding-top: 1rem;
`;

const StopWatchContainer = styled.div`
  display: flex;
`;

const RecordDetailTxt = styled.p`
  display: flex;

  font-style: normal;
  font-weight: 500;
  font-size: 1.3rem;
  line-height: 1.6rem;

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

  width: 28.1rem;
  height: 6rem;

  background: ${(props) => props.bgColor};
  border-radius: 1.4rem;

  p {
    font-style: normal;
    font-weight: 600;
    font-size: 1.5rem;
    line-height: 1, 9rem;
    text-align: center;

    color: ${(props) => props.color};
  }
`;

const DisabledFinishButton = styled(RecordFinishBtn)``;
