import { Router } from 'express';
import UsuarioController from '../controllers/usuarioController.js';

const router = Router();

router.post('/register', UsuarioController.create);
router.get('/', UsuarioController.findAll);
router.post('/login', UsuarioController.login);
router.put('/:id', UsuarioController.update);
router.delete('/:id', UsuarioController.delete);


export default router;