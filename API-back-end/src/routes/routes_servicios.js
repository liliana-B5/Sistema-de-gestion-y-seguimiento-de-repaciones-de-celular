import express from 'express';
import { getServicios, crearServicio } from '../controllers/servicios_controllers.js';

const router = express.Router();

router.get('/', getServicios);
router.post('/', crearServicio);

export default router;
