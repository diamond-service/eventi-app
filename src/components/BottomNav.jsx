import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Heart, UserCog } from 'lucide-react';

export default function BottomNav() {
  const location = useLocation();

  const navItems = [
    { to: '/', label: 'Home', icon: <Home className="w-5 h-5" /> },
    { to: '/preferiti', label: 'Preferiti', icon: <Heart className="w-5 h-5" /> },
    { to: '/admin', label: 'Admin', icon: <UserCog className="w-5 h-5" /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t shadow z-50">
      <div className="flex justify-around items-center h-14">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`flex flex-col items-center justify-center text-xs transition-all duration-200 ${
              location.pathname === item.to
                ? 'text-red-600 font-semibold'
                : 'text-gray-500 hover:text-red-400'
            }`}
          >
            {item.icon}
            <span className="mt-1">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
