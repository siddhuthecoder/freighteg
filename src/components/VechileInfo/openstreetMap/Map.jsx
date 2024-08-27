import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './TollPlazaMap.css';

// Import the marker icon images
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import carIcon from '../../../assets/BusOne.png';

// Configure the default icon
const DefaultIcon = L.icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
    iconSize: [12, 19.5],  // Reduced size to half
    iconAnchor: [6, 19.5], // Adjusted anchor
    popupAnchor: [1, -20], // Adjusted popup anchor
    shadowSize: [21, 21],  // Reduced shadow size
});

L.Marker.prototype.options.icon = DefaultIcon;

const TollPlazaMap = ({ tollData = [] }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView([21.0, 82.0], 6);

      const streetLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: 'Map data © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      });

      streetLayer.addTo(mapInstanceRef.current);
    }

    if (mapInstanceRef.current) {
      // Clear existing markers
      mapInstanceRef.current.eachLayer(layer => {
        if (layer instanceof L.Marker) {
          mapInstanceRef.current.removeLayer(layer);
        }
      });

      // Sort tollData by readerReadTime in descending order
      const sortedTollData = tollData.sort((a, b) => new Date(b.readerReadTime) - new Date(a.readerReadTime));

      if (sortedTollData.length > 0) {
        sortedTollData.forEach((plaza, index) => {
          const [lat, lng] = plaza.tollPlazaGeocode.split(',').map(coord => parseFloat(coord));

          if (!isNaN(lat) && !isNaN(lng)) {
            const markerColor = index === 0 ? 'green' : 'blue';
            const iconImage = index === 0 ? carIcon : markerIcon;

            // Adjust custom icon size and properties
            const iconHtml = `
              <div style="position: relative; color: ${markerColor}; font-weight: bold; text-align: center;">
                ${index + 1}
                <img src="${iconImage}" style="width: 20px; " />
              </div>
            `;

            const customIcon = L.divIcon({
              html: iconHtml,
              className: 'custom-marker',
              iconSize: [20, 30],   // Reduced size to half
              iconAnchor: [10, 30], // Adjusted anchor accordingly
              popupAnchor: [1, -30] // Adjusted popup anchor accordingly
            });

            const marker = L.marker([lat, lng], { icon: customIcon }).addTo(mapInstanceRef.current);

            marker.bindPopup(
              `<b>${plaza.tollPlazaName}</b><br>
              Vehicle Type: ${plaza.vehicleType}<br>
              Vehicle Reg. No: ${plaza.vehicleRegNo}<br>
              Read Time: ${plaza.readerReadTime}`
            );

            if (index === 0) {
              marker.openPopup();
            }
          } else {
            console.error('Invalid coordinates:', plaza.tollPlazaGeocode);
          }
        });
      }
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [tollData]);

  return <div ref={mapRef} id="map" />;
};

export default TollPlazaMap;
