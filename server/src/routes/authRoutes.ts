import express from 'express';
import authController from '../controllers/authController';

const router = express.Router();

router.get('/github', authController.loginWithGithub);
router.get('/github/callback', authController.redirectFromGithub);
router.get('/logout', authController.logout);
router.get('/me', authController.me);

export default router;
