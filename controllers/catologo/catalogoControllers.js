import {
  listarOpcionesCatalogoClinico,
  obtenerNombreOpcionCatalogoClinico,
} from '../../models/catalogo/catalogoModels.js';

export const listarOpcionesCatalogoClinicoController = async (req, res) => {
  try {
    const { nombre } = req.params;
    const result = await listarOpcionesCatalogoClinico(nombre);
    if (!result || result.length === 0) {
      return res.status(404).json({ error: 'No data found for this catalog' });
    }
    return res.status(200).json({
      message: 'Catalog data retrieved successfully',
      data: result,
    });
  } catch (err) {
    return res
      .status(400)
      .json({ error: err.message || 'Error retrieving catalog data' });
  }
};

// Nuevo controlador para obtener el nombre por id
export const obtenerNombreOpcionCatalogoClinicoController = async (
  req,
  res
) => {
  try {
    const { nombre, id } = req.params;
    const nombreCatalogo = await obtenerNombreOpcionCatalogoClinico(nombre, id);
    if (!nombreCatalogo) {
      return res
        .status(404)
        .json({ error: 'No data found for this id in catalog' });
    }
    return res.status(200).json({
      message: 'Catalog name retrieved successfully',
      id,
      nombre: nombreCatalogo,
    });
  } catch (err) {
    return res
      .status(400)
      .json({ error: err.message || 'Error retrieving catalog name' });
  }
};
