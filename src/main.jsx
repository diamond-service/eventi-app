<<<<<<< HEAD
import React from 'react'; import ReactDOM from 'react-dom/client'; import { BrowserRouter, Routes, Route } from 'react-router-dom'; import App from './pages/App'; import EventDetails from './pages/EventDetails'; import AdminLogin from './pages/AdminLogin'; import AdminPanel from './pages/AdminPanel'; ReactDOM.createRoot(document.getElementById('root')).render(<React.StrictMode><BrowserRouter><Routes><Route path="/" element={<App />} /><Route path="/evento/:id" element={<EventDetails />} /><Route path="/login" element={<AdminLogin />} /><Route path="/admin" element={<AdminPanel />} /></Routes></BrowserRouter></React.StrictMode>);
=======
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './pages/App';
import EventDetails from './pages/EventDetails';
import AdminLogin from './pages/AdminLogin';
import AdminPanel from './pages/AdminPanel';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/evento/:id" element={<EventDetails />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
>>>>>>> 8870bc24a258d90e37240848134d2e882fc8ec4e
