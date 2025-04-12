import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from('events').select('*').eq('id', id).single();
      setEvent(data);
    };
    load();
  }, [id]);

  if (!event) return <div className="p-6 text-center">⏳ Caricamento evento...</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
      <p className="text-sm text-gray-500 mb-4">{event.date} - {event.location}</p>
      <p className="mb-4">{event.description}</p>

      <div className="mb-4">
        <iframe
          src={event.mapUrl}
          className="w-full h-64 rounded-xl border"
          allowFullScreen=""
          loading="lazy"
        />
      </div>

      <div className="flex gap-4">
        <a href={`tel:${event.phone}`} className="bg-green-600 text-white px-4 py-2 rounded">📞 Chiama</a>
        <a href={`https://wa.me/${event.whatsapp}`} target="_blank" className="bg-green-500 text-white px-4 py-2 rounded">💬 WhatsApp</a>
      </div>
    </div>
  );
}
