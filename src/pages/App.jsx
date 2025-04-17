import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import logo from '../assets/logo.png'; // ✅ Importa logo

export default function App() {
  const [events, setEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase.from('events').select('*');
      if (error) {
        console.error('Errore nel caricamento eventi:', error.message);
      } else {
        setEvents(data || []);
      }
    };
    fetchEvents();
  }, []);

  // Estrai categorie uniche
  const categorie = [...new Set(events.map(e => e.category).filter(Boolean))];

  return (
    <div className="p-4 max-w-3xl mx-auto">
      {/* ✅ Titolo con logo */}
      <div className="flex items-center gap-3 mb-6">
        <img src={logo} alt="Eventi Livorno" className="h-10" />
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-800 dark:text-white">
          Eventi Livorno
        </h1>
      </div>

      {/* Filtri categoria */}
      {categorie.length > 0 && (
        <div className="flex gap-2 flex-wrap mb-4">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-3 py-1 rounded-full text-sm transition ${!selectedCategory ? 'bg-red-600 text-white' : 'bg-gray-200'}`}
          >
            Tutti
          </button>
          {categorie.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-sm transition ${selectedCategory === cat ? 'bg-red-600 text-white' : 'bg-gray-200'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Eventi */}
      {events.length === 0 && <p className="text-gray-500">Nessun evento disponibile.</p>}

      {events
        .filter((e) => !selectedCategory || e.category === selectedCategory)
        .map((event) => (
          <Link to={`/evento/${event.id}`} key={event.id}>
            <div className="bg-white dark:bg-gray-800 border rounded-2xl shadow-md p-4 mb-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
              {event
