// src/pages/App.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { Link } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import AdminLogin from './pages/AdminLogin';
import AdminPanel from './pages/AdminPanel';

export default function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase.from('events').select('*');
      if (!error) setEvents(data);
    };
    fetchEvents();
  }, []);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-red-600 mb-6">🎶 Eventi Livorno</h1>
      {events.map((event) => (
        <Link to={`/evento/${event.id}`} key={event.id}>
          <div className="bg-white dark:bg-gray-800 border rounded-xl shadow-md p-4 mb-4 hover:shadow-xl transition">
            <h2 className="text-xl font-semibold">{event.title}</h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">{event.date} - {event.location}</p>
            <BottomNav />
          </div>
          <Routes>
            <Route path="/" element={<App />} />
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/pannello" element={<AdminPanel />} />
          </Routes>
        </Link>
      ))}
    </div>
  );
}
