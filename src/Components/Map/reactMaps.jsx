// import React, { useState } from "react";
// import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

// const mapStyles = {
//   width: "50%",
//   height: "50%",
// };

// const ReactMaps = (props) => {

// if (navigator.geolocation) {
//     console.log(navigator.geolocation.watchPosition((position) => {
//        console.log("The lattitudes are ", position.coords.latitude);
//        console.log("The LongiTudes Are ", position.coords.longitude);
//     }, (error) => {
//        console.log(error);
//     }, {
//        enableHighAccuracy: true,
//        timeout: 5000,
//        maximumAge: 0
//     }
//     ));
//  }

//   const [zoom, setZoom] = useState(8);
//   const [center, setCenter] = useState({ lat: 31.485903, lng: 74.368225 });
//   const [markerPosition, setMarkerPosition] = useState({
//     lat: 31.485903,
//     lng: 74.368225,
//   });

//   const onMarkerDragEnd = (coord) => {
//     const { latLng } = coord;
//     const lat = latLng.lat();
//     const lng = latLng.lng();
//     setMarkerPosition({ lat, lng });
//     setCenter({ lat, lng });
//   };

//   const handleZoomChanged = (mapProps, map) => {
//     setZoom(map.getZoom());
//   };

//   return (
//     <div>
//       <Map
//         google={props.google}
//         zoom={zoom}
//         style={mapStyles}
//         initialCenter={center}
//         onZoomChanged={handleZoomChanged}
//       >
//         <Marker
//           position={markerPosition}
//           draggable={true}
//           onDragend={onMarkerDragEnd}
//         />
//       </Map>
//     </div>
//   );
// };

// export default GoogleApiWrapper({
//   apiKey: process.env.MAPS_API,
// })(ReactMaps);
