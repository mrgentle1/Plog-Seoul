// /* global kakao */

// import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// import { COLOR } from "../../styles/color";
// //import { Map, MapMarker, Polyline } from "react-kakao-maps-sdk";

// import current from "../../assets/icons/walk.svg";

// const { kakao } = window;

// const line = (from, to) => {
//   let ret = null;
//   if (from.err === 0 && to.err === 0) {
//     const path = [
//       new kakao.maps.LatLng(from.latitude, from.longitude),
//       new kakao.maps.LatLng(to.latitude, to.longitude),
//     ];
//     ret = new kakao.maps.Polyline({
//       path,
//       strokeWeight: 3,
//       strokeColor: "#db4040",
//       strokeOpacity: 1,
//       strokeStyle: "solid",
//     });
//     return ret;
//   }
//   return ret;
// };

// const MapRecording = ({ coords, recording }) => {
//   const [walkpolylineList, setWalkpolylineList] = useState([]);
//   const [beforeCoord, setBeforeCoord] = useState(null);
//   const [map, setMap] = useState(null);

//   //처음 지도 그리기
//   useEffect(() => {
//     const container = document.getElementById("map");
//     const options = { center: new kakao.maps.LatLng(37.495328, 126.4878233) };
//     const kakaoMap = new kakao.maps.Map(container, options);
//     setMap(kakaoMap);
//   }, []);

//   //좌표추가 및 라인 그리기
//   useEffect(() => {
//     if (coords.err === 0) {
//       const LatLon = new kakao.maps.LatLng(coords.latitude, coords.longitude);
//       map.setCenter(LatLon);
//       if (beforeCoord !== null) {
//         const polyline = line(beforeCoord, coords);
//         if (polyline !== null) {
//           setWalkpolylineList([...walkpolylineList, polyline]);
//           polyline.setMap(map);
//         }
//       }
//       setBeforeCoord(coords);
//     }
//   }, [coords]);

//   //지도 초기화
//   useEffect(() => {
//     walkpolylineList.forEach((polyline) => {
//       polyline.setMap(null);
//     });
//   }, [recording]);

//   return (
//     <StMapRecording>
//       <div id="map" style={{ width: "100%", height: "100%" }}></div>
//     </StMapRecording>
//   );
// };

// export default MapRecording;

// const StMapRecording = styled.div``;
