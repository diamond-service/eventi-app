import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';

export default function AdminPanel() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: '', date: '', location: '', description: '', mapUrl: '', phone: '', whatsapp: '' });

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    const { data } = await supabase.from('events').select('*');
    setEvents(data || []);
  };

  const handleCreate = async () => {
    await supabase.from('events').insert([newEvent]);
    setNewEvent({ title: '', date: '', location: '', description: '', mapUrl: '', phone: '', whatsapp: '' });
    loadEvents();
  };

  const handleDelete = async (id) => {
    await supabase.from('events').delete().eq('id', id);
    loadEvents();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">🎛️ Pannello Admin</h1>

      <div className="bg-white p-4 rounded shadow mb-6 space-y-2">
        <h2 className="text-lg font-semibold">Crea nuovo evento</h2>
        {Object.keys(newEvent).map((key) => (
          <input
            key={key}
            className="w-full p-2 border rounded mb-2"
            placeholder={key}
            value={newEvent[key]}
            onChange={(e) => setNewEvent({ ...newEvent, [key]: e.target.value })}
          />
        ))}
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleCreate}>
          Aggiungi Evento
        </button>
      </div>

      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="bg-gray-100 p-4 rounded shadow flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{event.title}</h3>
              <p className="text-sm text-gray-600">{event.date} - {event.location}</p>
            </div>
            <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => handleDelete(event.id)}>
              Elimina
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
