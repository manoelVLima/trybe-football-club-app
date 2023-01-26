import { Router } from 'express';
import TeamController from '../controllers/Teams';

const router = Router();
const teamController = new TeamController();

router.get('/:id', teamController.getById.bind(teamController));
router.get('/', teamController.getAll.bind(teamController));

export default router;
