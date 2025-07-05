import { Router } from "express";
import { idUserCliente,crearcliente,listarclientes,eliminarcliente, editarcliente } from "../controllers/clientes_controllers.js";

const routes_clientes = new Router();

routes_clientes.post('/idCliente', idUserCliente);
routes_clientes.get('/Cliente', listarclientes);
routes_clientes.post('/crearCliente', crearcliente);
routes_clientes.post('/actualizarcliente', editarcliente);
routes_clientes.post('/eliminarcliente', eliminarcliente);


export default routes_clientes;