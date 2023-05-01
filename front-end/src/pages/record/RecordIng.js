import React, { useCallback, useEffect, useState } from "react";
import { Map, MapMarker, Polyline } from "react-kakao-maps-sdk";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { COLOR } from "../../styles/color";
import TimeComponent from "../../components/Record/TimeComponent";
import { ReactComponent as BackArrow } from "../../assets/icons/backArrow.svg";
import current from "../../assets/icons/walk.svg";
import { ReactComponent as CamBtn } from "../../assets/icons/camera.svg";

const { kakao } = window;

function RecordPage() {
  const navigate = useNavigate();
  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const [state, setState] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  });

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

  const stop = () => {
    clearInterval(interv);
  };

  useEffect(() => {
    run();
    setInterv(setInterval(run, 10));

    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude, // 경도
            },
            isLoading: false,
          }));
          console.log(state);
        },
        (err) => {
          setState((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
        }
      );
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      setState((prev) => ({
        ...prev,
        errMsg: "geolocation을 사용할수 없어요..",
        isLoading: false,
      }));
    }
  }, []);

  return (
    <StRecordPage>
      <SignupHeader>
        <BackArrow className="signupBackArrow" onClick={goBack} />
      </SignupHeader>
      <Map
        center={state.center} // 지도의 중심 좌표
        style={{ width: "100%", height: "100%" }} // 지도 크기
        level={2} // 지도 확대 레벨
      >
        {!state.isLoading && (
          <div>
            <MapMarker // 마커를 생성합니다
              position={
                // 마커가 표시될 위치입니다
                state.center
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
          <RecordFinishBtn onClick={stop}>
            <p>완료하기</p>
          </RecordFinishBtn>
        </RecordBtnContainer>
      </RecordDetailContainer>
    </StRecordPage>
  );
}

export default RecordPage;

const StRecordPage = styled.div`
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
