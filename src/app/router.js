import express from "express";
import mainController from "./controllers/mainController.js";
import authController from "./controllers/authController.js";
import apiController from "./controllers/apiController.js";

// Création de notre routeur express
const router = express.Router();

// Route principale de l'application
router.get("/", mainController.home);

// Routes API pour la gestion du CRUD du modèle User
// Routes GET
router.get("/api/users", authController.getAllUser);
router.get("/api/users/:id", authController.getUserById);

// Route POST
router.post("/api/users/", authController.createNewUser);

// Route PATCH
router.patch("/api/users/:id", authController.updateUser);

// Route DELETE
router.delete("/api/users/:id", authController.delete);

router.get("/catalogue", apiController.catalogue);

export default router;
