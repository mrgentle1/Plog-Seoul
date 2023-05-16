import React, { useEffect, useState, useRef } from "react";
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
import { useNavigate, Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { headerTitleState } from "../../core/headerTitle";
import styled from "styled-components";
import { COLOR } from "../../styles/color";
import current from "../../assets/icons/currentMarker.svg";
import { ReactComponent as StartBtn } from "../../assets/icons/recordStart.svg";
import { ReactComponent as RelocateBtn } from "../../assets/icons/relocateInactivate.svg";
import { ReactComponent as RelocateAtiveBtn } from "../../assets/icons/relocateActivate.svg";
import { HomeHeaderV2 } from "../../components/layout/HeaderV2";

const { kakao } = window;

function RecordPage() {
  const navigate = useNavigate();
  const token = localStorage.getItem("key");
  const [errorMessage, setErrorMessage] = useState("");
  const [isMove, setIsMove] = useState(false);
  const mapRef = useRef();
  const [state, setState] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  });
  const success = (position) => {
    setState((prev) => ({
      ...prev,
      center: {
        lat: position.coords.latitude, // 위도
        lng: position.coords.longitude, // 경도
      },
      isLoading: false,
    }));
    console.log("정확도:", position.coords.accuracy);
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
    console.log("errMsg", errorMessage);
  };

  const handleRelocate = () => {
    if (navigator.geolocation) {
      // GeoLocation 이용하여 위치 받아옴
      navigator.geolocation.getCurrentPosition(success, showError);
    } else {
      // HTML5의 GeoLocation을 사용할 수 없다면
      setState((prev) => ({
        ...prev,
        errMsg: "geolocation을 사용할수 없어요..",
        isLoading: false,
      }));
    }
    //지도 중심좌표 이동
    const map = mapRef.current;
    if (map)
      map.setCenter(
        new kakao.maps.LatLng(state.center.lat - 0.0008, state.center.lng)
      );
  };

  // 오늘 날짜
  let today = new Date();
  let todayMonth = today.getMonth() + 1;
  let todayDate = today.getDate();
  const setHeaderTitle = useSetRecoilState(headerTitleState);

  useEffect(() => {
    setHeaderTitle(`${todayMonth}월 ${todayDate}일 플로깅`); // '홈' 값을 할당합니다.
  }, [setHeaderTitle]);

  useEffect(() => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(success, showError);
    } else {
      setState((prev) => ({
        ...prev,
        errMsg: "geolocation을 사용할수 없어요..",
        isLoading: false,
      }));
    }
    console.log("[]useEffect");
  }, []);
  console.log(state);

  return (
    <StRecordPage>
      <HomeHeaderV2 headerBackground={COLOR.MAIN_WHITE} />
      <MapContainer>
        <Map
          id="MapWrapper"
          center={{
            lat: state.center.lat - 0.0008,
            lng: state.center.lng + 0.0001,
          }} // 지도의 중심 좌표
          style={{ width: "100%", height: "100%" }} // 지도 크기
          level={3} // 지도 확대 레벨
          isPanto={true}
          onCenterChanged={() => setIsMove(true)}
          ref={mapRef}
        >
          {!state.isLoading && (
            <div>
              <MapMarker // 마커를 생성합니다
                position={state.center}
                image={{
                  src: current, // 마커이미지의 주소입니다
                  size: {
                    width: 80,
                    height: 80,
                  }, // 마커이미지의 크기입니다
                  options: {
                    offset: {
                      x: 40,
                      y: 60,
                    }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
                  },
                }}
              />
              <CustomOverlayMap position={state.center} yAnchor={0.05}>
                <Link
                  to={"/record/ing"}
                  state={{
                    lat: `${state.center.lat}`,
                    lng: `${state.center.lng}`,
                  }}
                >
                  <StartBtn className="startBtn" />
                </Link>
              </CustomOverlayMap>
            </div>
          )}
        </Map>
        {/* Reloacate-지도 이동 확인 O -> activate Btn */}
        <RelocateWrapper>
          {isMove ? (
            <RelocateAtiveBtn
              onClick={() => {
                handleRelocate();
                setIsMove(false);
              }}
            />
          ) : (
            <RelocateBtn
              onClick={() => {
                handleRelocate();
              }}
            />
          )}
        </RelocateWrapper>
      </MapContainer>
    </StRecordPage>
  );
}

export default RecordPage;

const StRecordPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
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
