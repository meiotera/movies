import React, { useEffect, useState } from 'react';

import Slides from '../components/Slides';
import style from './Home.module.css';
import Card from '../components/Card';
import { CiCircleChevRight, CiCircleChevLeft } from 'react-icons/ci';
import Loading from '../components/Loading';

const Home = () => {
  const [filmes, setFilmes] = useState([]);
  const [popular, setPopular] = useState([]);
  const [page, setPage] = useState(1);
  const [nomeFilme, setNomeFilme] = useState('');
  const [filmeEncontrado, setFilmeEncontrado] = useState([]);
  const [loading, setLoading] = useState(true);

  const filmesCinemaAgora = async () => {
    setLoading(true);
    const response = await fetch('/api/filmes/filmesDestaques');
    const data = await response.json();

    setFilmes(data.results);
    setFilmeEncontrado([]);
    setLoading(false);
  };

  const filmesPopulares = async (pagina = 1) => {
    setLoading(true);
    const response = await fetch(`/api/filmes/filmesPopulares?page=${pagina}`);
    const data = await response.json();
    setPopular(data.results);
    setFilmeEncontrado([]);
    setLoading(false);
  };

  const buscarFilme = async (nomeFilme) => {
    setLoading(true);
    const response = await fetch(`/api/filmes/buscar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome: nomeFilme, page }),
    });
    const data = await response.json();
    setFilmeEncontrado(data.results);
    setLoading(false);
  };

  const poster = filmes.map((filme) => ({
    poster: filme.backdrop_path,
    title: filme.title,
    vote_average: filme.vote_average,
  }));

  useEffect(() => {
    filmesCinemaAgora();
  }, []);

  useEffect(() => {
    if (!nomeFilme.trim()) {
      filmesPopulares(page);
    } else {
      buscarFilme(nomeFilme);
    }
  }, [page]);

  function handleBuscarFilme(e) {
    e.preventDefault();
    setPage(1);
    buscarFilme(nomeFilme);
  }

  return (
    <div className={style.home}>
      {loading ? (
        <div className={style.loadingContainer}>
          <Loading />
        </div>
      ) : (
        <>
          <Slides posters={poster} />

          <div className={style.pagination}>
            <form method="post" onSubmit={handleBuscarFilme}>
              <label htmlFor="pesquisar" className={style.pesquisar}>
                <input
                  type="text"
                  name="pesquisar"
                  id="pesquisar"
                  value={nomeFilme}
                  placeholder="Informe o nome do Filme"
                  onChange={(e) => setNomeFilme(e.target.value)}
                />
                <button type="submit">Pesquisar</button>
              </label>
            </form>

            <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>
              <CiCircleChevLeft />
            </button>
            <span>Página {page}</span>
            <button onClick={() => setPage((prev) => prev + 1)}>
              <CiCircleChevRight />
            </button>
          </div>

          <div className={style.cardsContainer}>
            {(filmeEncontrado.length ? filmeEncontrado : popular).map(
              (filme) => (
                <Card
                  key={filme.id}
                  title={filme.title}
                  img={filme.poster_path}
                  id={filme.id}
                />
              ),
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
