import express from 'express';
import authRoutes from './authRoutes';
import repoRoutes from './repoRoutes';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/repo', repoRoutes);

export default router;
