import { Router } from 'express';
import MatchController from '../controllers/Match';

const router = Router();
const matchController = new MatchController();

router.get('/', matchController.getMatches.bind(matchController));

export default router;
