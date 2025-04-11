import React, { useState } from 'react';
import { supabase } from '../../supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (!error) alert('🔑 Controlla la tua email per accedere!');
  };

  return (
    <div className="p-4 max-w-md mx-auto mt-10 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-center">Login Amministratore</h2>
      <input
        className="w-full p-2 border mb-4 rounded"
        type="email"
        placeholder="Inserisci email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className="bg-red-600 text-white px-4 py-2 w-full rounded" onClick={handleLogin}>
        Invia link di accesso
      </button>
    </div>
  );
}
