<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom';

export default function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const { data, error } = await supabase.from('events').select('*');
    if (!error) setEvents(data);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">🎉 Eventi Livorno</h1>
      {events.map((event) => (
        <Link to={`/evento/${event.id}`} key={event.id}>
          <div className="border rounded-lg p-4 mb-4 shadow hover:shadow-lg">
            <h2 className="text-xl font-semibold">{event.title}</h2>
            <p>{event.description}</p>
            <p className="text-sm text-gray-500">{event.date}</p>
          </div>
        </Link>
      ))}
    </div>
  );
=======
import React from 'react';
export default function App() {
  return <h1>🎉 Benvenuto in Eventi Livorno - Tutti gli Eventi</h1>;
>>>>>>> 8870bc24a258d90e37240848134d2e882fc8ec4e
}
