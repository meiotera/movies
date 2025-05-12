import React, { createContext, useContext, useEffect, useState } from 'react';

const MeusFilmesContext = createContext();

function MeusFilmesProvider({ children }) {
  const [assistidos, setAssistidos] = useState([]);
  const [queroAssistir, setQueroAssistir] = useState([]);

  useEffect(() => {
    const filmesAssistidos = JSON.parse(localStorage.getItem('assistidos'));
    const filmesQueroAssistir = JSON.parse(
      localStorage.getItem('paraAssistir'),
    );

    if (filmesAssistidos) setAssistidos(filmesAssistidos);
    if (filmesQueroAssistir) setQueroAssistir(filmesQueroAssistir);
  }, []);

  const addFilmeAssistido = (filmeId) => {
    if (Number(filmeId)) {
      setAssistidos((prev) => {
        const novoArray = [...new Set([...prev, filmeId])];
        localStorage.setItem('assistidos', JSON.stringify(novoArray));

        return novoArray;
      });
    }
  };

  const delFilmeAssistidos = (filmeId) => {
    if (Number(filmeId)) {
      const filmesRestantes = assistidos.filter((id) => filmeId !== id);

      setAssistidos(filmesRestantes);
      localStorage.setItem('assistidos', JSON.stringify(filmesRestantes));
    }
  };

  const delFilmeParaAssistir = (filmeId) => {
    if (Number(filmeId)) {
      const filmesRestantes = queroAssistir.filter((id) => filmeId !== id);

      setQueroAssistir(filmesRestantes);
      localStorage.setItem('paraAssistir', JSON.stringify(filmesRestantes));
    }
  };

  const addQueroAssistir = (filmeId) => {
    if (Number(filmeId)) {
      setQueroAssistir((prev) => {
        const novoArray = [...new Set([...prev, filmeId])];
        localStorage.setItem('paraAssistir', JSON.stringify(novoArray));

        return novoArray;
      });
    }
  };

  return (
    <MeusFilmesContext.Provider
      value={{
        assistidos,
        queroAssistir,
        addFilmeAssistido,
        addQueroAssistir,
        delFilmeAssistidos,
        delFilmeParaAssistir,
      }}
    >
      {children}
    </MeusFilmesContext.Provider>
  );
}

function useFilmes() {
  const context = useContext(MeusFilmesContext);

  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { MeusFilmesProvider, useFilmes };
