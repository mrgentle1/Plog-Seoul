import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Map,
  MapMarker,
  CustomOverlayMap,
  useMap,
  MarkerClusterer,
} from "react-kakao-maps-sdk";
import { useNavigate, Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { headerTitleState } from "../../core/headerTitle";
import styled from "styled-components";
import { COLOR } from "../../styles/color";
import current from "../../assets/icons/currentMarker.svg";
import trashCanImg from "../../assets/icons/trash.svg";
import { ReactComponent as Close } from "../../assets/icons/close.svg";
import { ReactComponent as StartBtn } from "../../assets/icons/recordStart.svg";
import { ReactComponent as RecordStartBtn } from "../../assets/icons/runStartBtn.svg";
import { ReactComponent as RelocateBtn } from "../../assets/icons/relocateInactivate.svg";
import { ReactComponent as RelocateAtiveBtn } from "../../assets/icons/relocateActivate.svg";
import { ReactComponent as TrashCanAtiveBtn } from "../../assets/icons/trashCanActivate.svg";
import { ReactComponent as TrashCanBtn } from "../../assets/icons/trash.svg";
import { HomeHeaderV2 } from "../../components/layout/HeaderV2";
import axios from "axios";

const { kakao } = window;

function RecordPage() {
  const navigate = useNavigate();
  const goBack = useCallback(() => {
    navigate(-1);
    console.log(navigate(-1));
  }, [navigate]);

  const token = localStorage.getItem("key");
  const [errorMessage, setErrorMessage] = useState("");
  const [isMove, setIsMove] = useState(false);
  const [isShowCan, setIsShowCan] = useState(false);
  const [level, setLevel] = useState(3);
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
    if (map) {
      map.setCenter(
        new kakao.maps.LatLng(state.center.lat - 0.0008, state.center.lng)
      );
      map.setLevel(3);
    }
  };

  // 오늘 날짜
  let today = new Date();
  let todayMonth = today.getMonth() + 1;
  let todayDate = today.getDate();
  const setHeaderTitle = useSetRecoilState(headerTitleState);

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

  useEffect(() => {
    setHeaderTitle(`${todayMonth}월 ${todayDate}일 플로깅`); // '홈' 값을 할당합니다.
  }, [setHeaderTitle]);

  useEffect(() => {
    getTrashCanData(); //쓰레기통 위치 정보

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

  /* TrashCan show Marker */

  const EventTrashCanContainer = ({ position, title }) => {
    const map = useMap();

    return (
      <MapMarker
        position={position} // 마커를 표시할 위치
        image={{
          src: trashCanImg, // 마커이미지의 주소입니다
          size: { width: 64, height: 64 }, // 마커이미지의 크기입니다
        }}
        title={title} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
      ></MapMarker>
    );
  };

  return (
    // <motion.div
    //   /* 2. 원하는 애니메이션으로 jsx를 감싸준다 */
    //   // initial={{ opacity: 0 }}
    //   // animate={{ opacity: 1 }}
    //   // exit={{ opacity: 0 }}
    //   animate={{ y: 0 }}
    //   initial={{ y: 700 }}
    //   transition={{ delay: 1, duration: 1.5, type: "spring" }}
    // >
    <StRecordPage>
      <RecordIngHeader>
        <span>
          {todayMonth}월 {todayDate}일
        </span>
        <p></p>
        <CloseWrapper>
          <Close
            className="headerClose"
            onClick={() => {
              // goBack();
              navigate("/home");
            }}
          />
        </CloseWrapper>
      </RecordIngHeader>
      <MapContainer>
        <Map
          id="MapWrapper"
          center={{
            lat: state.center.lat - 0.00008,
            lng: state.center.lng,
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
            </div>
          )}
          {isShowCan && (
            <MarkerClusterer
              averageCenter={true} // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
              minLevel={6} // 클러스터 할 최소 지도 레벨
            >
              {trashCanData.map((position) => (
                <EventTrashCanContainer
                  key={`${position.trashCanId}-${position.title}`}
                  position={{
                    lat: position.latlng.lat,
                    lng: position.latlng.lng,
                  }} // 마커를 표시할 위치
                  title={position.title} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                />
              ))}
            </MarkerClusterer>
          )}

          {/* {isShowCan &&
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
              ))} */}
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
                handleRelocate();
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
      <RecordPageFooter>
        <RecordStartBtnWrapper>
          <Link
            to={"/record/ing"}
            state={{
              lat: `${state.center.lat}`,
              lng: `${state.center.lng}`,
            }}
          >
            <RecordStartBtn />
          </Link>
        </RecordStartBtnWrapper>
      </RecordPageFooter>
    </StRecordPage>
    // </motion.div>
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

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;
const RecordIngHeader = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 9.4rem;

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
  position: fixed;
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
  top: 9rem;
  right: 1rem;

  z-index: 10;
`;

const ShowTrashCanWrapper = styled.div`
  display: flex;
  position: absolute;
  overflow: hidden;
  top: 14rem;

  right: 1rem;

  z-index: 10;
`;

const RecordPageFooter = styled.div`
  display: flex;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 15.7rem;

  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  background-image: linear-gradient(
    to top,
    rgba(255, 255, 255, 0.7) 30%,
    rgba(255, 255, 255, 0)
  );

  z-index: 100;
`;

const RecordStartBtnWrapper = styled.div`
  display: flex;
`;
