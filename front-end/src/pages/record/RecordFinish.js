import { useEffect, useState, useRef, useMemo } from "react";
import { Map, MapMarker, Polyline } from "react-kakao-maps-sdk";
import { Button, GBorderButton } from "../../components/common/Button";
import styled from "styled-components";
import { COLOR } from "../../styles/color";
import { ReactComponent as Close } from "../../assets/icons/close.svg";
import PlogImg from "../../assets/icons/certification.svg";

import dummyImg from "../../dummys/recordImgData.json";

function RecordFinish() {
  useEffect(() => {}, []);

  const mapRef = useRef();

  const [points, setPoints] = useState([
    { lat: 33.452278, lng: 126.567803 },
    { lat: 33.452671, lng: 126.574792 },
    { lat: 33.451744, lng: 126.572441 },
  ]);

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

  return (
    <StRecordFinish>
      <SignupHeader>
        <span>
          {todayMonth}월 {todayDate}일
        </span>
        <p>개운산 숲 나들길</p>
        <CloseWrapper>
          <Close className="headerClose" />
        </CloseWrapper>
      </SignupHeader>
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
              height: "236px",
            }}
            level={3} // 지도의 확대 레벨
            zoomable={false}
            draggable={false}
            ref={mapRef}
          >
            {dummyImg.recordImgData.map((position, index) => (
              <MapMarker
                key={`${position.recordId}-${position.imageId}`}
                position={{ lat: position.imgLat, lng: position.imgLng }} // 마커를 표시할 위치
                image={{
                  src: PlogImg, // 마커이미지의 주소입니다
                  size: {
                    width: 24,
                    height: 35,
                  }, // 마커이미지의 크기입니다
                }}
                title={position.title} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
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
            <span>01:40:30</span>
            <p>걸은 시간</p>
          </TimeDataContainer>
          <OtherDataContainer>
            <DistDataContainer>
              <span>1.24</span>
              <p>걸은 킬로미터</p>
            </DistDataContainer>
            <CalorieDataContainer>
              <span>130</span>
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
            <PhotoWrapper>
              <img src={img.imgUrl} alt="img"></img>
            </PhotoWrapper>
          ))}
        </PhotoGridContainer>
      </ContentsContainer>

      <RecordFinishFooter>
        <PlogFinishBtnWrapper>
          <Button>플로깅 종료하기</Button>
        </PlogFinishBtnWrapper>
        <PlogShareBtnWrapper>
          <GBorderButton>공유하기</GBorderButton>
        </PlogShareBtnWrapper>
      </RecordFinishFooter>
    </StRecordFinish>
  );
}

export default RecordFinish;

const StRecordFinish = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
  padding-top: 127px;
  padding-bottom: 200px;
  padding-left: 20px;
  padding-right: 20px;
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

  .signupBackArrow {
    margin-top: 50px;
    margin-left: 20px;
  }
`;

const CloseWrapper = styled.div`
  .headerClose {
    width: 27px;
    height: 27px;
    color: ${COLOR.MAIN_BLACK};
  }
`;

const ContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  width: 100%;

  padding-bottom: 122px;
`;

const MapContainer = styled.div`
  display: flex;
  position: relative;
  overflow: hidden;

  width: 100%;
  height: 236px;
  border-radius: 14px;

  & > .MapWrapper {
    position: relative;
    overflow: hidden;
  }
`;
const DetailDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  width: 100%;

  padding-top: 24px;
  padding-bottom: 24px;

  span {
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 30px;
    color: ${COLOR.MAIN_BLACK};
  }

  p {
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    line-height: 16px;
    color: ${COLOR.INPUT_BORDER_GRAY};
  }
`;

const TimeDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
const OtherDataContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const DistDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
const CalorieDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
const PhotoCountDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const PhotoGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;

  padding-top: 20px;
  gap: 8px;

  border-top: 1px solid ${COLOR.MAIN_GREEN};
`;

const PhotoWrapper = styled.div`
  img {
    width: 109px;
    height: 109px;
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
  padding: 0px 6px 20px 20px;
  gap: 12px;

  width: 393px;
  z-index: 200px;
`;

const PlogFinishBtnWrapper = styled.div`
  display: flex;
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 19px;

  text-align: center;
  color: ${COLOR.MAIN_BLACK};
`;

const PlogShareBtnWrapper = styled.div`
  display: flex;
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 19px;
  text-align: center;
`;
