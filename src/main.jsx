import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css';
import App from './App.jsx';
import Home from './pages/Home.jsx';
import Detalhes from './pages/Detalhes.jsx';
import MeusFilmes from './pages/MeusFilmes.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<Home />} />
          <Route path="/detalhes/:id" element={<Detalhes />} />
          <Route path="/meus-filmes" element={<MeusFilmes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
