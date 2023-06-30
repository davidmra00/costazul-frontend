import React from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, LayersControl } from 'react-leaflet'

const MapFooter = () => {
  return (
    <MapContainer center={[26.67925, -80.11150]} zoom={17} scrollWheelZoom={true} attributionControl={false}>
      <LayersControl position="topright">
        <LayersControl.BaseLayer name="OpenStreetMap" checked>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Satellite">
          <TileLayer
            url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
            subdomains={['mt0','mt1','mt2','mt3']}
          />
        </LayersControl.BaseLayer>
      </LayersControl>
      <Marker position={[26.67925, -80.11150]}>
        <Popup>
          <Link target='_blank' to='https://maps.google.com/?cid=18146099936263355410&entry=gps'>Costazul Travel</Link>
        </Popup>
      </Marker>
</MapContainer>
  );
}

export default MapFooter;