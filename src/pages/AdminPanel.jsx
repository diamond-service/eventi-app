// src/pages/AdminPanel.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import BottomNav from '../components/BottomNav';
import { useNavigate } from 'react-router-dom';

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

  // 🔐 Verifica autenticazione
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data?.user) {
        navigate('/admin-login'); // 👈 Se non loggato, vai al login
      } else {
        setUser(data.user);
        loadEvents();
      }
    });
  }, []);

  const loadEvents = async () => {
    const { data, error } = await supabase.from('events').select('*');
    if (!error) setEvents(data || []);
  };

  const handleSubmit = async () => {
    if (editingId) {
      await supabase.from('events').update(form).eq('id', editingId);
    } else {
      await supabase.from('events').insert([form]);
    }

    setForm({
      title: '', date: '', location: '', description: '', mapUrl: '', phone: '', whatsapp: ''
    });
    setEditingId(null);
    loadEvents();
  };

  const handleEdit = (event) => {
    setForm(event);
    setEditingId(event.id);
  };

  const handleDelete = async (id) => {
    await supabase.from('events').delete().eq('id', id);
    loadEvents();
  };

  if (!user) return null; // Evita flicker visivo se non loggato

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">🎛️ Pannello Admin</h1>
      <p className="text-green-600 mb-4">✅ Sei loggato come <b>{user.email}</b></p>

      <div className="bg-white p-4 rounded shadow mb-6 space-y-2">
        <h2 className="text-lg font-semibold">{editingId ? 'Modifica Evento' : 'Crea Nuovo Evento'}</h2>
        {Object.keys(form).map((key) => (
          <input
            key={key}
            className="w-full p-2 border rounded mb-2"
            placeholder={key}
            value={form[key]}
            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          />
        ))}
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleSubmit}>
          {editingId ? 'Salva Modifiche' : 'Aggiungi Evento'}
        </button>
      </div>

      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="bg-gray-100 p-4 rounded shadow flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{event.title}</h3>
              <p className="text-sm text-gray-600">{event.date} - {event.location}</p>
            </div>
            <div className="flex gap-2">
              <button className="bg-yellow-500 text-white px-3 py-1 rounded" onClick={() => handleEdit(event)}>
                Modifica
              </button>
              <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => handleDelete(event.id)}>
                Elimina
              </button>
            </div>
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
