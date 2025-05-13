// /pages/api/filmes/detalhes/[id].js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  try {
    const key = process.env.TMDB_API_KEY;
    const { id } = req.query;

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=pt-BR`,
    );

    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    console.error('Erro ao buscar detalhes do filme:', error);
    res.status(500).json({ error: 'Erro ao buscar detalhes do filme' });
  }
}
