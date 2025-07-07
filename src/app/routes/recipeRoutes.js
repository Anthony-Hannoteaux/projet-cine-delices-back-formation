import express from 'express';
import { searchMovie } from '../services/movieService.js';
import Recipe from './models/Recipe.js';

const router = express.Router();

router.post('/recipes', async (req, res) => {
  const {
    id,
    title,
    description,
    difficulty,
    budget,
    servings,
    preparation_time,
    cook_time,
    story,
    picture,
    user_id,
    filmTitle
  } = req.body;

  try {
    // On cherche le film avec le titre donné
    const film = await searchMovie(filmTitle);
    const movieId = film.id;

    // On crée la recette avec l'ID TMDb récupéré
    const recette = new Recipe(
      id,
      title,
      description,
      difficulty,
      budget,
      servings,
      preparation_time,
      cook_time,
      story,
      picture,
      user_id,
      movieId
    );

    await recette.create();

    res.status(201).json({ message: 'Recette créée avec succès', movie_id: movieId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
