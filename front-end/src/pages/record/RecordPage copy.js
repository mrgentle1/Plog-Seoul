// import React, { useEffect, useState } from "react";
// import { Map, MapMarker } from "react-kakao-maps-sdk";

// import styled from "styled-components";
// import { COLOR } from "../../styles/color";
// import current from "../../assets/icons/current2.svg";
// const { kakao } = window;

// function RecordPage() {
//   // useEffect(() => {
//   //   var container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
//   //   var options = {
//   //     //지도를 생성할 때 필요한 기본 옵션
//   //     center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
//   //     level: 3, //지도의 레벨(확대, 축소 정도)
//   //   };

//   //   var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
//   // }, []);

//   const [state, setState] = useState({
//     center: {
//       lat: 33.450701,
//       lng: 126.570667,
//     },
//     errMsg: null,
//     isLoading: true,
//   });

//   useEffect(() => {
//     if (navigator.geolocation) {
//       // GeoLocation을 이용해서 접속 위치를 얻어옵니다
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setState((prev) => ({
//             ...prev,
//             center: {
//               lat: position.coords.latitude, // 위도
//               lng: position.coords.longitude, // 경도
//             },
//             isLoading: false,
//           }));
//         },
//         (err) => {
//           setState((prev) => ({
//             ...prev,
//             errMsg: err.message,
//             isLoading: false,
//           }));
//         }
//       );
//     } else {
//       // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
//       setState((prev) => ({
//         ...prev,
//         errMsg: "geolocation을 사용할수 없어요..",
//         isLoading: false,
//       }));
//     }
//   }, []);

//   return (
//     <StRecordPage>
//       <Map
//         center={state.center} // 지도의 중심 좌표
//         style={{ width: "100%", height: "100%" }} // 지도 크기
//         level={3} // 지도 확대 레벨
//       >
//         {!state.isLoading && (
//           <div>
//             <MapMarker // 마커를 생성합니다
//               position={
//                 // 마커가 표시될 위치입니다
//                 state.center
//               }
//               image={{
//                 src: current, // 마커이미지의 주소입니다
//                 size: {
//                   width: 64,
//                   height: 69,
//                 }, // 마커이미지의 크기입니다
//                 options: {
//                   offset: {
//                     x: 27,
//                     y: 69,
//                   }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
//                 },
//               }}
//             ></MapMarker>
//           </div>
//         )}
//       </Map>
//     </StRecordPage>
//   );
// }

// export default RecordPage;

// const StRecordPage = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   width: 100vw;
//   height: 100vh;
// `;
