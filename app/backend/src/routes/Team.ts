import { Router } from 'express';
import TeamController from '../controllers/Team';

const router = Router();
const teamController = new TeamController();

router.get('/:id', teamController.getById.bind(teamController));
router.get('/', teamController.getAll.bind(teamController));

export default router;
