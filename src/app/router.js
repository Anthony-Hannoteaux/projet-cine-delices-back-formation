import express from "express";
import multer from "multer";
import mainController from "./controllers/mainController.js";
import apiController from "./controllers/apiController.js";
import recipeController from "./controllers/recipeController.js";
import movieController from "./controllers/movieController.js";

// Création de notre routeur express
const router = express.Router();

const upload = multer({ dest: "uploads/" });

// Activation du middleware express.json()
router.use(express.json());

// Route principale de l'application
router.get("/", mainController.home);

router.get("/catalogue", apiController.catalogue);

// Routes backend

// Créer une recette
router.post("/api/recipes", upload.single("picture"), recipeController.createRecipe);
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
