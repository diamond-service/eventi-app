import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

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
    navigate('/admin'); // ✅ vai al pannello
    } else {
    alert('❌ Login fallito: ' + error.message);
    }
    };

  return (
    <div className="p-4 max-w-md mx-auto mt-10 bg-white shadow rounded-xl">
      <h2 className="text-xl font-bold mb-4 text-center">🔐 Login Amministratore</h2>

      <div className="space-y-3">
        <input
          className="w-full p-2 border rounded"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {usePassword && (
          <input
            className="w-full p-2 border rounded"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        )}

        <button
          onClick={usePassword ? loginWithPassword : loginWithOTP}
          className="bg-red-600 text-white px-4 py-2 w-full rounded"
        >
          {usePassword ? 'Accedi con Password' : 'Invia link di accesso'}
        </button>

        <button
          className="text-sm text-blue-500 underline w-full mt-2"
          onClick={() => setUsePassword(!usePassword)}
        >
          {usePassword ? '↩️ Torna a login via Email' : '🔑 Hai una password? Clicca qui'}
        </button>
      </div>
    </div>
  );
}
