// src/pages/AdminPanel.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import BottomNav from '../components/BottomNav';
import { useNavigate, Link } from 'react-router-dom';

export default function AdminPanel() {
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    title: '',
    date: '',
    location: '',
    description: '',
    mapUrl: '',
    phone: '',
    whatsapp: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthAndLoad = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) console.error('Errore auth:', error);
      if (!data?.user) {
        navigate('/admin-login');
      } else {
        setUser(data.user);
        loadEvents();
      }
    };
    checkAuthAndLoad();
  }, []);

  const loadEvents = async () => {
    const { data, error } = await supabase.from('events').select('*');
    if (error) {
      console.error('Errore caricamento eventi:', error.message);
    } else {
      setEvents(data || []);
    }
  };

  const handleSubmit = async () => {
    const { error } = editingId
      ? await supabase.from('events').update(form).eq('id', editingId)
      : await supabase.from('events').insert([form]);

    if (error) {
      alert('❌ Errore: ' + error.message);
    } else {
      setForm({
        title: '', date: '', location: '', description: '', mapUrl: '', phone: '', whatsapp: ''
      });
      setEditingId(null);
      loadEvents();
    }
  };

  const handleEdit = (event) => {
    setForm({
      title: event.title || '',
      date: event.date || '',
      location: event.location || '',
      description: event.description || '',
      mapUrl: event.mapUrl || '',
      phone: event.phone || '',
      whatsapp: event.whatsapp || ''
    });
    setEditingId(event.id);
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from('events').delete().eq('id', id);
    if (error) alert('❌ Errore eliminazione: ' + error.message);
    else loadEvents();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin-login');
  };

  if (!user) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-500">🔐 Controllo autenticazione in corso...</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">🎛️ Pannello Admin</h1>
        <div className="flex gap-2">
          <button
            className="text-sm text-red-600 underline"
            onClick={handleLogout}
          >
            🔓 Logout
          </button>
          <Link
            to="/"
            className="text-sm text-blue-600 underline"
          >
            🏠 Home
          </Link>
        </div>
      </div>

      <p className="text-green-600 mb-4">✅ Sei loggato come <b>{user.email}</b></p>

      <div className="bg-white p-4 rounded shadow mb-6 space-y-2">
        <h2 className="text-lg font-semibold">{editingId ? 'Modifica Evento' : 'Crea Nuovo Evento'}</h2>
        {Object.entries(form).map(([key, value]) => (
          <input
            key={key}
            className="w-full p-2 border rounded mb-2"
            placeholder={key}
            value={value}
            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          />
        ))}
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleSubmit}>
          {editingId ? '💾 Salva Modifiche' : '➕ Aggiungi Evento'}
        </button>
      </div>

      <div className="space-y-4">
        {events.length === 0 ? (
          <p className="text-gray-500">📭 Nessun evento disponibile.</p>
        ) : (
          events.map((event) => (
            <div key={event.id} className="bg-gray-100 p-4 rounded shadow flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{event.title}</h3>
                <p className="text-sm text-gray-600">{event.date} - {event.location}</p>
              </div>
              <div className="flex gap-2">
                <button className="bg-yellow-500 text-white px-3 py-1 rounded" onClick={() => handleEdit(event)}>
                  ✏️ Modifica
                </button>
                <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => handleDelete(event.id)}>
                  🗑️ Elimina
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <BottomNav />
    </div>
  );
}
