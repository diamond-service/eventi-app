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
      <div className="flex items-center gap-3 mb-6">
        <svg className="w-8 h-8 text-red-600 animate-bounce" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l-2 2m12 0l-2-2v13m-6 0h.01M13 5l7 7-7 7M5 5l7 7-7 7" />
        </svg>
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-800 dark:text-white">
          Eventi Livorno
        </h1>
      </div>

      {events.length === 0 && <p className="text-gray-500">Nessun evento disponibile.</p>}

      {events.map((event) => (
        <Link to={`/evento/${event.id}`} key={event.id}>
          <div className="bg-white dark:bg-gray-800 border rounded-2xl shadow-md p-4 mb-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
            {event.image && (
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover rounded-xl mb-3 shadow-sm"
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
