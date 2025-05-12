import { Link, Outlet } from 'react-router-dom';
import Header from './components/Header';

import { MeusFilmesProvider } from './context/MeusFilmesContext';
import Footer from './components/Footer';

function App() {
  return (
    <MeusFilmesProvider>
      <Header />
      <Outlet />
      <Footer />
    </MeusFilmesProvider>
  );
}

export default App;
