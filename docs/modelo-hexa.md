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

Módulo: Higiene Bucal (Vertical Slice)
Dominio (Core Pura): Los Value Objects validan `id_historia` como UUID v4 y normalizan el estado de higiene oral (texto obligatorio) y el `id_usuario` que registra la información; el agregado `HigieneBocalAggregate` protege estas invariantes y expone `obtenerParametros()` para persistencia.

Aplicación (Adaptador Primario): El controlador recibe la petición HTTP, construye el agregado con `construirAgregado(req)`, captura `DomainError` para responder 400 y orquesta las operaciones `consultarHigieneBucal` y `actualizarHigieneBucal` delegando en el repositorio.

Infraestructura (Adaptador Secundario): El repositorio implementa las consultas SQL necesarias (`SELECT` por historia y `CALL i_examen_higiene_oral(...)` para persistir) mediante `pool.query`, y usa `agregado.obtenerParametros()` para mapear el contrato posicional de los procedimientos almacenados.
