import { connectToDatabase }  from "../database/db.js";

const db_pool_connection = connectToDatabase();

export const getServicios = async (req, res) => {
  try {
    const [rows] = await db_pool_connection.query('SELECT * FROM servicio');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const crearServicio = async (req, res) => {
  try {
    const { nombre, descripcion, precio } = req.body;
    const [result] = await db_pool_connection.query('INSERT INTO servicio (nombre, descripcion, precio) VALUES (?, ?, ?)', [nombre, descripcion, precio]);
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
