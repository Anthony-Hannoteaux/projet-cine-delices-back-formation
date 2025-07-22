import client from "../database.js";


const searchController = {
  // Recherche globale dans les recettes et les films
  searchAll: async (req, res) => {
    try {
      // Récupération du terme de recherche depuis les query parameters
      const { q } = req.query;

      // Vérification que le terme est présent
      if (!q || q.trim() === "") {
        return res.status(400).json({ error: "Le terme de recherche est requis." });
      }

      // Requête SQL pour les recettes
      const recipeQuery = `
        SELECT id, title, picture
        FROM recipe
        WHERE title ILIKE '%' || $1 || '%'
      `;
      const recipeResult = await client.query(recipeQuery, [q]);

      // Requête SQL pour les films
      const movieQuery = `
        SELECT id, title, poster_path
        FROM movie
        WHERE title ILIKE '%' || $1 || '%'
      `;
      const movieResult = await client.query(movieQuery, [q]);

      // Construction de la réponse
      return res.status(200).json({
        message: "Résultats trouvés avec succès.",
        recipes: recipeResult.rows,
        movies: movieResult.rows
      });
    } catch (error) {
      console.error("Erreur searchAll :", error);
      return res.status(500).json({ error: "Erreur serveur durant la recherche." });
    }
  }
};

export default searchController;

