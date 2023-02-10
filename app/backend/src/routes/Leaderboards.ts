import { Router } from 'express';
import LeaderboardController from '../controllers/Leaderboards';

const router = Router();
const leaderboardController = new LeaderboardController();

router.get('/home', leaderboardController.homeLeaderboard.bind(leaderboardController));
router.get('/away', leaderboardController.awayLeaderboard.bind(leaderboardController));
router.get('/', leaderboardController.leaderboard.bind(leaderboardController));

export default router;
