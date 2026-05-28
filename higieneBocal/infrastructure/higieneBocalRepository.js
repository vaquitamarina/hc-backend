import pool from '../../db/db.js';

class HigieneBocalRepository {
  async consultarPorHistoria(idHistory) {
    const result = await pool.query(
      'SELECT estado_higiene FROM examen_higiene_oral WHERE id_historia = $1',
      [idHistory]
    );
    const data = result.rows[0];
    if (!data) {
      return null;
    }
    return {
      estadoHigiene: data.estado_higiene,
    };
  }

  async actualizarHigieneBocal(dataOrAggregate) {
    const params =
      dataOrAggregate && typeof dataOrAggregate.obtenerParametros === 'function'
        ? dataOrAggregate.obtenerParametros()
        : [
            dataOrAggregate?.idHistory,
            dataOrAggregate?.estadoHigiene,
            dataOrAggregate?.idUsuario,
          ];

    await pool.query('CALL i_examen_higiene_oral($1, $2, $3)', params);
    return true;
  }
}

export { HigieneBocalRepository };
