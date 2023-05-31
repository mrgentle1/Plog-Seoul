/* global kakao */
import { useEffect, useState, useRef, useMemo } from "react";
import { Map, MapMarker, Polyline, useMap } from "react-kakao-maps-sdk";
import { Button, BorderGreenThinButton } from "../../components/common/Button";
import styled from "styled-components";
import { COLOR } from "../../styles/color";
import { ReactComponent as Close } from "../../assets/icons/close.svg";
import PlogImg from "../../assets/icons/imgMarker.svg";
import Marker from "../../assets/icons/mapMarker.svg";
import { useNavigate, Link, useLocation } from "react-router-dom";
import axios from "axios";

import { TimeConvert } from "../../components/Record/TimeComponent";

import moment from "moment";

function ShowRecordData({
  recordId,
  setModalOpen,
  setImgOpen,
  setImgEditOpen,
  getImgUrl,
  getData,
}) {
  const token = localStorage.getItem("key");

  const [isCourse, sestIsCourse] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [isPathLoading, setIsPathLoading] = useState(true);
  const [isImgLoading, setIsImgLoading] = useState(true);
  const [isImgData, setIsImgData] = useState(false);
  const getImg = useRef(false);
  const getPath = useRef(false);

  const mapRef = useRef(null);
  const [counter, setCounter] = useState(0);
  const [isLast, setIsLast] = useState(false);

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
    createdAt: "",
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
        createdAt: response.data.result.createdAt,
      };

      setThisRecordData(recordData);
    } catch (e) {
      // 실패 시 처리
      console.error(e);
      alert("기록 get 실패.");
    }
    setIsDataLoading(false);
  }

  /* GET - Record path */

  const [pathData, setPathData] = useState([{ lat: 0, lng: 0 }]);

  async function getPathData() {
    // async, await을 사용하는 경우
    try {
      setIsLoading(true);
      // GET 요청은 params에 실어 보냄
      const response = await axios.get(
        `${process.env.REACT_APP_API_ROOT}/api/plogging/${recordId}/paths?pagingIndex=${counter}&pagingSize=2000`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const initArray = response.data.result.content.map((array) => {
        return array;
      });

      const initPath = initArray.map((it) => {
        return { lat: it.wayLat, lng: it.wayLng };
      });
      if (counter === 0) {
        setPathData(initPath);
      } else {
        setPathData((prev) => [...prev, initPath]);
      }

      setIsLast(response.data.result.last);

      getPath.current = true;
    } catch (e) {
      // 실패 시 처리
      console.error(e);
      alert("경로 get 실패. 재시도해주세요.");
    }
    setIsLoading(false);
    setIsPathLoading(false);
    setCounter(counter + 1);
  }

  useEffect(() => {
    if (!isLast) {
      getPathData();
    }
  }, [counter]);

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

      const initImg = response.data.result.map((it) => {
        return {
          imageId: it.imageId,
          recordId: it.recordId,
          imgUrl: it.imgUrl,
          imgLat: it.imgLat,
          imgLng: it.imgLng,
        };
      });

      if (initImg.length > 0) {
        // setImgData(initImg);
        setIsImgData(true);
      }

      setImgData(initImg);
      getImg.current = true;
    } catch (e) {
      // 실패 시 처리
      console.error(e);
      setIsImgData(false);
      // alert("이미지 get 실패. 재시도해주세요.");
    }
    setIsImgLoading(false);
  }

  // 오늘 날짜
  let now = new Date();
  let todayMonth = now.getMonth() + 1;
  let todayDate = now.getDate();

  // const [modalOpen, setModalOpen] = useState(false);
  const showModal = () => {
    setModalOpen(true);
  };
  const navigate = useNavigate();
  const finish = () => {
    navigate("/record");
  };
  const [clickImg, setClickImg] = useState("");
  // const [imgEditOpen, setImgEditOpen] = useState(false);

  const showImgModal = () => {
    setImgOpen(true);
  };

  const showEditImgModal = () => {
    setImgEditOpen(true);
  };

  const EventStrEnMarkerContainer = () => {
    const data = [
      { lat: thisRecordData.startLat, lng: thisRecordData.startLng },
      { lat: thisRecordData.endLat, lng: thisRecordData.endLng },
    ];

    return (
      <>
        {data.map((it) => (
          <MapMarker
            key={`${it.lat}-${it.lng}`}
            position={it} // 마커를 표시할 위치
            image={{
              src: Marker, // 마커이미지의 주소입니다
              size: {
                width: 20,
                height: 20,
              }, // 마커이미지의 크기입니다
            }}
          ></MapMarker>
        ))}
      </>
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
        zIndex={10}
        onClick={() => {
          // setClickImg(content);
          sendImgUrl(content);
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
    setIsDataLoading(false);
  }, [thisRecordData]);

  useEffect(() => {
    if (getPath.current) {
      setIsPathLoading(false);
    }
  }, [pathData]);

  useEffect(() => {
    if (getImg.current) {
      setIsImgLoading(false);
    }
  }, [imgData]);

  useEffect(() => {
    if (!isDataLoading && !isPathLoading && !isImgLoading) {
      setIsLoading(false);
    }
  }, [isDataLoading, isPathLoading, isImgLoading, pathData, imgData]);

  const [map, setMap] = useState();
  const [markers, setMarkers] = useState([]);
  useEffect(() => {
    if (!map) return;
    // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
    // LatLngBounds 객체에 좌표를 추가합니다
    var i = 0;
    var count = true;
    let markers = [];
    const bounds = new kakao.maps.LatLngBounds();
    if (pathData.length > 1) {
      pathData.map((data) => {
        if (count) {
          if (i === 6) {
            count = false;
            markers.push(data);
          } else {
            i++;
          }
          return bounds.extend(new kakao.maps.LatLng(data.lat, data.lng));
        } else {
          if (i === 0) {
            count = true;
          } else {
            i--;
          }
        }
      });

      // 위치를 기준으로 지도 범위를 재설정합니다
      setMarkers(markers);
      map.setBounds(bounds);
    }
  }, [map, pathData]);

  const sendImgUrl = (url) => {
    getImgUrl(url);
  };
  const sendRecordData = () => {
    getData({
      dist: thisRecordData.distance.toFixed(2),
      when: moment(thisRecordData.createdAt).format("YYYY년 MM월 DD일"),
      time: thisRecordData.runningTime,
    });
  };

  if (isLoading) return <div>로딩중..</div>;

  return (
    <>
      <StRecordFinish>
        {/* {!isDataLoading && ( */}
        {!isPathLoading && (
          <>
            {/* <RecordHeader /> */}
            <ContentsContainer>
              {/* {!isPathLoading && ( */}
              <MapContainer>
                <Map // 지도를 표시할 Container
                  id="MapWrapper"
                  center={{
                    // 지도의 중심좌표
                    lat: pathData[pathData.length - 1].lat,
                    lng: pathData[pathData.length - 1].lng,
                  }}
                  style={{
                    width: "100%",
                    height: "23.6rem",
                  }}
                  level={3} // 지도의 확대 레벨
                  zoomable={false}
                  disableDoubleClickZoom={true}
                  ref={mapRef}
                  onCreate={setMap}
                >
                  <EventStrEnMarkerContainer />
                  {isImgData &&
                    imgData.map((value) => (
                      <EventMarkerContainer
                        key={`EventMarkerContainer-${value.recordId}-${value.imageId}`}
                        position={{ lat: value.imgLat, lng: value.imgLng }}
                        content={value.imgUrl}
                      />
                    ))}
                  <Polyline
                    path={markers}
                    strokeWeight={12} // 선의 두께 입니다
                    strokeColor={"#8EDF82"} // 선의 색깔입니다
                    strokeOpacity={1} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
                    strokeStyle={"solid"} // 선의 스타일입니다
                  />
                  <Polyline
                    path={markers}
                    strokeWeight={6} // 선의 두께 입니다
                    strokeColor={"#ffffff"} // 선의 색깔입니다
                    strokeOpacity={1} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
                    strokeStyle={"solid"} // 선의 스타일입니다
                  />
                </Map>
              </MapContainer>
              <DetailDataContainer>
                <TimeDataContainer>
                  {/* <TimeConvert seconds={thisRecordData.runningTime} /> */}
                  {/* <span>{thisRecordData.runningTime}</span> */}
                  <TimeConvert time={thisRecordData.runningTime} />
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
                          sendImgUrl(img.imgUrl);
                          sendRecordData();
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
  height: 100%;
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
