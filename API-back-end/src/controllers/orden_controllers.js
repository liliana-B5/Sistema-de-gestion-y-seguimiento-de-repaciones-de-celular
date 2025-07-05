import { connectToDatabase } from "../database/db.js";

const db_pool_connection = connectToDatabase();
export const getOrdenesTrabajo = async (req, res) => {
  try {
    const [rows] = await db_pool_connection.query('SELECT * FROM orden_trabajo order BY orden_trabajo_id desc');
    console.log(rows)
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const crearOrdenTrabajo = async (req, res) => {
  const conn = await db_pool_connection.getConnection();
  await conn.beginTransaction();

  const {
    cliente_id,
    tecnico_id,
    tipo_dispositivo,
    marca,
    modelo,
    serial,
    observacion,
    falla_equipo,
    reparacion,
    fecha_orden,
    abono,
    presupuesto,
    fecha_entrega,
    estado,
    total
  } = req.body;

  const query = `
    INSERT INTO orden_trabajo (
      cliente_id,
      tecnico_id,
      tipo_dispositivo,
      marca,
      modelo,
      serial,
      observacion,
      falla_equipo,
      reparacion,
      fecha_orden,
      abono,
      presupuesto,
      fecha_entrega,
      estado,
      total
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  try {
    const [result] = await conn.query(query, [
      cliente_id,
      tecnico_id,
      tipo_dispositivo,
      marca,
      modelo,
      serial,
      observacion,
      falla_equipo,
      reparacion,
      fecha_orden,
      abono,
      presupuesto,
      fecha_entrega,
      estado,
      total
    ]);
    await conn.commit();
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    await conn.rollback();
    console.error(error);
    res.status(500).json({ success: false, message: `Error ${error}` });
  } finally {
    conn.release();
  }
};
export const actualizarOrdenTrabajo = async (req, res) => {
  const conn = await db_pool_connection.getConnection();
  await conn.beginTransaction();

  const {
    orden_trabajo_id,           // El ID de la orden de trabajo que se va a actualizar
    cliente_id,
    tecnico_id,
    tipo_dispositivo,
    marca,
    modelo,
    serial,
    observacion,
    falla_equipo,
    reparacion,
    fecha_orden,
    abono,
    presupuesto,
    fecha_entrega,
    estado,
    total
  } = req.body;

  const query = `
    UPDATE orden_trabajo SET
      cliente_id = ?,
      tecnico_id = ?,
      tipo_dispositivo = ?,
      marca = ?,
      modelo = ?,
      serial = ?,
      observacion = ?,
      falla_equipo = ?,
      reparacion = ?,
      fecha_orden = ?,
      abono = ?,
      presupuesto = ?,
      fecha_entrega = ?,
      estado = ?,
      total = ?
    WHERE orden_trabajo_id = ?
  `;

  try {
    const [result] = await conn.query(query, [
      cliente_id,
      tecnico_id,
      tipo_dispositivo,
      marca,
      modelo,
      serial,
      observacion,
      falla_equipo,
      reparacion,
      fecha_orden,
      abono,
      presupuesto,
      fecha_entrega,
      estado,
      total,
      orden_trabajo_id
    ]);
    await conn.commit();
    if (result.affectedRows === 0) {
      res.status(404).json({ success: false, message: 'Orden de trabajo no encontrada' });
    } else {
      res.status(200).json({ success: true, result });
    }
  } catch (error) {
    await conn.rollback();
    console.error(error);
    res.status(500).json({ success: false, message: 'Error al actualizar la orden de trabajo' });
  } finally {
    conn.release();
  }
};

export const eliminarOrdenTrabajo = async (req, res) => {
  const conn = await db_pool_connection.getConnection();
  await conn.beginTransaction();

  const { orden_trabajo_id } = req.body;

  const query = 'DELETE FROM orden_trabajo WHERE orden_trabajo_id = ?';

  try {
    const [result] = await conn.query(query, [orden_trabajo_id]);
    await conn.commit();
    if (result.affectedRows === 0) {
      res.status(404).json({ success: false, message: 'Orden de trabajo no encontrada' });
    } else {
      res.status(200).json({ success: true, message: 'Orden de trabajo eliminada correctamente' });
    }
  } catch (error) {
    await conn.rollback();
    console.error(error);
    res.status(500).json({ success: false, message: 'Error al eliminar la orden de trabajo' });
  } finally {
    conn.release();
  }
};

export const crearOrden = async (req, res) => {
  try {
    const { fecha, id_usuario, id_servicio, repuestos } = req.body;
    const conn = await db_pool_connection.getConnection();
    await conn.beginTransaction();

    try {
      const [ordenResult] = await conn.query('INSERT INTO orden_servicio (fecha, id_usuario, id_servicio) VALUES (?, ?, ?)', [fecha, id_usuario, id_servicio]);
      const ordenId = ordenResult.insertId;

      for (const repuesto of repuestos) {
        await conn.query('INSERT INTO orden_repuesto (id_orden, id_repuesto, cantidad) VALUES (?, ?, ?)', [ordenId, repuesto.id, repuesto.cantidad]);
      }

      await conn.commit();
      res.status(201).json({ id: ordenId });
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

