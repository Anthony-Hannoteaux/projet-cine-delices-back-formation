import express from 'express';
import mainController from './controllers/mainController.js';
import authController from './controllers/authController.js';

const router = express.Router();

router.get('/', mainController.home)
router.get('/api/user', authController.login)

export default router;