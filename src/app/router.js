import express from "express";
import mainController from "./controllers/mainController.js";
import apiController from "./controllers/apiController.js";

// Création de notre routeur express
const router = express.Router();

// Route principale de l'application
router.get("/", mainController.home);

router.get("/catalogue", apiController.catalogue);

export default router;
