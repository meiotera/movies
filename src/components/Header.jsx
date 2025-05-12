import React from 'react';
import { Link } from 'react-router-dom';
import style from './Header.module.css';
import Logo from './Logo';

const Header = () => {
  return (
    <header className={style.navbar}>
      <Logo />

      <nav className={style.links}>
        <Link to="/">Home</Link>
        <Link to="/meus-filmes">Meus Filmes</Link>
      </nav>
    </header>
  );
};

export default Header;
