import express from "express";
import multer from "multer";

import mainController from "./controllers/mainController.js";
import userController from "./controllers/userController.js";
import authController from "./controllers/authController.js";
import apiController from "./controllers/apiController.js";
import categoryController from "./controllers/categoryController.js";
import recipeController from "./controllers/recipeController.js";
import movieController from "./controllers/movieController.js";
import stepController from "./controllers/stepController.js";
import genreController from "./controllers/genreController.js";

import authenticateUser from "./middlewares/authMiddleware.js";

// Création de notre routeur express
const router = express.Router();

// Configuration de Multer pour stocker les fichiers uploadés dans le dossier "uploads/"
const upload = multer({ dest: "uploads/" });

// Route principale de l'application
router.get("/", mainController.home);

// Route POST pour la connexion
router.post("/api/auth/login", authController.login)

router.get("/catalogue", apiController.catalogue);


    //USERS
// Créer un utilisateur
router.post("/api/users/", userController.createNewUser);
// Récupérer tous les utilisateurs
router.get("/api/users", userController.getAllUser);
// Récupérer un utilisateur par ID
router.get("/api/users/id/:id", userController.getUserById);
// Récupérer un utilisateur par email
router.get("/api/users/email/:email", userController.getUserByEmail);
// Récupérer l'utilisateur authentifié
router.get("/api/users/me", authenticateUser, userController.getMe);
// Modifier un utilisateur
router.patch("/api/users/:id", userController.updateUser);
// Supprimer un utilisateur
router.delete("/api/users/:id", userController.delete);

    //RECETTES
// Créer une recette
router.post("/api/recipes", authenticateUser, upload.single("picture"), recipeController.createRecipe);
// Récupérer toutes les recettes
router.get('/api/recipes', recipeController.getAllRecipes);
// Récupérer une recette par ID
router.get('/api/recipes/:id', recipeController.getOneRecipe);
// Modifier une recette par ID
router.patch('/api/recipes/:id', recipeController.updateRecipe);
// Supprimer une recette par ID
router.delete('/api/recipes/:id', recipeController.deleteRecipe);

    //MOVIES
// Autocomplétion des films (pour le formulaire d'ajout de recette)
router.get('/api/movies', movieController.autocomplete);

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
