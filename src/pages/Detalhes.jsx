import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import styles from './Detalhes.module.css';
import Loading from '../components/Loading';

const Detalhes = () => {
  const { id } = useParams();
  const [filmeDetalhes, setFilmeDetalhes] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getDetalhes() {
      setLoading(true);
      try {
        const response = await fetch(`/api/filmes/detalhes/${id}`);
        const data = await response.json();
        setFilmeDetalhes(data);
      } catch (error) {
        console.error('Erro ao buscar detalhes do filme:', error);
      } finally {
        setLoading(false);
      }
    }
    getDetalhes();
  }, [id]);

  if (loading) return <Loading />;

  if (!filmeDetalhes) return <p>Não foi possível carregar os detalhes.</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{filmeDetalhes.title}</h1>
      <div className={styles.imgContainer}>
        <img
          src={`https://image.tmdb.org/t/p/original${filmeDetalhes.backdrop_path}`}
          alt={filmeDetalhes.title}
          className={styles.poster}
        />
      </div>

      <div className={styles.detalhesContainer}>
        <p className={styles.info}>
          <span className={styles.label}>Sinopse:</span>{' '}
          {filmeDetalhes.overview}
        </p>
        <p className={styles.info}>
          <span className={styles.label}>Lançamento:</span>{' '}
          {filmeDetalhes.release_date}
        </p>
        <p className={styles.info}>
          <span className={styles.label}>Duração:</span> {filmeDetalhes.runtime}{' '}
          minutos
        </p>
        {filmeDetalhes.vote_average > 0 && (
          <p className={styles.info}>
            <span className={styles.label}>Nota:</span>{' '}
            {filmeDetalhes.vote_average}
          </p>
        )}
        <p className={styles.info}>
          <span className={styles.label}>Gêneros:</span>{' '}
          {filmeDetalhes.genres.map((g) => g.name).join(', ')}
        </p>
        <p className={styles.info}>
          <span className={styles.label}>Orçamento:</span>{' '}
          {filmeDetalhes.budget === 0
            ? 'Sem informações sobre orçamento'
            : ` $${filmeDetalhes.budget.toLocaleString()}`}
        </p>
        <p className={styles.info}>
          <span className={styles.label}>Produzido por:</span>{' '}
          {filmeDetalhes.production_companies
            .map((companie) => companie.name)
            .join(', ')}
        </p>
        {filmeDetalhes.homepage !== '' ? (
          <a
            className={styles.link}
            href={filmeDetalhes.homepage}
            target="_blank"
            rel="noopener noreferrer"
          >
            Site oficial
          </a>
        ) : null}
      </div>
    </div>
  );
};

export default Detalhes;
