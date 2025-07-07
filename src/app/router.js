import express from "express";
import mainController from "./controllers/mainController.js";
import userController from "./controllers/userController.js";
import authController from "./controllers/authController.js";
import apiController from "./controllers/apiController.js";
import recipeController from "./controllers/recipeController.js";

// Création de notre routeur express
const router = express.Router();

/**
 * Utilisation du middleware express.json()
 * Permet l'analyse du corps de nos requêtes
 */
router.use(express.json());

// Route principale de l'application
router.get("/", mainController.home);

// Routes API pour la gestion du CRUD du modèle User
// Routes GET
router.get("/api/users", userController.getAllUser);
router.get("/api/users/id/:id", userController.getUserById);
router.get("/api/users/email/:email", userController.getUserByEmail);
// Route POST
router.post("/api/users/", userController.createNewUser);
// Route PATCH
router.patch("/api/users/:id", userController.updateUser);
// Route DELETE
router.delete("/api/users/:id", userController.delete);

// Route API dédié à l'authentification
// Route POST pour la connexion
router.post("/api/auth/login", authController.login)

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

export default router;
