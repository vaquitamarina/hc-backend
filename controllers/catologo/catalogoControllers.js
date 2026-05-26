import {
  listarOpcionesCatalogoClinico,
  obtenerNombreOpcionCatalogoClinico,
  CatalogNameValueObject,
  IdPositiveValueObject,
  CatalogoAggregate,
} from '../../models/catalogo/catalogoModels.js';

export const listarOpcionesCatalogoClinicoController = async (req, res) => {
  try {
    const { nombre } = req.params;
    // Build aggregate and validate in memory
    const nameVO = new CatalogNameValueObject(nombre);
    const agg = new CatalogoAggregate({ catalogNameVO: nameVO });
    const result = await listarOpcionesCatalogoClinico(agg._catalogName.value);
    if (!result || result.length === 0) {
      return res.status(404).json({ error: 'No data found for this catalog' });
    }
    return res.status(200).json({
      message: 'Catalog data retrieved successfully',
      data: result,
    });
  } catch (err) {
    // ValueObject errors and validation errors map to 400
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
    // Validate in memory using Value Objects and Aggregate
    const nameVO = new CatalogNameValueObject(nombre);
    const idVO = new IdPositiveValueObject(id);
    const agg = new CatalogoAggregate({ catalogNameVO: nameVO });
    const nombreCatalogo = await obtenerNombreOpcionCatalogoClinico(
      agg._catalogName.value,
      idVO.value
    );
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
