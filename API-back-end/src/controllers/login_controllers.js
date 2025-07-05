import { connectToDatabase }  from "../database/db.js";

import { response_not_found, response_success, response_error,response_created } from "../responses/responses.js";

const db_pool_connection = connectToDatabase();


/*export const login = async (req, res) => {
    try{
        //Obtener el Parametro
        const { username, password } = req.body;
    
        // ejecutar  query en la base de datos y alamacenarlo en rows
        const [rows] = await db_pool_connection.query(
       'SELECT * FROM TB_USERS  WHERE username=? AND passwords=?',
            [username, password]);
        console.log(rows);
        if (rows.length > 0){
            const usuario = rows[0];
            return res.status(200).json(response_success( {role:usuario.id_rol, Status: "Success"}));
        }else{
            return res.status(404).json(response_not_found("Credenciales incorrectas, intente de nuevo"));
        }
        
    }
    catch(error){
        res.status(500).json(response_error(500,"Error al obtener los datos de los usuarios => " + error['sqlMessage']));
    }
} */

    export const login = async (req, res) => {
        try {
            // Verificar que username y password están presentes en req.body
            const { username, passwords } = req.body;
            if (!username || !passwords) {
                return res.status(400).json({ error: "Se requieren nombre de usuario y contraseña." });
            }
    
            const [rows] = await db_pool_connection.query(
                'SELECT * FROM TB_USERS WHERE username=? AND passwords=?',
                [username, passwords]
            );
    
            console.log(rows);
    
            if (rows.length > 0) {
                const usuario = rows[0];
                return res.status(200).json({ usuario, status: "Success" });
            } else {
                return res.status(404).json({ error: "Credenciales incorrectas, intente de nuevo" });
            }
            
        } catch (error) {
            console.error("Error al obtener los datos de los usuarios:", error);
            return res.status(500).json({ error: "Error interno del servidor." });
        }
    };

export const registrarUsuario = async (req, res) => {
    try {
        const { username, passwords, nombre, apellidos, cedula, correo,  id_rol } = req.body;

        // verificar que  los campos requeridos están ingresadis
        if (!username || !passwords || !nombre || !apellidos || !cedula || !correo || !id_rol) {
            return res.status(400).json(response_error(400, "Todos los campos son obligatorios"));
        }

        const [rows] = await db_pool_connection.query(
            "INSERT INTO TB_USERS (username, passwords, nombre, apellidos, cedula, correo, id_rol) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [username, passwords, nombre, apellidos, cedula, correo, id_rol]
        );

        res.status(201).json(response_created(rows.insertId, "Usuario Ingresado con Exito"));
    } catch (error) {
        res.status(500).json(response_error(500, "Error al Insertar los datos de los usuarios => " + error['sqlMessage']));
    }
};




