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
      const servings = parseInt(req.body.servings, 10) || 0;
      const preparation_time = parseInt(req.body.preparation_time, 10) || 0;
      const cook_time = parseInt(req.body.cook_time, 10) || 0;

      const story = req.body.story?.trim() || "";
      const user_id = parseInt(req.body.user_id, 10);
      const movie_id = parseInt(req.body.movie_id, 10);

      // Parse des tableaux envoyés en JSON en tableaux JavaScript réels
      // Cela permet d’enregistrer plusieurs lignes
      const ingredients = JSON.parse(req.body.ingredients || "[]");
      const steps = JSON.parse(req.body.steps || "[]");

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
        picture, user_id, movie_id, category, ingredients, steps
      );

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
      // Renvoi des recettes au format JSON
      res.status(200).json(recipes);
      // Gestion d'erreur
    } catch (error) {
      console.error(' getAllRecipes:', error);
      res.status(500).json({ error: 'Erreur lors de la récupération des recettes' });
    }
  },

  // 📘 Lire une recette par ID (meme construction que getAllRecipes)
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
