// src/pages/App.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

export default function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase.from('events').select('*');
      if (error) {
        console.error('Errore nel caricamento eventi:', error.message);
      } else {
        setEvents(data);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-red-600 mb-6">🎶 Eventi Livorno</h1>

      {events.length === 0 && <p className="text-gray-500">Nessun evento disponibile.</p>}

      {events.map((event) => (
        <Link to={`/evento/${event.id}`} key={event.id}>
          <div className="bg-white dark:bg-gray-800 border rounded-xl shadow-md p-4 mb-4 hover:shadow-xl transition">
            
            {/* ✅ Mostra immagine se presente */}
            {event.image && (
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover rounded mb-3"
              />
            )}

            <h2 className="text-xl font-semibold">{event.title}</h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {event.date} - {event.location}
            </p>
          </div>
        </Link>
      ))}

      <BottomNav />
    </div>
  );
}
