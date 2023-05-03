// import React, { useCallback, useEffect, useState } from "react";
// import { Map, MapMarker, Polyline } from "react-kakao-maps-sdk";
// import { useNavigate, Link } from "react-router-dom";
// import styled from "styled-components";
// import { COLOR } from "../../styles/color";
// import TimeComponent from "../../components/Record/TimeComponent";
// import { getDistance, getFinDist } from "../../components/utils/calc";
// import { ReactComponent as BackArrow } from "../../assets/icons/backArrow.svg";
// import current from "../../assets/icons/walk.svg";
// import { ReactComponent as CamBtn } from "../../assets/icons/camera.svg";
// import MapRecording from "../../components/Record/MapRecordingComponent";

// const { kakao } = window;

// function RecordIngPage() {
//   const navigate = useNavigate();
//   const goBack = useCallback(() => {
//     navigate(-1);
//   }, [navigate]);

//   // 사용자 이동 기록
//   //   const [state, setState] = useState({
//   //     center: {
//   //       lat: 33.450701,
//   //       lng: 126.570667,
//   //     },
//   //     errMsg: null,
//   //     isLoading: true,
//   //   });
//   const [coords, setcoords] = useState({
//     err: -1,
//   });
//   const [locationList, setLocationList] = useState([]);
//   const [watchId, setWatchId] = useState(-1);

//   const [recording, setRecording] = useState(false); //기록 중

//   let options = {
//     enableHighAccuracy: true,
//     timeout: 1000 * 60 * 1, // 1 min (1000 ms * 60 sec * 1 minute = 60 000ms),
//     maximumAge: 0,
//   };

//   useEffect(() => {
//     run();
//     setInterv(setInterval(run, 10));

//     // if (navigator.geolocation) {
//     //   // GeoLocation을 이용해서 접속 위치를 얻어옵니다
//     //   navigator.geolocation.watchPosition(
//     //     (position) => {
//     //       setState((prev) => ({
//     //         ...prev,
//     //         center: {
//     //           lat: position.coords.latitude, // 위도
//     //           lng: position.coords.longitude, // 경도
//     //         },
//     //         isLoading: false,
//     //       }));
//     //     },
//     //     (err) => {
//     //       setState((prev) => ({
//     //         ...prev,
//     //         errMsg: err.message,
//     //         isLoading: false,
//     //       }));
//     //     },
//     //     options
//     //   );
//     // } else {
//     //   // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
//     //   setState((prev) => ({
//     //     ...prev,
//     //     errMsg: "geolocation을 사용할수 없어요..",
//     //     isLoading: false,
//     //   }));
//     // }

//     if (navigator.geolocation) {
//       let before_record = null;
//       const newId = navigator.geolocation.watchPosition(
//         (position) => {
//           let updateFlag = true;
//           const now = new Date();
//           const new_record = {
//             err: 0,
//             time: now.toLocaleTimeString(),
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude,
//           };

//           //시작
//           if (before_record !== null) {
//             const dist = getDistance({
//               lat1: before_record.latitude,
//               lon1: before_record.longitude,
//               lat2: new_record.latitude,
//               lon2: new_record.longitude,
//             });
//             //이동거리가 50m미만이면 안바뀜
//             if (dist < 0.05) {
//               updateFlag = false;
//             }
//           }

//           if (updateFlag) {
//             setcoords(new_record);
//             before_record = new_record;
//             setLocationList((locationList) => [...locationList, new_record]);
//           }
//         },
//         (err) => {
//           console.log(err.message);
//         },
//         { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
//       );
//       setRecording(true);
//       setWatchId(newId);
//     }
//   }, []);

//   //   이동 시간 표시
//   const [time, setTime] = useState({ ms: 0, s: 0, m: 0, h: 0 });
//   const [interv, setInterv] = useState();

//   var updatedMs = time.ms,
//     updatedS = time.s,
//     updatedM = time.m,
//     updatedH = time.h;

//   const run = () => {
//     if (updatedM === 60) {
//       updatedH++;
//       updatedM = 0;
//     }
//     if (updatedS === 60) {
//       updatedM++;
//       updatedS = 0;
//     }
//     if (updatedMs === 100) {
//       updatedS++;
//       updatedMs = 0;
//     }
//     updatedMs++;
//     return setTime({ ms: updatedMs, s: updatedS, m: updatedM, h: updatedH });
//   };

//   const recordStopHandler = async (e) => {
//     e.preventDefault();
//     try {
//       if (watchId !== -1) {
//         navigator.geolocation.clearWatch(watchId);
//         setWatchId(-1);
//         const finDist = getFinDist(locationList);
//         let finish = 1;
//         if (locationList.length < 3 || finDist > 0.2) {
//           finish = 0;
//         }
//         // const { data } = await axios.post('/api/record/finish', {
//         //     finish,
//         //     usercode,
//         //     recordcode,
//         // });
//         if (finish === 0) {
//           alert(
//             "정상적인 종료 조건이 아닙니다.(3곳 이상 방문, 시작점, 마지막점 200m이내)"
//           );
//         }
//         // if (data.success === false) {
//         //     throw new Error(data.message);
//         // }
//         setLocationList([]);
//         // setRecordcode(-1);
//         // setReadyRecord(true);
//         setRecording(false);
//       }
//     } catch (err) {
//       alert(err.message);
//     }

//     clearInterval(interv);
//   };

//   return (
//     <StRecordIngPage>
//       <SignupHeader>
//         <BackArrow className="signupBackArrow" onClick={goBack} />
//       </SignupHeader>
//       <MapRecording coords={coords} recording={recording} />
//       <RecordDetailContainer>
//         <StopWatchContainer>
//           <TimeComponent time={time} />
//         </StopWatchContainer>
//         <RecordDetailTxt>
//           플로깅 사진을 함께 인증 기록으로 남겨요!
//         </RecordDetailTxt>
//         <RecordBtnContainer>
//           <RecordCamBtnWrapper>
//             <CamBtn />
//           </RecordCamBtnWrapper>
//           <RecordFinishBtn onClick={recordStopHandler}>
//             <p>완료하기</p>
//           </RecordFinishBtn>
//         </RecordBtnContainer>
//       </RecordDetailContainer>
//     </StRecordIngPage>
//   );
// }

// export default RecordIngPage;

// const StRecordIngPage = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   width: 100%;
//   height: 100%;
//   padding-top: 127px;
//   padding-bottom: 200px;
// `;
// const SignupHeader = styled.div`
//   position: fixed;
//   top: 0;
//   width: 393px;
//   height: 127px;

//   display: flex;
//   flex-direction: row;
//   justify-content: flex-start;
//   align-items: center;

//   z-index: 100;

//   .signupBackArrow {
//     margin-top: 50px;
//     margin-left: 20px;
//   }
// `;

// const RecordDetailContainer = styled.div`
//   position: fixed;
//   bottom: 0;
//   width: 393px;
//   height: 200px;

//   display: flex;
//   flex-direction: column;
//   justify-content: space-around;
//   align-items: center;

//   z-index: 100;
//   padding-top: 10px;
// `;

// const StopWatchContainer = styled.div`
//   display: flex;
// `;

// const RecordDetailTxt = styled.p`
//   display: flex;

//   font-style: normal;
//   font-weight: 500;
//   font-size: 13px;
//   line-height: 16px;

//   color: ${COLOR.DARK_GRAY};
// `;

// const RecordBtnContainer = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: space-around;
//   align-items: center;

//   width: 100%;
//   height: 40%;
// `;

// const RecordCamBtnWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   padding: 0px;
// `;

// const RecordFinishBtn = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   align-items: center;
//   padding: 0px;

//   width: 281px;
//   height: 60px;

//   background: ${COLOR.MAIN_GREEN};
//   border-radius: 14px;

//   p {
//     font-style: normal;
//     font-weight: 600;
//     font-size: 15px;
//     line-height: 19px;
//     text-align: center;

//     color: ${COLOR.MAIN_BLACK};
//   }
// `;
