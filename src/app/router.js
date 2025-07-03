import express from "express";
import mainController from "./controllers/mainController.js";
import apiController from "./controllers/apiController.js";
import recipeController from "./controllers/recipeController.js";

// Création de notre routeur express
const router = express.Router();

// Activation du middleware express.json()
router.use(express.json());

// Route principale de l'application
router.get("/", mainController.home);

router.get("/catalogue", apiController.catalogue);

// Routes backend
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

// routes pour les étapes
router.post('/api/steps', stepController.createStep);
router.get('/api/steps', stepController.getAllSteps);
router.get('/api/steps/:id', stepController.getStep);
router.patch('/api/steps/:id', stepController.updateStep);
router.delete('/api/steps/:id', stepController.deleteStep);

export default router;
