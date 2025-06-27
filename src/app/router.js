import express from 'express';
import mainController from './controllers/mainController.js';
import catalogueRoutes from './routes/catalogueRoutes.js';

// Création de notre routeur express
const router = express.Router();

// Route principale de l'application
router.get('/', mainController.home)

router.use('/', catalogueRoutes);

export default router;