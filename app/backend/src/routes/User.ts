import { Router } from 'express';
import auth from '../middlewares/authValidate';
import loginValidation from '../middlewares/loginValidate';
import UserController from '../controllers/User';

const router = Router();
const userController = new UserController();

router.post('/', loginValidation, userController.login.bind(userController));
router.get('/validate', auth, userController.validate.bind(userController));

export default router;
