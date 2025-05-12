import React, { useEffect, useState } from 'react';
import { useFilmes } from '../context/MeusFilmesContext';

import styles from './MeusFilmes.module.css';

import Card from '../components/Card';
import Loading from '../components/Loading';

const MeusFilmes = () => {
  const { assistidos, queroAssistir } = useFilmes();
  const [filmesAssistidos, setFilmesAssistidos] = useState([]);
  const [porAssistir, setPorAssistir] = useState([]);
  const [loadingAssistidos, setLoadingAssistidos] = useState(true);
  const [loadingPorAssistir, setLoadingPorAssistir] = useState(true);

  useEffect(() => {
    const querys = assistidos.join(',');

    async function getFilmes() {
      setLoadingAssistidos(true);
      const response = await fetch(`/api/filmes/meusFilmes?ids=${querys}`);
      const data = await response.json();

      setFilmesAssistidos(data);
      setLoadingAssistidos(false);
    }

    if (!assistidos || assistidos.length === 0) {
      setLoadingAssistidos(false);
      return;
    }

    getFilmes();
  }, [assistidos]);

  useEffect(() => {
    const querys = queroAssistir.join(',');

    async function getFilmes() {
      setLoadingPorAssistir(true);
      const response = await fetch(`/api/filmes/meusFilmes?ids=${querys}`);
      const data = await response.json();

      setPorAssistir(data);
      setLoadingPorAssistir(false);
    }

    if (!queroAssistir || queroAssistir.length === 0) {
      setLoadingPorAssistir(false);
      return;
    }

    getFilmes();
  }, [queroAssistir]);

  return (
    <div className={styles.container}>
      <div className={styles.assistidos}>
        <h2>Filmes já assistidos</h2>
        {loadingAssistidos ? (
          <Loading />
        ) : (
          <div className={styles.cards}>
            {assistidos.length < 1 ? (
              <p className={styles.msg}>Sem filmes até o momento</p>
            ) : (
              filmesAssistidos.map((filme) => (
                <Card
                  key={filme.id}
                  title={filme.title}
                  img={filme.poster_path}
                  id={filme.id}
                />
              ))
            )}
          </div>
        )}
      </div>

      <div className={styles.porAssistir}>
        <h2>Filmes para assistir</h2>
        {loadingPorAssistir ? (
          <Loading />
        ) : (
          <div className={styles.cards}>
            {queroAssistir.length < 1 ? (
              <p className={styles.msg}>Sem filmes até o momento</p>
            ) : (
              porAssistir.map((filme) => (
                <Card
                  key={filme.id}
                  title={filme.title}
                  img={filme.poster_path}
                  id={filme.id}
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MeusFilmes;
