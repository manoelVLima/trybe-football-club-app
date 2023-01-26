import { Router } from 'express';
import auth from '../middlewares/authValidate';
import MatchController from '../controllers/Match';

const router = Router();
const matchController = new MatchController();

router.get('/', matchController.getMatches.bind(matchController));
router.post('/', auth, matchController.insertMatch.bind(matchController));

export default router;
