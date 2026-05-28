### Módulo: StudentUsers (Vertical Slice)

**Dominio (Core Pura):** Qué validan los Value Objects y qué protege el Agregado.

- `RoleValueObject`: valida que `role` sea el valor permitido `estudiante`.
- `StudentUsersAggregate`: protege la invariante del rol y expone `obtenerParametros()` (posicional) para consultas.
- Errores de validación lanzan `DomainError`. CERO SQL en dominio.

**Aplicación (Adaptador Primario):** Cómo el controlador recibe la petición HTTP y usa el dominio.

- `StudentUsersController` construye el agregado desde `req` (por defecto `role=estudiante` o desde `req.query.role`), captura `DomainError` y devuelve 400 en fallos de validación. Orquesta la llamada al repositorio para listar usuarios por rol y devuelve la respuesta HTTP adecuada.

**Infraestructura (Adaptador Secundario):** Cómo el Repositorio aísla las consultas SQL de PostgreSQL.

- `StudentUsersRepository` importa `pool` desde `../../db/db.js` y ejecuta `SELECT * FROM usuario WHERE rol = $1` usando los parámetros posicionales del agregado (`agregado.obtenerParametros()`). Devuelve filas crudas al adaptador de aplicación.
