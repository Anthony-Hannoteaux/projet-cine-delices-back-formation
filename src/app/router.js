import express from "express";
import mainController from "./controllers/mainController.js";
import apiController from "./controllers/apiController.js";
import recipeController from "./controllers/recipeController.js";
import movieController from "./controllers/movieController.js";

// Création de notre routeur express
const router = express.Router();

// Activation du middleware express.json()
router.use(express.json());

// Route principale de l'application
router.get("/", mainController.home);

router.get("/catalogue", apiController.catalogue);

// Routes backend

router.get("/api/ping", (req, res) => {
  console.log("🎯 Backend a bien reçu GET /api/ping");
  res.json({ message: "pong" });
});


// Créer une recette
router.post('/api/recipes', recipeController.createRecipe);
// Récupérer toutes les recettes
router.get('/api/recipes', recipeController.getAllRecipes);
// Récupérer une recette par ID
router.get('/api/recipes/:id', recipeController.getOneRecipe);
// Modifier une recette par ID
router.patch('/api/recipes/:id', recipeController.updateRecipe);
// Supprimer une recette par ID
router.delete('/api/recipes/:id', recipeController.deleteRecipe);

// Autocomplétion des films (pour le formulaire d'ajout de recette)
router.get('/api/movies', movieController.autocomplete);




export default router;
