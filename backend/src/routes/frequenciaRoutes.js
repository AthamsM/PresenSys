import { Router } from 'express';
import FrequenciaController from '../controllers/frequenciaController.js';

const router = Router();

router.post('/chamada', FrequenciaController.registrarChamada);

export default router;