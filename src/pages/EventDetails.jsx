import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from('events')
        .select('*')
        .eq('id', id)
        .single();
      setEvent(data);
    };
    load();
  }, [id]);

  if (!event) return <div className="p-6 text-center">⏳ Caricamento evento...</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4">
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-blue-600 underline mb-2"
      >
        ← Torna Indietro
      </button>

      {event.image && (
        <div className="w-full h-64 bg-white rounded-xl shadow flex items-center justify-center overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className="h-full object-contain"
          />
        </div>
      )}


      <h1 className="text-3xl font-bold">{event.title}</h1>
      <p className="text-sm text-gray-500">{event.date} - {event.location}</p>
      <p className="text-gray-700">{event.description}</p>

      {event.mapUrl && (
        <div>
          <iframe
            src={event.mapUrl}
            className="w-full h-64 rounded-xl border"
            allowFullScreen=""
            loading="lazy"
          />
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4">
        {event.phone && (
          <a
            href={`tel:${event.phone}`}
            className="bg-green-600 text-white text-center px-4 py-2 rounded"
          >
            📞 Chiama
          </a>
        )}
        {event.whatsapp && (
          <a
            href={`https://wa.me/${event.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-white text-center px-4 py-2 rounded"
          >
            💬 WhatsApp
          </a>
        )}
      </div>
    </div>
  );
}
