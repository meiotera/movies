import fetch from 'node-fetch';

export default async function handler(req, res) {
  try {
    const key = process.env.TMDB_API_KEY;
    const page = req.query.page || 1;
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=pt-BR&page=${page}`;
    const response = await fetch(url);
    const data = await response.json();

    res.status(200).json(data);
  } catch (err) {
    console.error('Erro ao buscar filmes:', err);
    res.status(500).json({ error: 'Erro ao buscar filmes' });
  }
}
