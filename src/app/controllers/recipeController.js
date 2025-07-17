import client from '../database.js';
import Recipe from '../models/Recipe.js';

const recipeController = {
  // Créer une nouvelle recette
  createRecipe: async (req, res) => {
    try {
      // Extraction et conversion des champs du body
      const title = req.body.title?.trim();
      const description = req.body.description?.trim();
      const difficulty = req.body.difficulty;
      const budget = req.body.budget;
      const category = req.body.category;

      // Les valeurs numériques sont converties avec parseInt(...) car req.body contient tout sous forme de chaînes
      const servings = parseInt(req.body.servings, 10) || 1;
      const preparation_time = parseInt(req.body.preparation_time, 10) || 0;
      const cook_time = parseInt(req.body.cook_time, 10) || 0;

      const story = req.body.story?.trim() || "";
      const movie_id = parseInt(req.body.movie_id, 10);

      // Parse des tableaux envoyés en JSON en tableaux JavaScript réels
      // Cela permet d’enregistrer plusieurs lignes
      const ingredients = JSON.parse(req.body.ingredients);
      const steps = JSON.parse(req.body.steps);

      // Gestion du fichier image
      // Grâce à multer, l’image est interceptée comme un fichier
      // On extrait le nom du fichier pour pouvoir le stocker en BDD
      let picture = null;
      if (req.file) {
        picture = req.file.filename;
      }

      // Instanciation de la recette
      const recette = new Recipe(
        null, title, description, difficulty, budget,
        servings, preparation_time, cook_time, story,
        picture, movie_id, category, ingredients, steps
      );

      // On associe l'ID de l'utilisateur à la recette
      // req.user est défini par le middleware d'authentification
      recette.user_id = req.user.id;

      // Vérification de l'authentification de l'utilisateur
      // Si l'utilisateur n'est pas authentifié, on renvoie une erreur 401
      if (!req.user || !req.user.id) {
        return res.status(401).json({ error: "Utilisateur non authentifié" });
      }

      // Insertion en BDD
      const result = await recette.create();

      res.status(201).json({
        message: 'Recette créée avec succès',
        inserted: result
      });

    } catch (error) {
      console.error("Erreur createRecipe:", error);
      res.status(500).json({ error: error.message || "Erreur lors de la création de la recette" });
    }
  },


  // Lire toutes les recettes
  getAllRecipes: async (req, res) => {
    try {
        // Appel à la méthode statique findAll() du modèle Recipe
      const recipes = await Recipe.findAll();
      // on stocke dans une variable la liste des recettes
      const enhancedRecipes = recipes.map((recipe) => {
        const isFullUrl = recipe.picture.startsWith("http://") || recipe.picture.startsWith("https://");
      return {
        // On enrichit chaque recette avec l'URL de la photo
        ...recipe,
        // Si l'URL de la photo est déjà complète, on l'utilise telle quelle (cas des images stockées en BDD lors du seeding initial)
        picture_url: isFullUrl
          // Sinon, on la construit avec le chemin local (cas des images uploadées par les utilisateurs)
          ? recipe.picture
          : `http://localhost:3000/uploads/${recipe.picture}`
      };
    });
      // On renvoie les recettes enrichies au format JSON
      res.status(200).json(enhancedRecipes);
      // Gestion d'erreur
    } catch (error) {
      console.error(' getAllRecipes:', error);
      res.status(500).json({ error: 'Erreur lors de la récupération des recettes' });
    }
  },

  // Lire une recette par ID (meme construction que getAllRecipes)
  getOneRecipe: async (req, res) => {
    try {
      const recipeId = parseInt(req.params.id, 10);
      const recipe = await Recipe.findById(recipeId);
      if (!recipe) {
        return res.status(404).json({ error: 'Recette non trouvée' });
      }
      res.status(200).json(recipe);
    } catch (error) {
      console.error(' getOneRecipe:', error);
      res.status(500).json({ error: 'Erreur lors de la récupération de la recette' });
    }
  },

  // Lire les recettes d'un utilisateur authentifié
  getMyRecipes: async (req, res) => {
  try {
    const userId = req.user.id;

    const query = `
      SELECT
        recipe.title,
        recipe.description,
        recipe.difficulty,
        recipe.budget,
        recipe.created_at,
        movie.title AS movie_title
      FROM recipe
      JOIN movie ON recipe.movie_id = movie.id
      WHERE recipe.user_id = $1
      ORDER BY recipe.created_at DESC;
    `;
    const result = await client.query(query, [userId]);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Erreur getMyRecipes:", error);
    res.status(500).json({ error: "Erreur lors de la récupération des recettes" });
  }
},

  // Mettre à jour une recette
updateRecipe: async (req, res) => {
  try {
    // On extrait l'identifiant de la recette depuis l'URL
    const recipeId = parseInt(req.params.id, 10);
    // On récupère l'instance Recipe correspondant à cet ID depuis la BDD
    const recipe = await Recipe.findById(recipeId);

    // Mise à jour dynamique des propriétés présentes dans req.body
    for (const prop in req.body) {
      if (
        // Vérifie que la propriété existe bien dans l’objet
        recipe[prop] !== undefined &&
        // ET qu’elle est bien fournie dans le body
        req.body[prop] !== undefined &&
        // ET que la nouvelle valeur est différente de l’ancienne
        req.body[prop] !== recipe[prop]
      ) {
        // Alors, on remplace l'ancienne valeur par la nouvelle
        recipe[prop] = req.body[prop];
      }
    }

    // Sauvegarde en BDD via la méthode d’instance `update()`
    const updated = await recipe.update();
    // Recharge la recette fraîchement mise à jour
    const refreshedRecipe = await Recipe.findById(recipe.id);
    // Renvoi des recettes au format JSON
    res.status(200).json({ message: 'Recette mise à jour', modified: updated, data: refreshedRecipe });
    // Gestion d'erreur
  } catch (error) {
    console.error('updateRecipe:', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour de la recette' });
  }
},


  // Supprimer une recette (meme construction que updateRecipe)
  deleteRecipe: async (req, res) => {
  try {
    const recipeId = parseInt(req.params.id, 10);
    const recipe = await Recipe.findById(recipeId);

    const deleted = await recipe.delete();
    res.status(200).json({ message: 'Recette supprimée', removed: deleted });
  } catch (error) {
    console.error('deleteRecipe:', error);
    res.status(500).json({ error: 'Erreur lors de la suppression de la recette' });
  }
}
};

export default recipeController;
