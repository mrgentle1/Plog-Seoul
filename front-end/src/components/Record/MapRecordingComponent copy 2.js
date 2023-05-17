// import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// import { COLOR } from "../../styles/color";
// import { Map, MapMarker, Polyline } from "react-kakao-maps-sdk";

// import current from "../../assets/icons/walk.svg";

// const { kakao } = window;

// const MapRecording = ({ coords, recording, path }) => {
//   const [state, setState] = useState({});

//   //좌표추가 및 라인 그리기
//   useEffect(() => {
//     const currentRecord = {
//       center: { lat: coords.lat, lng: coords.lng },
//     };
//     setState(currentRecord);
//   }, [coords]);

//   return (
//     <StMapRecording>
//       <Map
//         center={state.center}
//         style={{ width: "100%", height: "100%" }} // 지도 크기
//         level={2} // 지도 확대 레벨
//       >
//         <MapMarker // 마커를 생성합니다
//           position={
//             // 마커가 표시될 위치입니다
//             state.center
//           }
//           image={{
//             src: current, // 마커이미지의 주소입니다
//             size: {
//               width: 64,
//               height: 69,
//             }, // 마커이미지의 크기입니다
//             options: {
//               offset: {
//                 x: 27,
//                 y: 69,
//               }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
//             },
//           }}
//         ></MapMarker>
//         {/* <Polyline
//           path={[path]}
//           strokeWeight={5} // 선의 두께 입니다
//           strokeColor={"#FFAE00"} // 선의 색깔입니다
//           strokeOpacity={0.7} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
//           strokeStyle={"solid"} // 선의 스타일입니다
//         /> */}
//       </Map>
//     </StMapRecording>
//   );
// };

// export default MapRecording;

// const StMapRecording = styled.div``;
