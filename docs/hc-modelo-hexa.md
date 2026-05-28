### Módulo: HC (Historias Clínicas) (Vertical Slice)

**Dominio (Core Pura):** Qué validan los Value Objects y qué protege el Agregado.

- `HistoriaClinicaIdValueObject`: valida UUIDv4 y normaliza prefijos `HC-`.
- `UsuarioIdValueObject`: valida UUIDv4 para identificadores de usuario.
- `EstadoRevisionValueObject`: valida estado de revisión como texto no vacío y longitud limitada.
- Agregados (`RevisionHistoriaClinicaAggregate`, `RegistroHistoriaClinicaAggregate`, `AsignacionPacienteAggregate`, `ConsultaPacienteHistoriaClinicaAggregate`, `ConsultaHistoriasEstudianteAggregate`) protegen invariantes y exponen `obtenerParametros()` posicionales para la capa de infraestructura.
- CERO SQL en dominio; errores lanzan `DomainError`.

**Aplicación (Adaptador Primario):** Cómo el controlador recibe la petición HTTP y usa el dominio.

- `HcController` construye agregados desde `req` (`construirAgregado*`), captura `DomainError` y traduce a HTTP 400. Orquesta operaciones: crear revisión, crear historia clínica, listar historias por estudiante, obtener borrador, asignar paciente y consultar paciente por historia, delegando en `HcRepository`.

**Infraestructura (Adaptador Secundario):** Cómo el Repositorio aísla las consultas SQL de PostgreSQL.

- `HcRepository` importa `pool` desde `../../db/db.js` y ejecuta las consultas/procedimientos necesarios:
  - `CALL i_revision_historia($1,$2,$3,$4)`
  - `SELECT * FROM fn_crear_historia_clinica($1)`
  - `SELECT * FROM historia_clinica WHERE id_estudiante = $1`
  - `SELECT fn_obtener_o_crear_borrador($1)`
  - `SELECT fn_asignar_paciente_a_historia($1,$2)`
  - `SELECT * FROM fn_obtener_paciente_por_historia($1)`
- El repositorio recibe agregados y usa `agregado.obtenerParametros()` para construir parámetros posicionales, devolviendo filas crudas a la capa de aplicación.
