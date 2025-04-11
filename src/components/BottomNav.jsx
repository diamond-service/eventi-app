import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function BottomNav() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t dark:bg-gray-900 dark:border-gray-700 shadow-md z-50">
      <div className="flex justify-around py-3 text-sm text-gray-600 dark:text-gray-300">
        <Link to="/" className={`flex flex-col items-center ${isActive('/') ? 'text-red-600' : ''}`}>
          🏠
          <span>Home</span>
        </Link>
        <Link to="/preferiti" className={`flex flex-col items-center ${isActive('/preferiti') ? 'text-red-600' : ''}`}>
          ❤️
          <span>Preferiti</span>
        </Link>
        <Link to="/admin" className={`flex flex-col items-center ${isActive('/admin') ? 'text-red-600' : ''}`}>
          ⚙️
          <span>Admin</span>
        </Link>
      </div>
    </nav>
  );
}
