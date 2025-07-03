import express from "express";
import mainController from "./controllers/mainController.js";
import apiController from "./controllers/apiController.js";
import categoryController from "./controllers/categoryController.js";
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

// route spécifique aux catégories
router.post("/api/categories", categoryController.createCategory);
router.get("/api/categories", categoryController.getAllCategory);
router.get("/api/categories/:id", categoryController.getCategoryById);
// patch et non put car on veut modifier une catégorie en particulier
router.patch("/api/categories/:id", categoryController.updateCategory);
router.delete("/api/categories/:id", categoryController.deleteCategory);

export default router;
