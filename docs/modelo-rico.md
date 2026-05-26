# Modelos Ricos de Dominio

Este documento reúne los agregados, Value Objects y reglas de persistencia de los modelos ricos del proyecto. Sirve como referencia de arquitectura para nuevas entidades de dominio y para documentar las invariantes que no deben romperse al modificar controladores, repositorios o procedimientos SQL.

## Propósito

- Evitar modelos anémicos que solo reenvían `req.body`.
- Concentrar validaciones de negocio en memoria antes de tocar la base de datos.
- Mantener la persistencia aislada en repositorios con SQL estable.
- Documentar el mapeo entre propiedades del dominio y parámetros posicionales.

## Patrón Base

Todo modelo rico del proyecto debe seguir esta estructura:

- Un agregado raíz con propiedades privadas explícitas.
- Dos o tres Value Objects para invariantes críticas.
- Un repositorio que preserve exactamente las consultas SQL originales.
- Un controlador orquestador que construya el agregado y traduzca errores de dominio a `400`.

## Catálogo Actual

- `AntecedentesAggregate` (módulo anamnesis)
- `EnfermedadActualAggregate`
- `FiliacionAggregate`

## Caso Implementado: Antecedentes Anamnesis

### Módulo: Antecedentes Anamnesis

**Responsabilidad del Agregado:** proteger la integridad de los antecedentes clínicos del paciente en anamnesis, garantizando que la historia clínica sea un UUID válido y que los datos enviados a cada procedimiento almacenado lleguen normalizados y en el mismo orden esperado por la infraestructura.

**Invariantes Defendidas (Value Objects):**

- Validación de UUID para `id_historia` y para otros identificadores consultados por el módulo.
- Validación de enteros no negativos para frecuencias clínicas como `frecuencia_control_meses` y `frecuencia_limpieza_meses`.
- Validación de fecha clínica para `fecha_consentimiento` cuando aplica al seguimiento del tratamiento.
- Normalización en memoria de campos primitivos opcionales para evitar estados corruptos antes de persistir.

**Mapeo de Parámetros a Infraestructura:**
| Proceso | Propiedad privada del agregado | Parámetro SQL |
|---|---|---|
| `i_antecedente_personal` / `u_antecedente_personal` | `_idHistoria.value` | `$1` |
| `i_antecedente_personal` / `u_antecedente_personal` | `_estaEmbarazada` | `$2` |
| `i_antecedente_personal` / `u_antecedente_personal` | `_mac` | `$3` |
| `i_antecedente_personal` / `u_antecedente_personal` | `_otros` | `$4` |
| `i_antecedente_personal` / `u_antecedente_personal` | `_psicosocial` | `$5` |
| `i_antecedente_personal` / `u_antecedente_personal` | `_vacunas` | `$6` |
| `i_antecedente_personal` / `u_antecedente_personal` | `_hepatitisB` | `$7` |
| `i_antecedente_personal` / `u_antecedente_personal` | `_grupoSanguineoDesc` | `$8` |
| `i_antecedente_personal` / `u_antecedente_personal` | `_fuma` | `$9` |
| `i_antecedente_personal` / `u_antecedente_personal` | `_cigarrillosDia` | `$10` |
| `i_antecedente_personal` / `u_antecedente_personal` | `_tomaTe` | `$11` |
| `i_antecedente_personal` / `u_antecedente_personal` | `_tazasTeDia` | `$12` |
| `i_antecedente_personal` / `u_antecedente_personal` | `_tomaAlcohol` | `$13` |
| `i_antecedente_personal` / `u_antecedente_personal` | `_frecuenciaAlcohol` | `$14` |
| `i_antecedente_personal` / `u_antecedente_personal` | `_aprietaDientes` | `$15` |
| `i_antecedente_personal` / `u_antecedente_personal` | `_momentoAprieta` | `$16` |
| `i_antecedente_personal` / `u_antecedente_personal` | `_rechina` | `$17` |
| `i_antecedente_personal` / `u_antecedente_personal` | `_dolorMuscular` | `$18` |
| `i_antecedente_personal` / `u_antecedente_personal` | `_chupaDedo` | `$19` |
| `i_antecedente_personal` / `u_antecedente_personal` | `_muerdeObjetos` | `$20` |
| `i_antecedente_personal` / `u_antecedente_personal` | `_muerdeLabios` | `$21` |
| `i_antecedente_personal` / `u_antecedente_personal` | `_otrosHabitos` | `$22` |
| `i_antecedente_personal` / `u_antecedente_personal` | `_frecuenciaCepillado` | `$23` |
| `i_antecedente_personal` / `u_antecedente_personal` | `_cepilloDuro` | `$24` |
| `i_antecedente_personal` / `u_antecedente_personal` | `_cepilloMediano` | `$25` |
| `i_antecedente_personal` / `u_antecedente_personal` | `_cepilloBlando` | `$26` |
| `i_antecedente_personal` / `u_antecedente_personal` | `_cepilloElectrico` | `$27` |
| `i_antecedente_personal` / `u_antecedente_personal` | `_cepilloInterproximal` | `$28` |
| `i_antecedente_personal` / `u_antecedente_personal` | `_tipoInterproximal` | `$29` |
| `i_antecedente_personal` / `u_antecedente_personal` | `_sedaDental` | `$30` |
| `i_antecedente_personal` / `u_antecedente_personal` | `_enjuagueBucal` | `$31` |
| `i_antecedente_personal` / `u_antecedente_personal` | `_otrosElementosHigiene` | `$32` |
| `i_antecedente_medico` / `u_antecedente_medico` | `_idHistoria.value` | `$1` |
| `i_antecedente_medico` / `u_antecedente_medico` | `_saludGeneral` | `$2` |
| `i_antecedente_medico` / `u_antecedente_medico` | `_bajoTratamiento` | `$3` |
| `i_antecedente_medico` / `u_antecedente_medico` | `_tipoTratamiento` | `$4` |
| `i_antecedente_medico` / `u_antecedente_medico` | `_hospitalizaciones` | `$5` |
| `i_antecedente_medico` / `u_antecedente_medico` | `_tuvoTraumatismos` | `$6` |
| `i_antecedente_medico` / `u_antecedente_medico` | `_tipoTraumatismos` | `$7` |
| `i_antecedente_medico` / `u_antecedente_medico` | `_alergias` | `$8` |
| `i_antecedente_medico` / `u_antecedente_medico` | `_medicamentosContraindicados` | `$9` |
| `i_antecedente_medico` / `u_antecedente_medico` | `_enfHepatitis` | `$10` |
| `i_antecedente_medico` / `u_antecedente_medico` | `_enfAlergiaCronica` | `$11` |
| `i_antecedente_medico` / `u_antecedente_medico` | `_enfCorazon` | `$12` |
| `i_antecedente_medico` / `u_antecedente_medico` | `_enfFiebreReumatica` | `$13` |
| `i_antecedente_medico` / `u_antecedente_medico` | `_enfAnemia` | `$14` |
| `i_antecedente_medico` / `u_antecedente_medico` | `_enfAsma` | `$15` |
| `i_antecedente_medico` / `u_antecedente_medico` | `_enfDiabetes` | `$16` |
| `i_antecedente_medico` / `u_antecedente_medico` | `_enfEpilepsia` | `$17` |
| `i_antecedente_medico` / `u_antecedente_medico` | `_enfCoagulacion` | `$18` |
| `i_antecedente_medico` / `u_antecedente_medico` | `_enfTbc` | `$19` |
| `i_antecedente_medico` / `u_antecedente_medico` | `_enfHipertension` | `$20` |
| `i_antecedente_medico` / `u_antecedente_medico` | `_enfUlcera` | `$21` |
| `i_antecedente_medico` / `u_antecedente_medico` | `_enfNeurologica` | `$22` |
| `i_antecedente_medico` / `u_antecedente_medico` | `_otrasEnfPatologicas` | `$23` |
| `i_antecedente_medico` / `u_antecedente_medico` | `_odontologicos` | `$24` |
| `i_antecedente_familiar` / `u_antecedente_familiar` | `_idHistoria.value` | `$1` |
| `i_antecedente_familiar` / `u_antecedente_familiar` | `_descripcion` | `$2` |
| `i_antecedente_cumplimiento` / `u_antecedente_cumplimiento` | `_idHistoria.value` | `$1` |
| `i_antecedente_cumplimiento` / `u_antecedente_cumplimiento` | `_motivoDolor` | `$2` |
| `i_antecedente_cumplimiento` / `u_antecedente_cumplimiento` | `_motivoControl` | `$3` |
| `i_antecedente_cumplimiento` / `u_antecedente_cumplimiento` | `_frecuenciaControlMeses.value` | `$4` |
| `i_antecedente_cumplimiento` / `u_antecedente_cumplimiento` | `_motivoLimpieza` | `$5` |
| `i_antecedente_cumplimiento` / `u_antecedente_cumplimiento` | `_frecuenciaLimpiezaMeses.value` | `$6` |
| `i_antecedente_cumplimiento` / `u_antecedente_cumplimiento` | `_actitudTranquilo` | `$7` |
| `i_antecedente_cumplimiento` / `u_antecedente_cumplimiento` | `_actitudAprensivo` | `$8` |
| `i_antecedente_cumplimiento` / `u_antecedente_cumplimiento` | `_actitudPanico` | `$9` |
| `i_antecedente_cumplimiento` / `u_antecedente_cumplimiento` | `_desagradoAtencion` | `$10` |
| `i_antecedente_cumplimiento` / `u_antecedente_cumplimiento` | `_fechaConsentimiento.value` | `$11` |
| `i_antecedente_cumplimiento` / `u_antecedente_cumplimiento` | `_firmaNombre` | `$12` |
| `i_antecedente_cumplimiento` / `u_antecedente_cumplimiento` | `_historiaElaboradaPor` | `$13` |

## Caso Implementado: Enfermedad Actual

### Módulo: Enfermedad Actual

**Responsabilidad del Agregado:** proteger la coherencia clínica del relato de la enfermedad actual del paciente, validando el identificador de historia como UUID y garantizando que el síntoma principal exista antes de persistir el resto de la anamnesis.

**Invariantes Defendidas (Value Objects):**

- Validación de UUID para `id_historia`.
- Validación obligatoria de `sintoma_principal` como texto clínico no vacío.
- Normalización de campos textuales opcionales como `tiempo_enfermedad`, `forma_inicio`, `curso`, `relato` y `tratamiento_prev`.

**Mapeo de Parámetros a Infraestructura:**
| Proceso | Propiedad privada del agregado | Parámetro SQL |
|---|---|---|
| `i_enfermedad_actual` / `u_enfermedad_actual` | `_idHistoria.value` | `$1` |
| `i_enfermedad_actual` / `u_enfermedad_actual` | `_sintomaPrincipal.value` | `$2` |
| `i_enfermedad_actual` / `u_enfermedad_actual` | `_tiempoEnfermedad` | `$3` |
| `i_enfermedad_actual` / `u_enfermedad_actual` | `_formaInicio` | `$4` |
| `i_enfermedad_actual` / `u_enfermedad_actual` | `_curso` | `$5` |
| `i_enfermedad_actual` / `u_enfermedad_actual` | `_relato` | `$6` |
| `i_enfermedad_actual` / `u_enfermedad_actual` | `_tratamientoPrev` | `$7` |

## Caso Implementado: Filiación

### Nombre y Responsabilidad del Agregado

**Agregado:** `FiliacionAggregate`

**Responsabilidad:** representar la filiación del paciente como una unidad de negocio consistente, validando invariantes en memoria antes de delegar la persistencia. El agregado encapsula los datos clínicos y expone `obtenerParametros()` para entregar al repositorio los valores limpios en el orden exacto que espera la base de datos.

### Invariantes Defendidas

Los Value Objects validan reglas clínicas y estructurales en RAM antes de llegar a la base de datos:

- `IdHistoriaValueObject`
  - Acepta solo UUID válidos.
  - Rechaza valores vacíos, no cadenas o formatos UUID corruptos.

- `EdadValueObject`
  - Acepta solo enteros entre 0 y 130.
  - Permite valor nulo cuando el campo no aplica o no fue informado.
  - Rechaza edades corruptas o fuera de rango.

- `FechaClinicaValueObject`
  - Acepta fechas válidas.
  - Permite valor nulo cuando el dato no es obligatorio.
  - Rechaza formatos inválidos antes de persistir.
  - Normaliza la fecha a ISO para reducir ambigüedad.

- `sexo` dentro del agregado
  - Acepta únicamente valores clínicamente permitidos: `M`, `F`, `Masculino`, `Femenino`, `O`.
  - Rechaza valores fuera del catálogo.

### Comparativa Antes vs Después

**Antes:** el controlador enviaba `req.body` directamente al modelo y el modelo actuaba como una bolsa de datos anémica, copiando el payload casi sin validación explícita.

**Después:** el controlador construye un agregado de dominio con propiedades explícitas y el agregado valida sus invariantes antes de persistir. Ya no existe el uso ciego de `req.body` como estado interno del modelo; ahora cada campo crítico se asigna y valida de forma intencional. La persistencia quedó aislada en un repositorio, manteniendo intactas las consultas SQL originales.

### Tabla de Mapeo de Persistencia

| Orden | Propiedad explícita del agregado | Parámetro SQL |
| ----: | -------------------------------- | ------------- |
|     1 | `_idHistoria.value`              | `$1`          |
|     2 | `_raza`                          | `$2`          |
|     3 | `_fechaNacimiento.value`         | `$3`          |
|     4 | `_lugar`                         | `$4`          |
|     5 | `_estadoCivil`                   | `$5`          |
|     6 | `_nombreConyuge`                 | `$6`          |
|     7 | `_ocupacion`                     | `$7`          |
|     8 | `_lugarProcedencia`              | `$8`          |
|     9 | `_tiempoResidenciaTacna`         | `$9`          |
|    10 | `_direccion`                     | `$10`         |
|    11 | `_ultimaVisitaDentista`          | `$11`         |
|    12 | `_motivoVisitaDentista`          | `$12`         |
|    13 | `_ultimaVisitaMedico`            | `$13`         |
|    14 | `_motivoVisitaMedico`            | `$14`         |
|    15 | `_contactoEmergencia`            | `$15`         |
|    16 | `_telefonoEmergencia`            | `$16`         |
|    17 | `_acompaniante`                  | `$17`         |
|    18 | `_edad.value`                    | `$18`         |
|    19 | `_sexo`                          | `$19`         |
|    20 | `_fechaElaboracion.value`        | `$20`         |

### Observación de Arquitectura

El controlador mantiene los nombres exportados originales para no romper rutas ni contratos existentes, y el repositorio conserva exactamente las mismas llamadas SQL del modelo previo (`CALL i_filiacion`, `SELECT ...`, `CALL u_filiacion`).

## Regla Para Nuevos Modelos Ricos

Cuando se agregue un nuevo agregado, este documento debe ampliarse con:

- Nombre del agregado.
- Responsabilidad.
- Value Objects e invariantes.
- Mapeo de persistencia.
- Notas sobre compatibilidad con rutas y contratos existentes.

## Caso Implementado: Motivo Consulta

### Módulo: Motivo Consulta

**Responsabilidad del Agregado:** validar que `id_historia` sea un UUID válido y que el campo `motivo` sea texto no vacío; exponer `obtenerParametros()` para mantener el orden posicional de los parámetros usados por los procedimientos almacenados.

**Invariantes Defendidas (Value Objects):**

- Validación de UUID para `id_historia`.
- `motivo` debe ser una cadena no vacía y se normaliza (trim) en memoria.

**Mapeo de Parámetros a Infraestructura:**
| Proceso | Propiedad privada del agregado | Parámetro SQL |
|---|---|---|
| `i_motivo_consulta` / `u_motivo_consulta` | `_idHistoria.value` | `$1` |
| `i_motivo_consulta` / `u_motivo_consulta` | `_motivo.value` | `$2` |

**Notas:** El controlador debe traducir `DomainError` a HTTP `400` y mantener las interfaces públicas `create`, `getById`, `getByHistoria` y `update` para compatibilidad con código y tests existentes.

## Caso Implementado: Catálogo Clínico

### Módulo: Catálogo

**Responsabilidad del Agregado:** `CatalogoAggregate` valida en memoria el nombre del catálogo (solo tablas permitidas) y los identificadores usados en consultas, protegiendo la capa de persistencia de inyecciones y peticiones inválidas. El agregado expone métodos para obtener parámetros en el orden esperado por los repositorios que mantienen las mismas consultas SQL.

**Invariantes Defendidas (Value Objects):**

- `CatalogNameValueObject`: valida que `nombre` sea una cadena incluida en la lista blanca `allowedCatalogs`. Rechaza nombres no permitidos y evita consultas arbitrarias a tablas.
- `IdPositiveValueObject`: valida que `id` sea un entero positivo (mayor que 0). Rechaza valores no numéricos, negativos o fraccionarios.

**Comparativa Antes vs Después:**

- Antes: el controlador/modelo recibía `nombre` e `id` y los pasaba directamente al SQL; era fácil invocar tablas no deseadas o pasar ids inválidos.
- Después: el controlador construye `CatalogNameValueObject` y `IdPositiveValueObject` y crea el `CatalogoAggregate` (sin almacenar un `req.body` genérico). Las validaciones críticas se ejecutan en RAM y solo si pasan se ejecuta la consulta. La persistencia permanece aislada en un Repositorio que conserva las consultas exactamente como antes.

**Tabla de Mapeo de Persistencia:**

- Operación: `SELECT * FROM ${nombre}` (listar)
  - Propiedad del agregado: `_catalogName.value` → (se usa para seleccionar la tabla, validada por `CatalogNameValueObject`).
  - Parámetros posicionales: ninguno (consulta tal cual).

- Operación: `SELECT * FROM ${nombre} WHERE id_grupo_sanguineo = $1` (obtener nombre por id)
  - `$1` : `_id.value` (proveniente de `IdPositiveValueObject`)

**Notas de compatibilidad:**

- No se alteraron las firmas públicas: `listarOpcionesCatalogoClinico(nombre)` y `obtenerNombreOpcionCatalogoClinico(nombre, id)` siguen existiendo.
- Las consultas SQL se mantienen idénticas para respetar la infraestructura y las expectativas actuales del código.

## Caso Implementado: Lista HC Adultos

### Módulo: Listado de Historias Clínicas de Adultos por Estudiante

**Responsabilidad del Agregado:** `ListaHcAdultosAggregate` valida en memoria el identificador del estudiante y expone parámetros ordenados para la llamada a la función SQL `fn_listar_historias_clinicas_adultos_por_estudiante($1)`. Protege la capa de persistencia contra ids inválidos.

**Invariantes Defendidas (Value Objects):**

- `IdUuidValueObject`: valida que `idEstudiante` sea un UUID válido (validación básica de longitud 36; se puede endurecer con regex v4). Rechaza valores no string o con formato incorrecto.

**Comparativa Antes vs Después:**

- Antes: el controlador pasaba el `id` tal cual al modelo/consulta; cualquier valor podía llegar a la función SQL y devolver resultados inesperados.
- Después: el controlador construye `IdPositiveValueObject` y el `ListaHcAdultosAggregate` (sin usar un `req.body` genérico). Solo si la validación en RAM pasa se invoca la función SQL con el parámetro `$1` validado.

**Tabla de Mapeo de Persistencia:**

- Operación: `SELECT * FROM fn_listar_historias_clinicas_adultos_por_estudiante($1)`
  - `$1` : `_idEstudiante.value` (proveniente de `IdUuidValueObject`)

## Caso Implementado: Paciente

### Módulo: Pacientes (crear / actualizar)

**Responsabilidad del Agregado:** `PatientAggregate` valida en memoria los campos críticos de un paciente (nombre, apellido y fecha de nacimiento cuando se provee) y normaliza los valores antes de pasar los parámetros al repositorio que llama a `fn_crear_paciente` o `CALL u_paciente`.

**Invariantes Defendidas (Value Objects):**

- `NombreValueObject`: asegura que `nombre` sea una cadena no vacía.
- `ApellidoValueObject`: asegura que `apellido` sea una cadena no vacía.
- `FechaNacimientoValueObject`: acepta `null` o una fecha válida; normaliza a ISO date (YYYY-MM-DD) en memoria.
- `IdUuidValueObject`: valida formato/longitud básica de UUID para identificadores usados en actualizaciones (se espera string de 36 caracteres).

**Comparativa Antes vs Después:**

- Antes: el controlador tomaba `req.body` y lo pasaba directamente al modelo que ejecutaba las funciones/procedures SQL (antipatrón bolsa de datos).
- Después: el controlador construye `NombreValueObject`, `ApellidoValueObject`, `FechaNacimientoValueObject` y un `PatientAggregate` (sin almacenar `req.body`). El agregado expone `obtenerParametrosParaCrear()` y `obtenerParametrosParaActualizar()` que el repositorio usa para llamar exactamente a `fn_crear_paciente($1..$7)` y `CALL u_paciente($1..$6)` respectivamente.

**Tabla de Mapeo de Persistencia:**

- Operación: `SELECT fn_crear_paciente($1, $2, $3, $4, $5, $6, $7) AS id_paciente`
  - `$1` : `_nombre.value`
  - `$2` : `_apellido.value`
  - `$3` : `_dni` (o `null`)
  - `$4` : `_fechaNacimiento.value` (ISO) o `null`
  - `$5` : `_sexo` (o `null`)
  - `$6` : `_telefono` (o `null`)
  - `$7` : `_email` (o `null`)

- Operación: `CALL u_paciente($1, $2, $3, $4, $5, $6)`
  - `$1` : `id` (validado por `IdUuidValueObject`)
  - `$2` : `_nombre.value` (o `null`)
  - `$3` : `_apellido.value` (o `null`)
  - `$4` : `_telefono` (o `null`)
  - `$5` : `_email` (o `null`)
  - `$6` : `activo` (se mantiene `null` para no modificarlo, conforme al contrato existente)

**Notas de compatibilidad:**

- Las funciones públicas del modelo (`registrarPaciente`, `actualizarPaciente`) y las rutas que las llaman no han cambiado de firma. Los repositorios mantienen las mismas llamadas SQL y orden posicional de parámetros.

## Caso Implementado: Student (Pacientes por estudiante)

### Módulo: Estudiantes → Pacientes Adultos

**Responsabilidad del Agregado:** `StudentAggregate` valida que el identificador del estudiante sea un UUID válido antes de invocar la función SQL `fn_obtener_pacientes_adultos($1)`. Evita que valores inválidos lleguen a la capa de persistencia.

**Invariantes Defendidas (Value Objects):**

- `IdUuidValueObject`: asegura que `studentId` sea un UUID (validación básica de longitud y tipo). Inmutable.

**Comparativa Antes vs Después:**

- Antes: el controlador hacía una comprobación simple de longitud y pasaba el id directamente al modelo.
- Después: el controlador construye `IdUuidValueObject` y el `StudentAggregate`; el repositorio utiliza `aggregate.obtenerParametros()` para pasar `$1` a la función SQL solo si la validación pasó en memoria.

**Tabla de Mapeo de Persistencia:**

- Operación: `SELECT * FROM fn_obtener_pacientes_adultos($1)`
  - `$1`: `_idStudent.value` (de `IdUuidValueObject`)

## Caso Implementado: Usuario (Registro y Autenticación)

### Módulo: Usuarios

**Responsabilidad del Agregado:** `UserAggregate` valida en RAM `userCode` y `email` antes de registrar un usuario. El modelo se encarga de hashear la contraseña y el Repositorio llama a `CALL i_registrar_usuario(...)` con los parámetros en el mismo orden posicional esperado por la DB.

**Invariantes Defendidas (Value Objects):**

- `UserCodeValueObject`: asegura que `userCode` sea una cadena no vacía.
- `EmailValueObject`: valida formato básico de email.

**Comparativa Antes vs Después:**

- Antes: el controlador/servicio pasaba valores sin VOs y el modelo intentaba ejecutar el `CALL` directamente, devolviendo `null` en fallos.
- Después: el controlador construye `UserCodeValueObject` y `EmailValueObject`, el `UserAggregate` centraliza los datos (excepto el hash de la contraseña, que se genera en el modelo), y el repositorio ejecuta `CALL i_registrar_usuario` con parámetros ya validados y normalizados.

**Tabla de Mapeo de Persistencia:**

- Operación: `CALL i_registrar_usuario($1, $2, $3, $4, $5, $6, $7)`
  - `$1`: `_userCode.value`
  - `$2`: `_firstName`
  - `$3`: `_lastName`
  - `$4`: `_dni` (o `null`)
  - `$5`: `_email.value`
  - `$6`: `_role` (o `null`)
  - `$7`: `_hashedPassword`

**Notas de compatibilidad:**

- Se mantuvieron las funciones públicas: `registrarUsuario`, `autenticarUsuario`, `obtenerUsuarioPorId` y las rutas no requieren cambios.
- El hashing de la contraseña sigue realizándose en el modelo antes de llamar al procedure SQL.
