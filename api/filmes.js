import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config({ path: './api/.env' });

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3001;
const key = process.env.TMDB_API_KEY;

app.use(cors());

app.get('/api/filmes/filmesDestaques', async (req, res) => {
  try {
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=pt-BR`;
    const response = await fetch(url);
    const data = await response.json();

    res.json(data);
  } catch (err) {
    console.error('Erro ao buscar filmes:', err);
    res.status(500).json({ error: 'Erro ao buscar filmes' });
  }
});

app.get('/api/filmes/detalhes/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=pt-BR`;
    const response = await fetch(url);
    const data = await response.json();

    console.log(id);

    res.json(data);
  } catch (error) {
    console.error('Erro ao buscar filmes:', error);
    res.status(500).json({ error: 'Erro ao buscar filmes' });
  }
});

app.get('/api/filmes/filmesPopulares', async (req, res) => {
  try {
    const page = req.query.page || 1;
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=pt-BR&page=${page}`;
    const response = await fetch(url);
    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error('Erro ao buscar filmes:', error);
    res.status(500).json({ error: 'Erro ao buscar filmes' });
  }
});

app.get('/api/filmes/meus-filmes', async (req, res) => {
  try {
    const idsParams = req.query.ids;

    const ids = idsParams.split(',');

    const filmes = await Promise.all(
      ids.map(async (id) => {
        const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=pt-BR`;
        const response = await fetch(url);
        return response.json();
      }),
    );

    res.json(filmes);
  } catch (error) {
    console.error('Erro ao buscar filmes:', error);
    res.status(500).json({ error: 'Erro ao buscar filmes' });
  }
});

app.post('/api/filmes/buscar', async (req, res) => {
  try {
    const nomeFilme = req.body.nome;
    const page = req.body.page || 1;

    const url = `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=pt-BR&page=${page}&query=${encodeURIComponent(
      nomeFilme,
    )}`;
    const response = await fetch(url);
    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error('Erro ao buscar filmes:', error);
    res.status(500).json({ error: 'Erro ao buscar filmes' });
  }
});

// Exporta para funcionar na Vercel
export default (req, res) => {
  app(req, res);
};

// Funciona localmente
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Servidor rodando localmente em http://localhost:${PORT}`);
  });
}
