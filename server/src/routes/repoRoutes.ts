import express from 'express';
import { protect } from '../middlewares/protect';
import repoController from '../controllers/repoController';

const router = express.Router();

router.use(protect);

router.get('/starred', repoController.getStarredRepos);

router.get('/:name/commits', repoController.getStarredRepoCommits);

export default router;
