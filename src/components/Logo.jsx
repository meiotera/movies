import React from 'react';
import style from './Logo.module.css';

const Logo = () => {
  return (
    <div className={style.logo}>
      <h1>Movies</h1>
      <div className={style.play}></div>
    </div>
  );
};

export default Logo;
