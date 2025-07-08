import express from "express";
import mainController from "./controllers/mainController.js";
import userController from "./controllers/userController.js";
import authController from "./controllers/authController.js";
import apiController from "./controllers/apiController.js";
import categoryController from "./controllers/categoryController.js";
import recipeController from "./controllers/recipeController.js";
import stepController from "./controllers/stepController.js";
import genreController from "./controllers/genreController.js";

// Création de notre routeur express
const router = express.Router();

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


// ROUTES BACKEND

    // RECETTES
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

    //CATEGORIES
// Créer une catégorie
router.post("/api/categories", categoryController.createCategory);
// Récupérer toutes les catégories
router.get("/api/categories", categoryController.getAllCategory);
// Récupérer une catégorie par ID
router.get("/api/categories/:id", categoryController.getCategoryById);
// Modifier une catégorie par ID
// patch et non put car on veut modifier une catégorie en particulier
router.patch("/api/categories/:id", categoryController.updateCategory);
// Supprimer une catégorie par ID
router.delete("/api/categories/:id", categoryController.deleteCategory);

    // ETAPES
// Créer une étape
router.post('/api/steps', stepController.createStep);
// Récupérer toutes les étapes
router.get('/api/steps', stepController.getAllSteps);
// Récupérer une étape par ID
router.get('/api/steps/:id', stepController.getStepById);
// Modifier une étape par ID
router.patch('/api/steps/:id', stepController.updateStep);
// Supprimer une étape par ID
router.delete('/api/steps/:id', stepController.deleteStep);

    // GENRES
// Créer un genre
router.post('/api/genres', genreController.createGenre);
// Récupérer tous les genres
router.get('/api/genres', genreController.getAllGenres);
// Récupérer un genre par ID
router.get('/api/genres/:id', genreController.getGenreById);
// Modifier un genre par ID
router.patch('/api/genres/:id', genreController.updateGenre);
// Supprimer un genre par ID
router.delete('/api/genres/:id', genreController.deleteGenre);



export default router;
