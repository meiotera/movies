import fetch from 'node-fetch';

export default async function handler(req, res) {
  try {
    const key = process.env.TMDB_API_KEY;
    const idsParams = req.query.ids;
    const ids = idsParams.split(',');

    const filmes = await Promise.all(
      ids.map(async (id) => {
        const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=pt-BR`;
        const response = await fetch(url);
        return response.json();
      }),
    );

    res.status(200).json(filmes);
  } catch (error) {
    console.error('Erro ao buscar filmes:', error);
    res.status(500).json({ error: 'Erro ao buscar filmes' });
  }
}
