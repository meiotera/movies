import fetch from 'node-fetch';

export default async function handler(req, res) {
  try {
    const nomeFilme = req.body.nome;
    const page = req.body.page || 1;
    const key = process.env.TMDB_API_KEY;

    const url = `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=pt-BR&page=${page}&query=${encodeURIComponent(
      nomeFilme,
    )}`;
    const response = await fetch(url);
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    console.error('Erro ao buscar filmes:', error);
    res.status(500).json({ error: 'Erro ao buscar filmes' });
  }
}
