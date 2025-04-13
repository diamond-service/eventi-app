import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import { Heart, Calendar } from 'lucide-react';

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(favs);
  }, []);

  return (
    <div className="p-4 pb-20 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-red-600 mb-4 flex items-center gap-2">
        <Heart className="w-6 h-6" /> Preferiti
      </h1>

      {favorites.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">
          Nessun evento salvato. Aggiungi un evento cliccando sul ❤️.
        </p>
      ) : (
        <div className="space-y-4">
          {favorites.map((event) => (
            <Link key={event.id} to={`/evento/${event.id}`}>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow hover:shadow-md transition">
                {event.image && (
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-44 object-cover rounded mb-2"
                  />
                )}
                <h2 className="text-lg font-semibold">{event.title}</h2>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <Calendar className="w-4 h-4" /> {event.date} - {event.location}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}

      <BottomNav />
    </div>
  );
}
