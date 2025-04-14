import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import BottomNav from '../components/BottomNav';
import { Phone, MessageCircle, Eye, MapPin, Calendar, CreditCard, Utensils } from 'lucide-react';

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', id)
        .single();

      if (!error && data) {
        setEvent(data);
        await supabase
          .from('events')
          .update({ views: (data.views || 0) + 1 })
          .eq('id', id);
      }
    };
    load();
  }, [id]);

  if (!event) {
    return <div className="p-6 text-center text-gray-500">⏳ Caricamento evento...</div>;
  }

  return (
    <div className="pb-24 max-w-2xl mx-auto p-4 space-y-4">
      {/* Immagine */}
      {event.image && (
        <div className="w-full h-64 rounded-xl overflow-hidden shadow">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Titolo e info */}
      <h1 className="text-3xl font-bold">{event.title}</h1>
      
      {event.category && (
        <p className="text-sm text-gray-500">📌 Categoria: {event.category}</p>
      )}


      <div className="flex flex-wrap gap-4 text-sm text-gray-500 items-center">
        <span className="flex items-center gap-1">
          <Calendar size={16} /> {event.date}
        </span>
        <span className="flex items-center gap-1">
          <MapPin size={16} /> {event.location}
        </span>
        <span className="flex items-center gap-1 text-gray-400">
          <Eye size={16} /> {event.views || 0} visualizzazioni
        </span>
      </div>

      {/* Prezzi */}
      {event.price && (
        <p className="flex items-center text-gray-700 gap-2 mt-1">
          <CreditCard size={16} /> <strong>{event.price}€</strong>
        </p>
      )}

      {event.dinnerIncluded && (
        <p className="flex items-center text-gray-700 gap-2">
          <Utensils size={16} />
          Cena inclusa: <strong>{event.dinnerPrice ? `${event.dinnerPrice}€` : 'Compresa'}</strong>
        </p>
      )}

      {/* Descrizione */}
      <p className="text-gray-700 whitespace-pre-line">{event.description}</p>

      {/* Mappa */}
      {event.mapUrl && (
        <div className="rounded-xl overflow-hidden border mt-4">
          <iframe
            src={event.mapUrl}
            className="w-full h-64"
            allowFullScreen
            loading="lazy"
            title="Mappa evento"
          />
        </div>
      )}

      {/* Contatti */}
      {(event.phone || event.whatsapp) && (
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          {event.phone && (
            <a
              href={`tel:${event.phone}`}
              className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700"
            >
              <Phone size={18} /> Chiama
            </a>
          )}
          {event.whatsapp && (
            <a
              href={`https://wa.me/${event.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600"
            >
              <MessageCircle size={18} /> WhatsApp
            </a>
          )}
        </div>
      )}

      {/* Navigazione inferiore */}
      <BottomNav />
    </div>
  );
}
