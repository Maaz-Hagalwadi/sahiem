// import React from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';

// // Fix leaflet's default icon issue
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
//   iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
//   shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
// });

// const BusMap = ({ buses }) => {
//   return (
//     <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: '400px' }}>
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       />
//       {buses.map(bus => (
//         <Marker key={bus.busId} position={[bus.latitude, bus.longitude]}>
//           <Popup>
//             <div>
//               <h5>{bus.busName}</h5>
//               <p>Location: {bus.latitude}, {bus.longitude}</p>
//             </div>
//           </Popup>
//         </Marker>
//       ))}
//     </MapContainer>
//   );
// };

// export default BusMap;


import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
 
const MapPage = () => {
  useEffect(() => {
    // Initialize map
    const map = L.map('map', {
      center: [12.9716, 77.5946], // Bangalore coordinates
      zoom: 12, // Initial zoom level
    });
 
    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 18,
    }).addTo(map);
 
    // Cleanup function
    return () => {
      map.remove();
    };
  }, []);
 
  return (
    <div id="map" style={{ height: '100vh' }}>
      {/* Map container */}
    </div>
  );
};
 
export default MapPage;
 
