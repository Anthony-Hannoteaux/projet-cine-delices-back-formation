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

                                                        
// FILMS ET SÉRIES                                      
// Récupération de tous les films et séries de la BDD   
router.get("/api/movies", movieController.getAllMovies);
                                                        
// Récupérer un film par l'id                           
router.get("/api/movies/:id", movieController.getMovieById);
                                                        
// Ajout d'un film ou d'une série                       
router.post("/api/movies", movieController.createMovie);
                                                        
// Modifier un film par l'id                            
router.patch("/api/movies/:id", movieController.updateMovie);
                                                        
// Supprimer un film par l'id                           
router.delete("/api/movies/:id", movieController.deleteMovie);
                                                        
export default router;                                  
                                                        