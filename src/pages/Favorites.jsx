import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import EventCard from '../components/EventCard';
import useFavorites from '../hooks/useFavorites';
import BottomNav from '../components/BottomNav';

export default function Favorites() {
  const [events, setEvents] = useState([]);
  const { favorites } = useFavorites();

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from('events').select('*');
      if (data) {
        const favEvents = data.filter((e) => favorites.includes(e.id));
        setEvents(favEvents);
      }
    };
    load();
  }, [favorites]);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">⭐ Eventi Preferiti</h1>
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
      {events.length === 0 && <p>Nessun preferito salvato.</p>}
      <BottomNav />
    </div>
  );
}
