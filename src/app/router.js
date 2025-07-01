import express from "express";
import mainController from "./controllers/mainController.js";
import apiController from "./controllers/apiController.js";
import categoryController from "./controllers/categoryController.js";

// Création de notre routeur express
const router = express.Router();

// Route principale de l'application
router.get("/", mainController.home);

router.get("/catalogue", apiController.catalogue);

// route spécifique aux catégories
router.post("/api/categories", categoryController.createCategory);
router.get("/api/categories", categoryController.getAllCategory);
router.get("/api/categories/:id", categoryController.getCategoryById);
// patch et non put car on veut modifier une catégorie en particulier
router.patch("/api/categories/:id", categoryController.updateCategory);
router.delete("/api/categories/:id", categoryController.deleteCategory);

export default router;
