import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import BottomNav from '../components/BottomNav';
import { useNavigate, Link } from 'react-router-dom';

export default function AdminPanel() {
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    title: '', date: '', location: '', category: '', description: '', mapUrl: '',
    phone: '', whatsapp: '', image: '', price: '', dinnerIncluded: false, dinnerPrice: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthAndLoad = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) console.error('Errore auth:', error);
      if (!data?.user) navigate('/admin-login');
      else {
        setUser(data.user);
        loadEvents();
      }
    };
    checkAuthAndLoad();
  }, []);

  const loadEvents = async () => {
    const { data, error } = await supabase.from('events').select('*');
    if (!error) setEvents(data || []);
  };

  const handleSubmit = async () => {
    const { error } = editingId
      ? await supabase.from('events').update(form).eq('id', editingId)
      : await supabase.from('events').insert([form]);

    if (!error) {
      setForm({
        title: '', date: '', location: '', category: '', description: '', mapUrl: '',
        phone: '', whatsapp: '', image: '', price: '', dinnerIncluded: false, dinnerPrice: ''
      });
      setEditingId(null);
      loadEvents();
    } else {
      alert('❌ Errore: ' + error.message);
    }
  };

  const handleEdit = (event) => {
    setForm(event);
    setEditingId(event.id);
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from('events').delete().eq('id', id);
    if (!error) loadEvents();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin-login');
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;

    const { data, error } = await supabase.storage.from('eventi').upload(fileName, file);

    if (error) {
      alert('❌ Errore upload immagine: ' + error.message);
      return;
    }

    const { data: urlData } = supabase.storage.from('eventi').getPublicUrl(fileName);
    setForm({ ...form, image: urlData.publicUrl });
  };

  if (!user) return <div className="p-8 text-center text-gray-500">🔐 Autenticazione in corso...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">🎛️ Pannello Admin</h1>
        <div className="flex gap-2">
          <button onClick={handleLogout} className="text-sm text-red-600 underline">🔓 Logout</button>
          <Link to="/" className="text-sm text-blue-600 underline">🏠 Home</Link>
        </div>
      </div>

      <p className="text-green-600 mb-4">✅ Loggato come <b>{user.email}</b></p>

      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-lg font-semibold mb-2">{editingId ? 'Modifica Evento' : 'Crea Nuovo Evento'}</h2>

        {Object.entries(form).map(([key, value]) => (
          key !== 'image' && key !== 'dinnerIncluded' && (
            <input
              key={key}
              className="w-full p-2 border rounded mb-2"
              placeholder={key}
              value={value}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            />
          )
        ))}

        <label className="flex items-center space-x-2 mb-2">
          <input
            type="checkbox"
            checked={form.dinnerIncluded}
            onChange={(e) => setForm({ ...form, dinnerIncluded: e.target.checked })}
          />
          <span>🍽️ Cena inclusa</span>
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full p-2 border rounded mb-2"
        />

        {form.image && (
          <img src={form.image} alt="Anteprima" className="w-full h-48 object-cover rounded mb-2" />
        )}

        <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          {editingId ? '💾 Salva Modifiche' : '➕ Aggiungi Evento'}
        </button>
      </div>

      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="bg-gray-100 p-4 rounded shadow flex justify-between items-start">
            <div className="w-full">
              <h3 className="text-lg font-semibold">{event.title}</h3>
              <p className="text-sm text-gray-600">{event.date} - {event.location}</p>
              <p className="text-xs text-gray-500">👁️ {event.views || 0} visualizzazioni</p>
              {event.image && <img src={event.image} alt={event.title} className="w-full h-24 object-cover mt-2 rounded" />}
            </div>
            <div className="flex flex-col gap-2 ml-4">
              <button className="bg-yellow-500 text-white px-3 py-1 rounded" onClick={() => handleEdit(event)}>✏️</button>
              <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => handleDelete(event.id)}>🗑️</button>
            </div>
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
