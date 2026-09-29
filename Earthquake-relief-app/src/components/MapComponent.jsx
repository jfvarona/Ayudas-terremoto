import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const getIconColor = (urgency) => {
  const colors = {
    critical: '#DC2626',
    high: '#EA580C',
    medium: '#EAB308',
    low: '#16A34A',
    fulfilled: '#6B7280'
  };
  return colors[urgency] || colors.low;
};

const createCustomIcon = (urgency) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      background-color: ${getIconColor(urgency)};
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    "></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  });
};

const MapComponent = ({ needs, onMarkerClick }) => {
  const defaultCenter = [4.8133, -75.6961];
  const defaultZoom = 13;

  const getNeedTypeLabel = (type) => {
    const labels = {
      food: '🍞 Alimentos',
      water: '💧 Agua',
      medicine: '💊 Medicinas',
      shelter: '🏠 Alojamiento',
      other: '📦 Otros'
    };
    return labels[type] || type;
  };

  const getUrgencyLabel = (urgency) => {
    const labels = {
      critical: '🔴 Crítica',
      high: '🟠 Alta',
      medium: '🟡 Media',
      low: '🟢 Baja',
      fulfilled: '⚪ Cumplida'
    };
    return labels[urgency] || urgency;
  };

  return (
    <MapContainer 
      center={defaultCenter} 
      zoom={defaultZoom} 
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {needs.map((need) => (
        <Marker
          key={need.id}
          position={[need.location.lat, need.location.lng]}
          icon={createCustomIcon(need.status === 'fulfilled' ? 'fulfilled' : need.urgency)}
          eventHandlers={{
            click: () => onMarkerClick && onMarkerClick(need)
          }}
        >
          <Popup>
            <div style={{ minWidth: '200px' }}>
              <h3 style={{ margin: '0 0 10px 0', color: getIconColor(need.urgency) }}>
                {getNeedTypeLabel(need.needType)}
              </h3>
              <p><strong>Urgencia:</strong> {getUrgencyLabel(need.urgency)}</p>
              {need.details && <p><strong>Detalles:</strong> {need.details}</p>}
              {need.location.address && (
                <p><strong>Dirección:</strong> {need.location.address}</p>
              )}
              {need.phone && <p><strong>Teléfono:</strong> {need.phone}</p>}
              {need.name && <p><strong>Nombre:</strong> {need.name}</p>}
              <p style={{ fontSize: '12px', color: '#666' }}>
                {new Date(need.createdAt).toLocaleDateString('es-CO')}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;