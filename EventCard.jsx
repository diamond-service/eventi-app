// src/components/EventCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import useFavorites from '../hooks/useFavorites';

export default function EventCard({ event }) {
  const { toggleFavorite, isFavorite } = useFavorites();

  return (
    <div className="bg-white dark:bg-gray-800 border rounded-xl shadow p-4 mb-4 hover:shadow-lg relative">
      <Link to={`/evento/${event.id}`}>
        <h2 className="text-lg font-bold">{event.title}</h2>
        <p className="text-sm text-gray-500">{event.date} - {event.location}</p>
      </Link>

      <button
        onClick={() => toggleFavorite(event.id)}
        className="absolute top-2 right-2 text-xl"
      >
        {isFavorite(event.id) ? '❤️' : '🤍'}
      </button>
    </div>
  );
}
