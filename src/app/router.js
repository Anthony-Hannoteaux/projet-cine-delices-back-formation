import express from 'express';
import mainController from './controllers/mainController.js';
import authController from './controllers/authController.js';

// Création de notre routeur express
const router = express.Router();

// Route principale de l'application
router.get('/', mainController.home)
router.get('/api/user', authController.login)

export default router;