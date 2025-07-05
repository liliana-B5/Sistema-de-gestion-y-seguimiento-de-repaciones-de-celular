import express from 'express';
import { actualizarOrdenTrabajo, crearOrden, crearOrdenTrabajo, eliminarOrdenTrabajo, getOrdenesTrabajo } from '../controllers/orden_controllers.js';

const router = express.Router();

router.get('/ver', getOrdenesTrabajo);
router.post('/crear', crearOrdenTrabajo);
router.post('/editar', actualizarOrdenTrabajo);
router.post('/eliminar', eliminarOrdenTrabajo);

export default router;

