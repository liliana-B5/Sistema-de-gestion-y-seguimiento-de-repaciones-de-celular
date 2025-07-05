import { Router } from "express";
import { login, registrarUsuario } from "../controllers/login_controllers.js";
import { listarusuarios,actualizarUsuario, crearUsuario, eliminarUsuario } from "../controllers/usuarios_controllers.js";

const routes_usuarios = new Router();

routes_usuarios.post('/login', login);
routes_usuarios.post('/registrar', registrarUsuario);
routes_usuarios.get('/admin-dashboard/list-user', listarusuarios);
routes_usuarios.put('/admin-dashboard/actualizar/:id',actualizarUsuario);
routes_usuarios.post('/admin-dashboard/insertar', crearUsuario);
routes_usuarios.delete('/admin-dashboard/eliminar',eliminarUsuario);


export default routes_usuarios;