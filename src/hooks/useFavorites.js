// src/hooks/useFavorites.js
import { useEffect, useState } from 'react';

export default function useFavorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(saved);
  }, []);

  const toggleFavorite = (eventId) => {
    const updated = favorites.includes(eventId)
      ? favorites.filter((id) => id !== eventId)
      : [...favorites, eventId];
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  const isFavorite = (eventId) => favorites.includes(eventId);

  return { favorites, toggleFavorite, isFavorite };
}
