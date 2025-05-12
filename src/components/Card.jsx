import React from 'react';
import style from './Card.module.css';

import { useFilmes } from '../context/MeusFilmesContext';

import { PiPopcornThin } from 'react-icons/pi';
import { HiVideoCamera } from 'react-icons/hi';
import { HiOutlineHeart } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const Card = ({ title, img, id }) => {
  const {
    addFilmeAssistido,
    addQueroAssistir,
    queroAssistir,
    assistidos,
    delFilmeAssistidos,
    delFilmeParaAssistir,
  } = useFilmes();

  function handleAssistido(id) {
    if (assistidos.includes(id)) {
      delFilmeAssistidos(id);
    } else {
      addFilmeAssistido(id);
    }
  }

  function handleParaAssistir(id) {
    if (queroAssistir.includes(id)) {
      delFilmeParaAssistir(id);
    } else {
      addQueroAssistir(id);
    }
  }

  return (
    <div className={style.card}>
      <div className={style.imagemContainer}>
        <img src={`https://image.tmdb.org/t/p/original${img}`} alt={title} />
      </div>
      <div className={style.btnContainer}>
        <PiPopcornThin
          className={`${style.btn} ${
            queroAssistir.includes(id) ? style.paraAssistir : ''
          }`}
          onClick={() => handleParaAssistir(id)}
        />

        <HiVideoCamera
          className={`${style.btn} ${
            assistidos.includes(id) ? style.assistido : ''
          }  `}
          onClick={() => handleAssistido(id)}
        />

        <HiOutlineHeart className={style.btn} />
      </div>
      <Link to={`/detalhes/${id}`} className={style.title}>
        {title}
      </Link>
    </div>
  );
};

export default Card;
