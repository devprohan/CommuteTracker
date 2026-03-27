import React, { useState, useMemo, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import propertyData from "./properties.json";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./MapLocator.css";

// Leaflet Icons Fix
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const workplaceIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// 🔥 Helper component to move map when workplace changes
function RecenterMap({ location }) {
  const map = useMap();
  useEffect(() => {
    if (location) {
      map.setView([location.lat, location.lng], 13, { animate: true });
    }
  }, [location, map]);
  return null;
}

// Pass 'externalWorkplace' as a prop from Dashboard
function MapLocator({ externalWorkplace }) {
  // Use externalWorkplace if provided, otherwise fallback to Sitabuldi
  const workLocation = useMemo(() => {
    return externalWorkplace || { lat: 21.1458, lng: 79.0882, name: "Sitabuldi" };
  }, [externalWorkplace]);

  const [maxTime, setMaxTime] = useState(25);
  const [mode, setMode] = useState("driving");

  const properties = useMemo(() => propertyData, []);

  const getCommuteDetails = (lat1, lon1, lat2, lon2, travelMode) => {
    const R = 6371; // Earth radius
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;
    const directDist = R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
    const roadDist = directDist * 1.2; // Road buffer

    let multiplier = travelMode === "walking" ? 12 : travelMode === "biking" ? 4 : 3;
    return Math.round(roadDist * multiplier);
  };

  const filteredProperties = useMemo(() => {
    return properties
      .map((p) => ({
        ...p,
        commuteTime: getCommuteDetails(workLocation.lat, workLocation.lng, p.lat, p.lng, mode),
      }))
      .filter((p) => p.commuteTime <= maxTime);
  }, [properties, maxTime, mode, workLocation]);

  const getEmoji = (m) => (m === "driving" ? "🚗" : m === "walking" ? "🚶" : "🚲");

  return (
    <div className="app-container">
      {/* Search Header inside MapLocator */}
      <header className="app-header">
        <h2 style={{ margin: 0, fontSize: '1.2rem' }}>Nagpur Hubs</h2>
        <div className="header-controls">
          <div className="control-group">
            <select className="mode-select" value={mode} onChange={(e) => setMode(e.target.value)}>
              <option value="driving">🚗 Driving</option>
              <option value="biking">🚲 Biking</option>
              <option value="walking">🚶 Walking</option>
            </select>
          </div>
          <div className="control-group">
            <input
              className="range-input"
              type="range" min="5" max="60"
              value={maxTime}
              onChange={(e) => setMaxTime(Number(e.target.value))}
            />
            <b className="time-display">{maxTime} min</b>
          </div>
        </div>
      </header>

      <div className="main-content">
        <div className="sidebar">
          <p className="sidebar-info">
            Results for: <b>{workLocation.name || "Custom Location"}</b>
          </p>
          <hr />
          <div className="property-list">
            {filteredProperties.map((p) => (
              <div key={p.id} className="property-card">
                <div className="property-name">{p.name}</div>
                <div className="property-price">{p.price}</div>
                <div className="commute-info">
                  {getEmoji(mode)} <b>{p.commuteTime} mins</b>
                </div>
              </div>
            ))}
          </div>
        </div>

        <MapContainer center={[workLocation.lat, workLocation.lng]} zoom={13} className="map-view">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          
          {/* 🔥 This updates the map view when Dashboard changes workplace */}
          <RecenterMap location={workLocation} />

          <Marker position={[workLocation.lat, workLocation.lng]} icon={workplaceIcon}>
            <Popup><b>Workplace: {workLocation.name}</b></Popup>
          </Marker>

          {filteredProperties.map((p) => (
            <Marker key={p.id} position={[p.lat, p.lng]}>
              <Popup>
                <strong>{p.name}</strong><br />
                Rent: {p.price}<br />
                {p.commuteTime} mins away
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default MapLocator;