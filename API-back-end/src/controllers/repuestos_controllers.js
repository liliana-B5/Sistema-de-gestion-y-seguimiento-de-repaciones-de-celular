import { connectToDatabase }  from "../database/db.js";

const db_pool_connection = connectToDatabase();

export const getRepuestos = async (req, res) => {
  try {
    const [rows] = await db_pool_connection.query('SELECT * FROM repuesto');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los repuestos' });
  }
};

export const getRepuestoById = async (req, res) => {
  try {
    const [rows] = await db_pool_connection.query('SELECT * FROM repuesto WHERE id_repuesto = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Repuesto no encontrado' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const crearRepuesto = async (req, res) => {
  try {
   const { nombre, descripcion, precio, stock } = req.body;
    const [result] = await db_pool_connection.query('INSERT INTO repuesto (nombre, descripcion, precio, stock) VALUES (?, ?, ?, ?)', [nombre, descripcion, precio, stock]);
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const actualizarRepuesto = async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock } = req.body;
    await db_pool_connection.query('UPDATE repuesto SET nombre = ?, descripcion = ?, precio = ?, stock = ? WHERE id_repuesto = ?', [nombre, descripcion, precio, stock, req.params.id]);
    res.json({ message: 'Repuesto actualizado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const eliminarRepuesto = async (req, res) => {
  try {
    await db_pool_connection.query('DELETE FROM repuesto WHERE id_repuesto = ?', [req.params.id]);
    res.json({ message: 'Repuesto eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
