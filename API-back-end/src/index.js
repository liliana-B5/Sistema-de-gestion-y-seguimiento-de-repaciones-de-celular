import express from "express";
import { PORT, config_core } from "../src/config/config.js";
import routes_usuarios from "../src/routes/routes_usuarios.js";
import routes_repuestos from "../src/routes/routes_repuestos.js";
import routes_servicios from '../src/routes/routes_servicios.js'
import routes_orden from '../src/routes/routes_orden.js'
import cors from 'cors';
import routes_clientes from "../src/routes/routes_clientes.js";

const app = express();

//politicas de acceso al API
app.use(cors(config_core.application.cors.server));

//responses json
app.use(express.json());

// Rutas
app.use(routes_usuarios, routes_clientes);
app.use('/repuestos', routes_repuestos);
app.use('/servicios', routes_servicios);
app.use('/ordenes', routes_orden);
//orden trabjo

//Respuesta para acceso a rutas no válidas
app.use((req, res) => {
    res.status(404).json({ message: "Ruta No Válida" });
})

app.listen(PORT, () => { console.log("Servidor Escuchando por el puerto", PORT); })