import { Router } from 'express';
import UserController from '../controllers/userController.js';
import { authVerification } from '../middlewares/auth.js'
import {tenantVerification} from '../middlewares/tenant.js';

const router = Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/', authVerification, tenantVerification, UserController.findAll);
router.put('/:id', authVerification, tenantVerification, UserController.update);
router.delete('/:id', authVerification, tenantVerification, UserController.delete);


export default router;