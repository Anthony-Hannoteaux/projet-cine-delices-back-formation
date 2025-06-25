import express from 'express';
import mainController from './controllers/mainController.js';

// Création de notre routeur express
const router = express.Router();

// Route principale de l'application
router.get('/', mainController.home)

export default router;