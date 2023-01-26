import { Router } from 'express';
import auth from '../middlewares/authValidate';
import MatchController from '../controllers/Matches';

const router = Router();
const matchController = new MatchController();

router.post('/', auth, matchController.insertMatch.bind(matchController));
router.patch('/:id', matchController.updateMatches.bind(matchController));
router.patch('/:id/finish', matchController.setProgress.bind(matchController));
router.get('/', matchController.getMatches.bind(matchController));

export default router;
