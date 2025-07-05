import { connectToDatabase } from "../database/db.js";
import { response_not_found, response_success, response_error,response_created} from "../responses/responses.js";

const db_pool_connection = connectToDatabase();

//devuelve el id_user, username cuando la cedula es igual en la tabla cliente y users
export const idUserCliente = async (req, res) => {
    try{
         //Obtenr el Parametro
         const {identificacion} = req.body;
        const [rows] = await db_pool_connection.query(' SELECT id_user, username FROM TB_USERS WHERE cedula = ?'
            , [identificacion]);
        console.log(rows);
        if (rows.length > 0) {
            const cliente = rows[0];
            return res.status(200).json(response_success( {id_user:cliente.id_user,username:cliente.username ,Status: "Success"}));
        } else {
            return res.status(404).json(response_not_found("No se encontraron los datos del cliente"));
        }

    }
    catch(error){
        res.status(500).json(response_error(500,"Error al obtener los datos de los usuarios => " + error['sqlMessage']));
    }
}  

//devuelve el listado de todos los clientes
export const listarclientes = async (req, res) => {
    try{
        const [rows] = await db_pool_connection.query('SELECT * FROM clientes');
        console.log(rows);
        if (rows.length <= 0){
            return res.status(404).json(response_not_found("No se encontraron registros de los clientes"));
        }
        return res.status(200).json(response_success(rows, "Consulta Exitosa"));

    }
    catch(error){
        res.status(500).json(response_error(500,"Error al obtener los datos de los clientes => " + error['sqlMessage']));
    }
} 


//crear clientes
export const crearcliente = async (req, res) => {
    try {
        const { id_user,nombre, apellido, identificacion, telefono, email, direccion } = req.body;

        const [rows] = await db_pool_connection.query(
            " INSERT INTO clientes (id_user, nombre, identificacion, apellido, telefono, email, direccion) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [id_user || null, nombre, identificacion, apellido, telefono, email, direccion]
        );

        res.status(201).json(response_created(rows.insertId, "Cliente Ingresado con Exito"));
    } catch (error) {
        res.status(500).json(response_error(500, "Error al Insertar los datos del cliente => " + error['sqlMessage']));
    }
}

//editar clientes
export const editarcliente = async (req, res) => {
    try {
       //Obtenr el Parametro
       const cliente_id = req.params.id;
       if (cliente_id === null)
           return res.status(400).json(response_bad_request("Parámetro Id no Válido"))
        const {  id_user,nombre, apellido, identificacion, telefono, email, direccion } = req.body;

        const [rows] = await db_pool_connection.query(
            "UPDATE clientes SET id_user = ?, nombre = ?, identificacion = ?, apellido = ?, telefono = ?, email = ?, direccion = ? WHERE cliente_id = ?",
            [id_user || null, nombre, identificacion, apellido, telefono, email, direccion, cliente_id]
        );

        if (rows.affectedRows > 0) {//si la fila fue actualizada
            return res.status(200).json(response_created("cliente modificado con Exito"));
        } else {
            return res.status(404).json(response_not_found("No se encontraron el registro del cliente"));
        } 
    
    } catch (error) {
        res.status(500).json(response_error(500, "Error al Insertar los datos del cliente => " + error['sqlMessage']));
    }
}



//eliminar clientes
export const eliminarcliente = async (req, res) => {
    try {
        const { cliente_id } = req.body; 
    
        const [rows] = await db_pool_connection.query(
          "DELETE FROM clientes WHERE cliente_id = ?",
          [cliente_id]
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
}