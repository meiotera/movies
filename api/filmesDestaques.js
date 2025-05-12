import fetch from 'node-fetch';
export default async function handler(req, res) {
  try {
    const key = process.env.TMDB_API_KEY;
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=pt-BR`;
    const response = await fetch(url);
    const data = await response.json();

    res.status(200).json(data);
  } catch (err) {
    console.error('Erro ao buscar filmes:', err);
    res.status(500).json({ error: 'Erro ao buscar filmes' });
  }
}
