Módulo: Filiación (Vertical Slice)
Dominio (Core Pura): Los Value Objects validan id_historia como UUID v4, edad como entero entre 0 y 130, fechas clinicas parseables y sexo dentro de valores permitidos; el Agregado FiliacionAggregate protege estas invariantes y expone obtenerParametros().

Aplicación (Adaptador Primario): El controlador recibe la petición HTTP, construye el agregado con construirAgregado(req), captura DomainError para responder 400 y delega en el repositorio los casos de crear, consultar y actualizar.

Infraestructura (Adaptador Secundario): El Repositorio aísla las consultas SQL de PostgreSQL mediante pool.query, invocando procedimientos almacenados y usando agregado.obtenerParametros() para mapear el contrato posicional de persistencia.

Módulo: Enfermedad Actual (Vertical Slice)
Dominio (Core Pura): Los Value Objects validan id_historia como UUID v4 y que sintoma_principal sea texto clinico obligatorio; el Agregado EnfermedadActualAggregate protege esas invariantes y expone obtenerParametros().

Aplicación (Adaptador Primario): El controlador recibe la petición HTTP, construye el agregado con construirAgregado(req), responde 400 cuando hay DomainError y orquesta la creación, consulta y actualización delegando en el repositorio.

Infraestructura (Adaptador Secundario): El Repositorio aísla las consultas SQL de PostgreSQL con pool.query, ejecuta i_enfermedad_actual/u_enfermedad_actual y usa agregado.obtenerParametros() para el contrato posicional de persistencia.

Módulo: Motivo de Consulta (Vertical Slice)
Dominio (Core Pura): Los Value Objects validan id_historia como UUID v4 y que motivo sea texto obligatorio no vacio; el Agregado MotivoConsultaAggregate protege estas invariantes y expone obtenerParametros().

Aplicación (Adaptador Primario): El controlador recibe la petición HTTP, construye el agregado con construirAgregado(req), devuelve 400 ante DomainError y orquesta registrar, consultar y actualizar delegando en el repositorio.

Infraestructura (Adaptador Secundario): El Repositorio aísla las consultas SQL de PostgreSQL con pool.query, ejecuta i_motivo_consulta/u_motivo_consulta y consume agregado.obtenerParametros() para el contrato posicional de persistencia.

Módulo: Antecedente (Vertical Slice)
Dominio (Core Pura): Los Value Objects validan id_historia como UUID v4, fechas clinicas validas y enteros no negativos para frecuencias; los agregados AntecedentePersonal, AntecedenteMedico, AntecedenteFamiliar y SeguimientoDelTratamiento protegen invariantes y exponen obtenerParametros().

Aplicación (Adaptador Primario): El controlador recibe la petición HTTP, construye el agregado correspondiente por seccion de antecedente, responde 400 en DomainError y orquesta registrar, consultar y actualizar delegando en el repositorio.

Infraestructura (Adaptador Secundario): El repositorio encapsula las consultas SQL de PostgreSQL para las cuatro secciones de antecedentes (personal, medico, familiar y cumplimiento), ejecutando procedimientos almacenados y lecturas por id_historia.

Módulo: Examen Boca (Vertical Slice)
Dominio (Core Pura): Los Value Objects validan id_historia como UUID v4 y normalizan campos clinicos opcionales para oclusion y hallazgos; el agregado ExamenBocaAggregate protege las invariantes y expone obtenerParametros().

Aplicación (Adaptador Primario): El controlador recibe la petición HTTP, construye el agregado desde params/body, responde 400 ante DomainError y orquesta la consulta/actualización delegando en el repositorio.

Infraestructura (Adaptador Secundario): El repositorio aísla las consultas SQL de PostgreSQL para `SELECT` por historia y `CALL u_examen_clinico_boca(...)`, mapeando el contrato posicional desde agregado.obtenerParametros().

Módulo: Examen General (Vertical Slice)
Dominio (Core Pura): Los Value Objects validan id_historia como UUID v4 y normalizan temperatura, peso y presion arterial para mantener coherencia clinica; el agregado ExamenFisicoGeneralAggregate protege invariantes y expone obtenerParametros().

Aplicación (Adaptador Primario): El controlador recibe la petición HTTP, construye el agregado desde params/body, captura DomainError con respuesta 400 y orquesta registrar, consultar y actualizar delegando en el repositorio.

Infraestructura (Adaptador Secundario): El repositorio encapsula SQL de PostgreSQL para insertar/consultar en examen_general y actualizar via CALL u_examen_general(...), consumiendo agregado.obtenerParametros() como contrato posicional.

Módulo: Examen Físico Regional (Vertical Slice)
Dominio (Core Pura): Los Value Objects validan `id_historia` como UUID v4 y normalizan medidas clínicas específicas de la región (por ejemplo, agudeza visual, apertura máxima, dolor/función muscular); el agregado ExamenFisicoRegionalAggregate protege invariantes y expone `obtenerParametros()`.

Aplicación (Adaptador Primario): El controlador recibe la petición HTTP, construye el agregado con `construirAgregado(req)`, captura `DomainError` para responder 400 y orquesta las operaciones `registrarExamenFisicoRegional`, `consultarExamenFisicoRegional` y `actualizarExamenFisicoRegional` delegando en el repositorio.

Infraestructura (Adaptador Secundario): El repositorio aísla las consultas SQL de PostgreSQL mediante `pool.query`, implementando llamadas a procedimientos almacenados o `SELECT` para persistencia y lectura, y utiliza `agregado.obtenerParametros()` para mapear el contrato posicional de persistencia.

Módulo: Derivación Clínicas (Vertical Slice)
Dominio (Core Pura): Value Objects validan `id_historia` y `id_usuario` como UUID v4, validan y normalizan `destinos` (JSON) y textos opcionales; el agregado `DerivacionClinicasAggregate` expone `obtenerParametros()`.

Aplicación (Adaptador Primario): El controlador orquesta `consultarDerivacionClinicas` y `actualizarDerivacionClinicas`, captura `DomainError` para responder 400 y delega en el repositorio.

Infraestructura (Adaptador Secundario): El repositorio implementa `SELECT` por `id_historia` y `CALL i_derivacion_clinicas(...)` para persistencia usando `pool.query`.

Módulo: Diagnóstico Presuntivo (Vertical Slice)
Dominio (Core Pura): `DiagnosticoPresuntivoAggregate` valida `id_historia`, `descripcion` y `id_usuario` y expone `obtenerParametros()`.

Aplicación: Controlador expone `consultarDiagnosticoPresuntivo` y `actualizarDiagnosticoPresuntivo` delegando en el repositorio.

Infraestructura: Repositorio encapsula la consulta de `diagnostico` tipo `presuntivo` y llama `CALL i_diagnostico_presuntivo(...)` para actualizaciones.

Módulo: Diagnóstico Clínicas (Vertical Slice)
Dominio: El agregado `DiagnosticoClinicasAggregate` valida y normaliza fecha, textos y JSON de exámenes auxiliares, exponiendo `obtenerParametros()`.

Aplicación: Controlador administra lectura preferente de `tipo='definitivo_clinicas'` y fallback a la última fila; maneja actualizar via repositorio.

Infraestructura: Repositorio implementa la selección/fallback y `CALL i_diagnostico_clinicas(...)` para persistencia.

Módulo: Evolución (Vertical Slice)
Dominio: `EvolucionAggregate` valida `id_historia`, `fecha`, `actividad`, `alumno` e `id_usuario`.

Aplicación: Controlador expone `consultarEvoluciones` y `registrarEvolucion`.

Infraestructura: Repositorio ejecuta `SELECT` para listar evoluciones y `CALL i_evolucion(...)` para insertar.

Módulo: Higiene Bucal (Vertical Slice)
Dominio (Core Pura): Los Value Objects validan `id_historia` como UUID v4 y normalizan el estado de higiene oral (texto obligatorio) y el `id_usuario` que registra la información; el agregado `HigieneBocalAggregate` protege estas invariantes y expone `obtenerParametros()` para persistencia.

Aplicación (Adaptador Primario): El controlador recibe la petición HTTP, construye el agregado con `construirAgregado(req)`, captura `DomainError` para responder 400 y orquesta las operaciones `consultarHigieneBucal` y `actualizarHigieneBucal` delegando en el repositorio.

Infraestructura (Adaptador Secundario): El repositorio implementa las consultas SQL necesarias (`SELECT` por historia y `CALL i_examen_higiene_oral(...)` para persistir) mediante `pool.query`, y usa `agregado.obtenerParametros()` para mapear el contrato posicional de los procedimientos almacenados.

### Módulo: ListaHcAdultos (Vertical Slice)

**Dominio (Core Pura):** Valida que `id` sea un UUID v4 mediante un Value Object (`IdUuidValueObject`) y protege la invariante mediante `ListaHcAdultosAggregate` que expone `obtenerParametros()` (sin acceso a BD). Errores de validación lanzan `DomainError`.

- **Aplicación (Adaptador Primario):** El controlador `ListaHcAdultosController` construye el agregado desde `req.params.id` (`construirAgregado(req)`), captura `DomainError` para responder HTTP 400 y orquesta la llamada al repositorio para devolver las historias clínicas en JSON.
- **Infraestructura (Adaptador Secundario):** El repositorio importa `pool` desde `db/db.js` y ejecuta `SELECT * FROM fn_listar_historias_clinicas_adultos_por_estudiante($1)` usando los parámetros posicionales de `agregado.obtenerParametros()`, aislando la lógica SQL del dominio.

Este vertical slice separa validación, orquestación y acceso a datos, facilitando pruebas unitarias y reemplazo de adaptadores.

### Módulo: Patient (Vertical Slice)

**Dominio (Core Pura):** Value Objects validan `nombre` y `apellido` como textos no vacíos, `fechaNacimiento` como fecha válida (o nulo) e `id` como UUID; `PatientAggregate` protege estas invariantes y expone `obtenerParametrosParaCrear()` y `obtenerParametrosParaActualizar()` (sin acceso a BD). Errores de validación lanzan `DomainError`.

- **Aplicación (Adaptador Primario):** `PatientController` construye el agregado desde `req.body` o `req.params` (`construirAgregadoParaCrear`, `construirAgregadoParaActualizar`), traduce `DomainError` a HTTP 400 y orquesta llamadas a `PatientRepository` para crear o actualizar.
- **Infraestructura (Adaptador Secundario):** `PatientRepository` importa `pool` desde `db/db.js` y ejecuta `SELECT fn_crear_paciente(...)` y `CALL u_paciente(...)` utilizando los parámetros posicionales del agregado, aislando la SQL del dominio.

## Módulo: Catalogo (Vertical Slice)

- **Dominio (Core Pura):** Contiene Value Objects que validan y normalizan el nombre del catálogo (lista blanca) y el id (positivo). El dominio no conoce la base de datos y lanza `DomainError` en caso de validaciones fallidas (`CatalogNameValueObject`, `IdPositiveValueObject`, `CatalogoAggregate`).
- **Aplicación (Adaptador Primario):** El controlador construye el agregado desde `req.params`, captura `DomainError` para responder con HTTP 400 y orquesta llamadas al repositorio para listar o resolver nombres de opciones.
- **Infraestructura (Adaptador Secundario):** El repositorio importa `pool` desde `db/db.js` y ejecuta consultas SQL limitadas a tablas permitidas. La interpolación del nombre de tabla se realiza sólo después de la validación del dominio para minimizar riesgo de inyección.

Este patrón separa validación y reglas del negocio del acceso a la base de datos, facilitando pruebas unitarias y reemplazo de adaptadores.
