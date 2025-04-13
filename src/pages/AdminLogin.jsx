import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import { Lock, Mail, KeyRound, ArrowLeft } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usePassword, setUsePassword] = useState(false);
  const navigate = useNavigate();

  const loginWithOTP = async () => {
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (!error) alert('📩 Controlla la tua email per il link di accesso!');
  };

  const loginWithPassword = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (data?.user) {
      navigate('/admin');
    } else {
      alert('❌ Login fallito: ' + (error?.message || 'Credenziali non valide'));
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto pb-24">
      <h2 className="text-2xl font-bold mb-4 text-center text-red-600 flex items-center justify-center gap-2">
        <Lock className="w-6 h-6" /> Login Amministratore
      </h2>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Mail className="w-5 h-5 text-gray-500" />
          <input
            className="w-full p-2 border border-gray-300 rounded dark:bg-gray-800 dark:text-white"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {usePassword && (
          <div className="flex items-center gap-2">
            <KeyRound className="w-5 h-5 text-gray-500" />
            <input
              className="w-full p-2 border border-gray-300 rounded dark:bg-gray-800 dark:text-white"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        )}

        <button
          onClick={usePassword ? loginWithPassword : loginWithOTP}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded w-full transition"
        >
          {usePassword ? 'Accedi con Password' : 'Invia Link di Accesso'}
        </button>

        <button
          onClick={() => setUsePassword(!usePassword)}
          className="text-blue-500 underline text-sm w-full"
        >
          {usePassword ? '↩️ Torna al login via email' : '🔑 Hai una password? Clicca qui'}
        </button>

        <button
          onClick={() => navigate('/')}
          className="text-gray-500 text-sm flex items-center justify-center gap-1"
        >
          <ArrowLeft className="w-4 h-4" /> Torna alla Home
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
