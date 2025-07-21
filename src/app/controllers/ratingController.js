import client from "../database.js";
import Recipe from "../models/Recipe.js";

const ratingController = {
  // Noter une recette
  rateRecipe: async (req, res) => {
    try {
      const recipeId = parseInt(req.params.id, 10);
        // Récupère l'ID de l'utilisateur depuis le token JWT
      const userId = req.user?.id;
        // Vérifie que l'utilisateur est authentifié
      const rating = parseFloat(req.body.rating);
        // Récupère la note précédente de l'utilisateur pour cette recette
      const previousRating = parseFloat(req.body.previousRating);


      // Vérifications basiques (utiles pour la robustesse du backend, meme si le frontend est bien conçu)
      if (!userId) {
        return res.status(401).json({ error: "Utilisateur non authentifié." });
      }
      if (!recipeId || isNaN(recipeId)) {
        return res.status(400).json({ error: "ID de recette invalide." });
      }
      if (isNaN(rating) || rating < 0 || rating > 5) {
        return res.status(400).json({ error: "Note invalide. Doit être entre 0 et 5." });
      }

      let query;
      let params;

      if (!isNaN(previousRating)) {
        // L'utilisateur modifie sa note
        query = `
          UPDATE recipe
          SET rating_sum = rating_sum - $1 + $2
          WHERE id = $3
          RETURNING rating_sum, rating_count
        `;
        params = [previousRating, rating, recipeId];
      } else {
        // Premier vote
        query = `
          UPDATE recipe
          SET rating_sum = rating_sum + $1,
              rating_count = rating_count + 1
          WHERE id = $2
          RETURNING rating_sum, rating_count
        `;
        params = [rating, recipeId];
      }

      const result = await client.query(query, params);

      // Vérifie que la recette existe bien
      if (result.rowCount === 0) {
        return res.status(404).json({ error: "Recette non trouvée." });
      }
      
      // Calcule la note moyenne
      const { rating_sum, rating_count } = result.rows[0];
      const average_rating = (rating_sum / rating_count).toFixed(2);

      res.status(200).json({
        message: previousRating
          ? "Note mise à jour avec succès."
          : "Note enregistrée avec succès.",
        rating,
        average_rating,
        total_votes: rating_count
      });
    } catch (error) {
      console.error("Erreur rateRecipe:", error);
      res.status(500).json({
        error: error.message || "Erreur lors de la notation de la recette."
      });
    }
  }
};

export default ratingController;
