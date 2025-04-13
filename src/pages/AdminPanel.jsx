import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import BottomNav from '../components/BottomNav';
import { useNavigate, Link } from 'react-router-dom';
import { LogOut, Home, Eye, Upload, Pencil, Trash2 } from 'lucide-react';

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
    whatsapp: '',
    price: '',
    dinnerIncluded: false,
    dinnerPrice: '',
    image: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data?.user) navigate('/login');
      else {
        setUser(data.user);
        loadEvents();
      }
    };
    checkAuth();
  }, []);

  const loadEvents = async () => {
    const { data } = await supabase.from('events').select('*');
    if (data) setEvents(data);
  };

  const handleSubmit = async () => {
    const { error } = editingId
      ? await supabase.from('events').update(form).eq('id', editingId)
      : await supabase.from('events').insert([form]);

    if (error) {
      alert('❌ Errore: ' + error.message);
    } else {
      setForm({
        title: '',
        date: '',
        location: '',
        description: '',
        mapUrl: '',
        phone: '',
        whatsapp: '',
        price: '',
        dinnerIncluded: false,
        dinnerPrice: '',
        image: ''
      });
      setEditingId(null);
      loadEvents();
    }
  };

  const handleEdit = (event) => {
    setForm(event);
    setEditingId(event.id);
  };

  const handleDelete = async (id) => {
    await supabase.from('events').delete().eq('id', id);
    loadEvents();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const fileName = `${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage.from('eventi').upload(fileName, file);
    if (!error) {
      const { data: url } = supabase.storage.from('eventi').getPublicUrl(fileName);
      setForm({ ...form, image: url.publicUrl });
    } else {
      alert('❌ Errore upload immagine');
    }
  };

  if (!user) {
    return <div className="text-center text-gray-500 py-10">🔐 Autenticazione in corso...</div>;
  }

  return (
    <div className="p-4 max-w-4xl mx-auto pb-24">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-red-600">🎛️ Pannello Amministratore</h1>
        <div className="flex gap-2">
          <button onClick={handleLogout} className="text-red-600 flex items-center gap-1 text-sm">
            <LogOut className="w-4 h-4" /> Logout
          </button>
          <Link to="/" className="text-blue-600 flex items-center gap-1 text-sm">
            <Home className="w-4 h-4" /> Home
          </Link>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow space-y-3 mb-6">
        <h2 className="font-semibold">{editingId ? '✏️ Modifica Evento' : '➕ Crea Nuovo Evento'}</h2>
        {Object.entries(form).map(([key, value]) => {
          if (key === 'image' || key === 'dinnerIncluded') return null;
          return (
            <input
              key={key}
              className="w-full p-2 border rounded mb-2 dark:bg-gray-700 dark:text-white"
              placeholder={key}
              value={value}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            />
          );
        })}

        <label className="flex items-center gap-2 mb-2">
          <input
            type="checkbox"
            checked={form.dinnerIncluded}
            onChange={(e) => setForm({ ...form, dinnerIncluded: e.target.checked })}
          />
          🍽️ Cena Inclusa
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full p-2 border rounded mb-2 dark:bg-gray-700 dark:text-white"
        />

        {form.image && (
          <img src={form.image} alt="Anteprima" className="w-full h-32 object-cover rounded mb-2" />
        )}

        <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          {editingId ? '💾 Salva Modifiche' : '➕ Aggiungi Evento'}
        </button>
      </div>

      <div className="space-y-3">
        {events.map((event) => (
          <div key={event.id} className="bg-gray-100 dark:bg-gray-700 p-4 rounded shadow">
            <div className="flex justify-between items-center mb-2">
              <div>
                <h3 className="font-bold text-lg">{event.title}</h3>
                <p className="text-sm text-gray-600">{event.date} - {event.location}</p>
                <p className="text-sm text-gray-400 flex items-center gap-1">
                  <Eye className="w-4 h-4" /> {event.views || 0} visualizzazioni
                </p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(event)} className="bg-yellow-500 px-3 py-1 text-white rounded">
                  <Pencil className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(event.id)} className="bg-red-500 px-3 py-1 text-white rounded">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            {event.image && (
              <img src={event.image} alt={event.title} className="w-full h-32 object-cover rounded" />
            )}
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
