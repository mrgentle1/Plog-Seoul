import React, { useEffect, useState } from "react";
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { COLOR } from "../../styles/color";
import current from "../../assets/icons/current2.svg";
import { ReactComponent as StartBtn } from "../../assets/icons/recordStart.svg";
import { ReactComponent as RelocateBtn } from "../../assets/icons/relocateInactivate.svg";
const { kakao } = window;

function RecordPage() {
  const navigate = useNavigate();

  const handleDetailRecord = ({ item }) => {
    navigate("/record/ing", {
      state: {
        lat: `${item.lat}`,
        lng: `${item.lng}`,
      },
    });
  };

  const handleRelocate = () => {};

  const [state, setState] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  });

  useEffect(() => {
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
  console.log(state);

  const StartRecord = () =>
    '<StartBtnWrapper onclick=" handleDetailRecord(state.center)">' +
    "<StartBtn />" +
    "</StartBtnWrapper>";

  return (
    <StRecordPage>
      <MapContainer>
        <Map
          id="MapWrapper"
          center={{ lat: state.center.lat - 0.0008, lng: state.center.lng }} // 지도의 중심 좌표
          style={{ width: "100%", height: "100%" }} // 지도 크기
          level={3} // 지도 확대 레벨
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
                    width: 68,
                    height: 68,
                  }, // 마커이미지의 크기입니다
                  options: {
                    offset: {
                      x: 27,
                      y: 69,
                    }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
                  },
                }}
              />
              <CustomOverlayMap position={state.center} yAnchor={0.2}>
                <Link
                  to={"/record/ing"}
                  state={{
                    lat: `${state.center.lat}`,
                    lng: `${state.center.lng}`,
                  }}
                >
                  <StartBtn />
                </Link>
              </CustomOverlayMap>
            </div>
          )}
        </Map>
        {/* Reloacte-현재 중심좌표 확인하여 아니라면 activate상태로 */}
        <RelocateWrapper>
          <RelocateBtn />
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
`;

const StartBtnWrapper = styled.div`
  display: flex;
`;

const StartBtn2 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px 6px 0px 24px;
  gap: 6px;

  position: absolute;
  width: 160px;
  height: 60px;
  left: 117px;
  top: 377px;

  /* PrimaryWhite */

  background: #ffffff;
  /* navshadow */

  box-shadow: 0px 0px 16px 2px rgba(0, 0, 0, 0.12);
  border-radius: 30px;
`;

const ico_comm_ico_coffee = styled.span`
  display: block;
  margin: 0 auto 2px;
  width: 22px;
  height: 26px;
  background: url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/category.png)
    no-repeat;
`;

const RelocateWrapper = styled.div`
  display: flex;
  position: absolute;
  overflow: hidden;
  top: 10px;
  right: 10px;

  z-index: 10;
`;
