import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { supabase } from '../supabaseClient';
import BottomNav from '../components/BottomNav';

// Fisso l'icona per i marker
const markerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  shadowSize: [41, 41]
});

export default function MapPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const loadEvents = async () => {
      const { data, error } = await supabase.from('events').select('*');
      if (!error) setEvents(data);
    };
    loadEvents();
  }, []);

  return (
    <div className="pb-24">
      <h1 className="text-2xl font-bold text-center my-4">🗺️ Eventi su Mappa</h1>

      <MapContainer center={[43.55, 10.31]} zoom={9} className="h-[75vh] w-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a>"
        />
        {events.map((event) => {
          const match = event.mapUrl?.match(/!3d([\d.]+)!4d([\d.]+)/);
          if (!match) return null;
          const [lat, lon] = [parseFloat(match[1]), parseFloat(match[2])];
          return (
            <Marker key={event.id} position={[lat, lon]} icon={markerIcon}>
              <Popup>
                <b>{event.title}</b><br />
                {event.date} - {event.location}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      <BottomNav />
    </div>
  );
}
