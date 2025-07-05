import { connectToDatabase } from "../database/db.js";
import { response_not_found, response_success, response_error,response_created, response_bad_request } from "../responses/responses.js";

const db_pool_connection = connectToDatabase();

//devuelve el listado de todos los usuarios
export const listarusuarios = async (req, res) => {
    try{
        const [rows] = await db_pool_connection.query('SELECT * FROM TB_USERS');
        console.log(rows);
        if (rows.length <= 0){
            return res.status(404).json(response_not_found("No se encontraron registros de los usuarios"));
        }
        return res.status(200).json(response_success(rows, "Consulta Exitosa"));

    }
    catch(error){
        res.status(500).json(response_error(500,"Error al obtener los datos de los usuarios => " + error['sqlMessage']));
    }
}  

//actualizar usuarios

export const actualizarUsuario= async (req, res)=>{
    try{
        //Obtenr el Parametro
        const id_user = req.params.id;
        if (id_user === null)
            return res.status(400).json(response_bad_request("Parámetro Id no Válido"))
        
        const { username, passwords, nombre, apellidos, cedula, correo, id_rol } = req.body;

        const [rows] = await db_pool_connection.query( "UPDATE TB_USERS SET username = ?, passwords = ?, nombre = ?, apellidos = ?, cedula = ?, correo = ?, id_rol = ?  WHERE id_user = ?",
           [username, passwords, nombre, apellidos, cedula, correo, id_rol, id_user]
        );
        if (rows.affectedRows > 0) {//si la fila fue actualizada
            return res.status(200).json(response_created("Usuario modificado con Exito"));
        } else {
            return res.status(404).json(response_not_found("No se encontraron el registro del usuario"));
        } 
    
    } catch (error) {
        res.status(500).json(response_error(500, "Error al obtener los datos de lso usuarios"+ error['sqlMessage']));

    }
}

//INSERTAR
export const crearUsuario = async (req, res) => {
    try {
        const { username, passwords, nombre, apellidos, cedula, correo, id_rol } = req.body;

        const [rows] = await db_pool_connection.query(
            "INSERT INTO TB_USERS (username, passwords, nombre, apellidos, cedula, correo,  id_rol) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [username, passwords, nombre, apellidos, cedula, correo, id_rol]
        );

        res.status(201).json(response_created(rows.insertId, "Usuario Ingresado con Exito"));
    } catch (error) {
        res.status(500).json(response_error(500, "Error al Insertar los datos de los usuarios => " + error['sqlMessage']));
    }
};

//eliminar
export const eliminarUsuario = async (req, res) => {
    try {
        const { id_user } = req.body; 
    
        const [rows] = await db_pool_connection.query(
          "DELETE FROM TB_USERS WHERE id_user = ?",
          [id_user]
        );
    
        if (rows.affectedRows > 0) {
          res.status(200).json(response_success("Usuario Eliminado con Exito"));
        } else {
          res.status(404).json(response_error(404, "Usuario no encontrado"));
        }
      } catch (error) {
        console.error("Error al eliminar usuario:", error);
        res.status(500).json(response_error(500, "Error al Eliminar el usuario => " + error.message));
      }
};