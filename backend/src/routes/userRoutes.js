import { Router } from 'express';
import UserController from '../controllers/userController.js';
import { authVerification } from '../middlewares/auth.js'

const router = Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/', authVerification, UserController.findAll);
router.put('/:id', authVerification, UserController.update);
router.delete('/:id', authVerification, UserController.delete);


export default router;