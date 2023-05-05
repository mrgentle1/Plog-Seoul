/* global kakao */
import React, { useCallback, useEffect, useState } from "react";
import { Map, MapMarker, Polyline } from "react-kakao-maps-sdk";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { COLOR } from "../../styles/color";
import TimeComponent from "../../components/Record/TimeComponent";
import { getDistance, getFinDist } from "../../components/utils/calc";
import { ReactComponent as BackArrow } from "../../assets/icons/backArrow.svg";
import current from "../../assets/icons/walk.svg";
import { ReactComponent as CamBtn } from "../../assets/icons/camera.svg";
import MapRecording from "../../components/Record/MapRecordingComponent3";

const { kakao } = window;
let options = {
  enableHighAccuracy: false,
  timeout: 1000 * 5 * 1, // 1 min (1000 ms * 60 sec * 1 minute = 60 000ms),
  maximumAge: 3600,
};
function RecordIngPage() {
  const navigate = useNavigate();
  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  // GET

  // const [trashCanData, setTrashCanData] = useState([]);
  // async function getTrashCanData() {
  //   // async, await을 사용하는 경우
  //   try {
  //     // GET 요청은 params에 실어 보냄
  //     const response = await axios.get("/api/trash-cans/");

  //     // 응답 결과(response)를 변수에 저장하거나.. 등 필요한 처리를 해 주면 된다.
  //     setTrashCanData({
  //       trashcanId: response.trashCanId,
  //       title: response.name,
  //       latlng: { lat: response.lat, lng: response.lng },
  //     });
  //     console.log("trash" + trashCanData);

  //     console.log("res" + response);
  //   } catch (e) {
  //     // 실패 시 처리
  //     console.error(e);
  //   }
  // }

  //사용자 이동 기록
  const [state, setState] = useState([
    {
      center: {
        lat: 33.450701,
        lng: 126.570667,
      },
      errMsg: null,
      isLoading: true,
    },
  ]);
  const [coords, setcoords] = useState({});
  const [locationList, setLocationList] = useState([]);
  const [watchId, setWatchId] = useState(-1);

  const [recording, setRecording] = useState(false); //기록 중

  // let options = {
  //   enableHighAccuracy: true,
  //   timeout: 1000 * 30 * 1, // 1 min (1000 ms * 60 sec * 1 minute = 60 000ms),
  //   maximumAge: 1,
  // };

  useEffect(() => {
    run();
    setInterv(setInterval(run, 10));
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      let before_record = null;
      const newId = navigator.geolocation.watchPosition(
        (position) => {
          console.log("watchPosition: %o", position);
          let updateFlag = true;
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

          //   {
          //   ...prev,
          //   center: {
          //     lat: position.coords.latitude, // 위도
          //     lng: position.coords.longitude, // 경도
          //   },
          //   isLoading: false,
          // }
          /*if (state && state.length > 1) {
            const dist = getDistance({
              lat1: before_record.lat,
              lon1: before_record.lng,
              lat2: state.center.lat,
              lon2: state.center.lng,
            });
            console.log("re");
            console.log(before_record);
            //이동거리가 50m미만이면 안바뀜
            if (dist > 0.1) {
              updateFlag = false;
            }
            console.log(updateFlag);
            if (updateFlag) {
              // setcoords(new_record);
              console.log("updateFlag 이후");
              before_record = state[state.length - 1].center;

              console.log("list");
              console.log(locationList);
            }
          }*/
        },
        (err) => {
          // setState((prev) => ({
          //   ...prev,
          //   errMsg: err.message,
          //   isLoading: false,
          // }));
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

        if (finish === 0) {
          alert(
            "정상적인 종료 조건이 아닙니다.(3곳 이상 방문, 시작점, 마지막점 200m이내)"
          );
        }

        setLocationList([]);
        // setRecordcode(-1);
        // setReadyRecord(true);
        setRecording(false);
      }
    } catch (err) {
      alert(err.message);
    }

    clearInterval(interv);
  };
  // console.log(state);
  // console.log("ff");
  // console.log(locationList);

  return (
    <StRecordIngPage>
      <SignupHeader>
        <BackArrow className="signupBackArrow" onClick={goBack} />
      </SignupHeader>
      <Map
        center={state[state.length - 1].center} // 지도의 중심 좌표
        style={{ width: "100%", height: "100%" }} // 지도 크기
        level={2} // 지도 확대 레벨
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
            ></MapMarker>
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

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  z-index: 100;

  .signupBackArrow {
    margin-top: 50px;
    margin-left: 20px;
  }
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
