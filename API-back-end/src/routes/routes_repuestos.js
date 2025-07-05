import {Router} from "express";
import { getRepuestos, getRepuestoById, crearRepuesto, actualizarRepuesto, eliminarRepuesto } from '../controllers/repuestos_controllers.js';
const routes_repuestos = new Router();

routes_repuestos.get('/',getRepuestos);
routes_repuestos.get('/:id',getRepuestoById);
routes_repuestos.get('/', crearRepuesto);
routes_repuestos.get('/:id', actualizarRepuesto);
routes_repuestos.get('/:id', eliminarRepuesto);

export default routes_repuestos;