import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapMarker } from '@/lib/mockAiAPI';

// Fix Leaflet marker icon issue in Next.js
// This is needed because Leaflet's default icon paths are based on CSS which
// doesn't work well with Next.js's asset handling
const defaultIcon = L.icon({
  iconUrl: '/images/marker-icon.png',
  iconRetinaUrl: '/images/marker-icon-2x.png',
  shadowUrl: '/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = defaultIcon;

// Custom marker icons for different types
const farmerIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const customerIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const bothIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface MapComponentProps {
  center: [number, number];
  zoom: number;
  markers: MapMarker[];
}

const MapComponent: React.FC<MapComponentProps> = ({ center, zoom, markers }) => {
  // Get the appropriate icon based on marker type
  const getMarkerIcon = (type: string) => {
    switch (type) {
      case 'farmer':
        return farmerIcon;
      case 'customer':
        return customerIcon;
      case 'both':
        return bothIcon;
      default:
        return defaultIcon;
    }
  };

  return (
    <MapContainer 
      center={center} 
      zoom={zoom} 
      style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {markers.map((marker) => (
        <Marker 
          key={marker.id} 
          position={[marker.location.lat, marker.location.lng]}
          icon={getMarkerIcon(marker.type)}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-medium text-base">{marker.name}</h3>
              <p className="text-sm text-gray-600">
                {marker.location.address || `${marker.location.lat.toFixed(4)}, ${marker.location.lng.toFixed(4)}`}
              </p>
              
              <div className="mt-2">
                {marker.type === 'farmer' && marker.products && (
                  <div>
                    <p className="text-sm font-medium">Products:</p>
                    <ul className="text-xs text-gray-600 list-disc pl-4 mt-1">
                      {marker.products.map((product, idx) => (
                        <li key={idx}>{product}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {marker.type === 'customer' && marker.requirements && (
                  <div>
                    <p className="text-sm font-medium">Looking for:</p>
                    <ul className="text-xs text-gray-600 list-disc pl-4 mt-1">
                      {marker.requirements.map((requirement, idx) => (
                        <li key={idx}>{requirement}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              {(marker as any).distanceFromKlatovy !== undefined && (
                <p className="text-xs mt-2 text-green-600 font-medium">
                  {(marker as any).distanceFromKlatovy} km from Klatovy
                </p>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent; 