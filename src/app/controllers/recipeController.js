import Recipe from '../models/Recipe.js';

const recipeController = {
  // Créer une nouvelle recette
  createRecipe: async (req, res) => {
    // On récupère les propriétés attendues depuis le body de la requête
    try {
      const {
        title, description, difficulty, budget, servings,
        preparation_time, cook_time, story, picture,
        user_id, movie_id
      } = req.body;

      // On instancie une nouvelle recette avec les données reçues
      const recette = new Recipe(
        null, title, description, difficulty, budget,
        servings, preparation_time, cook_time, story,
        picture, user_id, movie_id
      );

      // On appelle la méthode d’instance create() pour insérer la recette en base
      const result = await recette.create();
      // Renvoi des recettes au format JSON
      res.status(201).json({ message: 'Recette créée avec succès', inserted: result });
      // Gestion d'erreur
    } catch (error) {
      console.error('createRecipe:', error);
      res.status(500).json({ error: 'Erreur lors de la création de la recette' });
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
