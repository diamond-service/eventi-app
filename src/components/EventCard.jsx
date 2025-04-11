// src/components/EventCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function EventCard({ event }) {
  return (
    <Link to={`/evento/${event.id}`}>
      <div className="bg-white dark:bg-gray-800 border rounded-xl shadow p-4 mb-4 hover:shadow-lg">
        <h2 className="text-lg font-bold">{event.title}</h2>
        <p className="text-sm text-gray-500">{event.date} - {event.location}</p>
      </div>
    </Link>
  );
}
