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
- `HcModel` núcleo legado mínimo para revisión, registro de historia, borrador, asignación y consulta de paciente

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

## Caso Implementado: Diagnóstico Presuntivo

### Módulo: Diagnóstico Presuntivo

Responsabilidad del Agregado:

- Encapsular la lógica del diagnóstico presuntivo asociado a una historia clínica (`id_historia`), validando el identificador, normalizando la `descripcion` y el `idUsuario` en memoria, y exponiendo `obtenerParametros()` para que el repositorio (o `HcModel`) ejecute la persistencia sin romper el contrato SQL existente.

Invariantes Defendidas (Value Objects):

- `IdHistoriaValueObject`: acepta UUIDv4 y normaliza eliminando el prefijo visual `HC-` cuando aplica.
- `TextoValueObject`: normaliza la `descripcion` (trim + `'' -> null`) para evitar enviar cadenas vacías a la DB.
- `IdUsuarioValueObject`: valida que `idUsuario` provenga del token y sea UUIDv4 para trazabilidad.

Mapeo de Parámetros a Infraestructura:
| Posición ($n) | Propiedad privada del Agregado |
|---:|---|
| $1 | `_idHistory.value` |
| $2 | `_descripcion` |
| $3 | `_idUsuario` |

Notas de compatibilidad:

- El controlador construye `DiagnosticoPresuntivoAggregate` y traduce `DomainError` a HTTP `400` para no romper clientes existentes.
- El modelo sigue delegando en `HcModel` para mantener la capa de persistencia y las llamadas SQL; los parámetros se envían en el orden posicional `$1,$2,$3`.
- El controlador acepta `id_historia` con o sin prefijo `HC-` y lo normaliza antes de validar.

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

## Caso Implementado: Examen Físico General

### Módulo: Examen Físico General

Responsabilidad del Agregado:

- Proteger la integridad del examen físico general asociado a una historia clínica (`id_historia`), validando el identificador como UUIDv4, normalizando los campos primitivos y aplicando validaciones críticas en Value Objects antes de invocar el procedimiento almacenado `u_examen_general`.

Invariantes Defendidas (Value Objects):

- `TemperaturaVO`: convierte a número si es posible; si la entrada no es numérica o está fuera de rango razonable (30-45 °C) se normaliza a `null` para preservación y compatibilidad con la UI.
- `PesoVO`: convierte a número si es posible; si la entrada no es un número válido o está fuera de rango se normaliza a `null`.
- `PresionArterialVO`: valida el formato `"sistolica/diastolica"` (ej. `120/80`); si no cumple, se normaliza a `null` para no bloquear el guardado desde la UI.
- Normalización general de primitivas: `_normalizePrimitive()` hace `trim()` y convierte strings vacíos a `null`.

Comparativa Antes vs Después:

- Antes: el modelo actuaba como una bolsa de datos (se pasaba `req.body` directamente a la consulta/procedimiento), sin Value Objects ni normalización centralizada.
- Después: el `ExamenFisicoGeneralAggregate` desempaqueta cada campo en propiedades privadas explícitas (`this._posicion`, `this._temperatura`, `this._peso`, etc.), aplica Value Objects para invariantes críticas y expone `obtenerParametros()` que garantiza el orden posicional requerido por la infraestructura. Se mantuvieron las llamadas SQL originales para compatibilidad.

Mapeo de Parámetros a Infraestructura:
| Posición ($n) | Propiedad privada del Agregado |
|---:|---|
| $1 | `this._idHistory` |
| $2 | `this._posicion` |
| $3 | `this._actitud` |
| $4 | `this._deambulacion` |
| $5 | `this._facies` |
| $6 | `this._faciesObs` |
| $7 | `this._conciencia` |
| $8 | `this._constitucion` |
| $9 | `this._estadoNutritivo` |
| $10 | `this._temperatura.value` |
| $11 | `this._presionArterial.value` |
| $12 | `this._frecuenciaRespiratoria` |
| $13 | `this._pulso` |
| $14 | `this._peso.value` |
| $15 | `this._talla` |
| $16 | `this._pielColor` |
| $17 | `this._pielHumedad` |
| $18 | `this._pielLesiones` |
| $19 | `this._pielLesionesObs` |
| $20 | `this._pielAnexos` |
| $21 | `this._pielAnexosObs` |
| $22 | `this._tcsDistribucion` |
| $23 | `this._tcsDistribucionObs` |
| $24 | `this._tcsCantidad` |
| $25 | `this._ganglios` |
| $26 | `this._gangliosObs` |

Notas de compatibilidad:

- `actualizarExamenFisicoGeneral` acepta ahora un `ExamenFisicoGeneralAggregate` (recomendado) o un objeto plano para compatibilidad con código existente. La llamada final al procedimiento `u_examen_general` utiliza exactamente el mismo número y orden de parámetros que el modelo anterior.

## Caso Implementado: Examen Físico Regional

### Módulo: Examen Físico Regional

Responsabilidad del Agregado:

- Proteger la integridad del examen físico regional asociado a una historia clínica (`id_historia`), validando el identificador como UUIDv4, normalizando todos los campos y aplicando Value Objects para invariantes numéricas críticas (por ejemplo agudeza visual, apertura máxima y grado de dolor muscular) antes de invocar `u_examen_regional`.

Invariantes Defendidas (Value Objects):

- `AgudezaVisualVO`: convierte a número si posible; entradas no numéricas o fuera de rango se normalizan a `null` para mantener compatibilidad con la UI.
- `AperturaMaximaVO`: valida mm de apertura (si es numérico y plausible); entradas inválidas se normalizan a `null`.
- `MusculosDolorGradoVO`: normaliza grado de dolor a número válido o `null` si no es parseable.
- Campos textuales y booleanos: normalizados con `_normalizePrimitive()` (trim + ''→null).

Comparativa Antes vs Después:

- Antes: el modelo pasaba objetos planos sin validación; la UI libre de texto podía provocar errores de tipo en la base.
- Después: `ExamenFisicoRegionalAggregate` desempaqueta cada campo en propiedades privadas, usa VOs para validar/normalizar valores críticos y expone `obtenerParametros()` que devuelve los 51 parámetros posicionales en el orden requerido por `u_examen_regional`.

Mapeo de Parámetros a Infraestructura:
| Posición ($n) | Propiedad privada del Agregado |
|---:|---|
| $1 | `this._idHistory` |
| $2 | `this._cabezaPosicion` |
| $3 | `this._cabezaMovimientos` |
| $4 | `this._cabezaMovimientosObs` |
| $5 | `this._craneoTamano` |
| $6 | `this._craneoForma` |
| $7 | `this._caraFormaFrente` |
| $8 | `this._caraFormaPerfil` |
| $9 | `this._ojosCejasAdecuada` |
| $10 | `this._ojosImplantacionObs` |
| $11 | `this._ojosEscleroticas` |
| $12 | `this._ojosAgudezaVisual.value` |
| $13 | `this._ojosIrisColor` |
| $14 | `this._ojosArcoSenil` |
| $15 | `this._narizForma` |
| $16 | `this._narizPermeables` |
| $17 | `this._narizSecreciones` |
| $18 | `this._narizSenosDolorosos` |
| $19 | `this._oidosAnomaliasMorfologicas` |
| $20 | `this._oidosAnomaliasObs` |
| $21 | `this._oidosSecreciones` |
| $22 | `this._oidosAudicionConservada` |
| $23 | `this._atmTrayectoria` |
| $24 | `this._atmLatIzqDolor` |
| $25 | `this._atmLatIzqRuido` |
| $26 | `this._atmLatIzqSalto` |
| $27 | `this._atmLatDerDolor` |
| $28 | `this._atmLatDerRuido` |
| $29 | `this._atmLatDerSalto` |
| $30 | `this._atmProtDolor` |
| $31 | `this._atmProtRuido` |
| $32 | `this._atmProtSalto` |
| $33 | `this._atmAperDolor` |
| $34 | `this._atmAperRuido` |
| $35 | `this._atmAperSalto` |
| $36 | `this._atmCierreDolor` |
| $37 | `this._atmCierreRuido` |
| $38 | `this._atmCierreSalto` |
| $39 | `this._atmCoordinacionCondilar` |
| $40 | `this._atmAperturaMaximaMm.value` |
| $41 | `this._atmObservaciones` |
| $42 | `this._atmMusculosDolor` |
| $43 | `this._atmMusculosDolorGrado.value` |
| $44 | `this._atmMusculosDolorZona` |
| $45 | `this._cuelloSimetrico` |
| $46 | `this._cuelloSimetricoObs` |
| $47 | `this._cuelloMovilidadConservada` |
| $48 | `this._cuelloMovilidadObs` |
| $49 | `this._laringeAlineada` |
| $50 | `this._laringeaAlineadaObs` |
| $51 | `this._cuelloOtros` |

Notas de compatibilidad:

- `actualizarExamenFisicoRegional` acepta un `ExamenFisicoRegionalAggregate` o un objeto plano por compatibilidad. La interfaz externa de rutas y controladores no cambia; el controlador traduce `DomainError` a HTTP `400`.

## Caso Implementado: Examen Clínico Boca

### Módulo: Examen Clínico Boca

Responsabilidad del Agregado:

- Encapsular y proteger la integridad del examen clínico bucal asociado a una historia clínica, validando `id_historia` como UUIDv4, normalizando campos textuales y aplicando Value Objects para campos codificados/numerales críticos antes de llamar al procedure `u_examen_clinico_boca`.

Invariantes Defendidas (Value Objects):

- `OclusionCodeVO`: preserva la etiqueta clínica tal como la envía la UI (`Clase I`, `Clase II`, `Clase III`, `No registrable`, `Sí`, `No`, etc.) y solo normaliza vacíos a `null`.
- `OverbiteVO` y `OverjetVO`: preservan el valor ingresado como texto limpio; no fuerzan coerción numérica para no romper el envío desde el formulario.
- `_normalizePrimitive()` para textos: `trim()` y `'' -> null`.

Comparativa Antes vs Después:

- Antes: el modelo pasaba los valores recibidos directamente al `CALL u_examen_clinico_boca`, lo que podía provocar `invalid input syntax for type numeric` cuando la UI enviaba texto libre.
- Después: `ExamenBocaAggregate` desempaqueta campos, aplica VOs y normalización, y expone `obtenerParametros()` que garantiza el orden posicional de 39 parámetros requerido por el procedure. Entradas inválidas se envían como `NULL` en lugar de provocar errores.

Mapeo de Parámetros a Infraestructura:
| Posición ($n) | Propiedad privada del Agregado |
|---:|---|
| $1 | `this._idHistory` |
| $2 | `this._labiosSin` |
| $3 | `this._labiosCon` |
| $4 | `this._vestibuloSin` |
| $5 | `this._vestibuloCon` |
| $6 | `this._carrillosSin` |
| $7 | `this._carrillosCon` |
| $8 | `this._paladarSin` |
| $9 | `this._paladarCon` |
| $10 | `this._orofaringeSin` |
| $11 | `this._orofaringeCon` |
| $12 | `this._pisoBocaSin` |
| $13 | `this._pisoBocaCon` |
| $14 | `this._lenguaSin` |
| $15 | `this._lenguaCon` |
| $16 | `this._enciaSin` |
| $17 | `this._enciaCon` |
| $18 | `this._oclusionMolarDer.value` |
| $19 | `this._oclusionMolarIzq.value` |
| $20 | `this._oclusionCaninaDer.value` |
| $21 | `this._oclusionCaninaIzq.value` |
| $22 | `this._oclusionMordidaCruzada` |
| $23 | `this._oclusionVestibuloclusion` |
| $24 | `this._oclusionOverbite.value` |
| $25 | `this._oclusionMordidaAbierta` |
| $26 | `this._oclusionSobremordida` |
| $27 | `this._oclusionVerticalOtros` |
| $28 | `this._oclusionOverjet.value` |
| $29 | `this._oclusionProtrusion` |
| $30 | `this._oclusionGuiaIncisiva` |
| $31 | `this._oclusionContactoPosterior` |
| $32 | `this._latDerGuiaCanina` |
| $33 | `this._latDerFuncionGrupo` |
| $34 | `this._latDerContactoBalance` |
| $35 | `this._latDerDescriba` |
| $36 | `this._latIzqGuiaCanina` |
| $37 | `this._latIzqFuncionGrupo` |
| $38 | `this._latIzqContactoBalance` |
| $39 | `this._latIzqDescriba` |

Notas de compatibilidad:

- `actualizarExamenBoca` acepta un `ExamenBocaAggregate` o un objeto plano. La llamada a `u_examen_clinico_boca` usa exactamente los 39 parámetros posicionales esperados.

## Caso Implementado: Higiene Bucal

### Módulo: Higiene Bucal

Responsabilidad del Agregado:

- Proteger la integridad del examen de higiene bucal asociado a una historia clínica, validando `id_historia` como UUIDv4, asegurando que `estadoHigiene` no llegue vacío y que `idUsuario` sea un entero positivo antes de invocar `i_examen_higiene_oral`.

Invariantes Defendidas (Value Objects):

- `IdHistoriaValueObject`: valida que `id_historia` sea una cadena UUIDv4 no vacía.
- `EstadoHigieneValueObject`: valida que `estadoHigiene` exista y no sea una cadena vacía; preserva el texto limpio enviado por la UI.
- `idUsuario`: se normaliza y valida como UUIDv4 porque el identificador real del usuario llega desde el token y se persiste como identificador de trazabilidad clínica.
- El identificador mostrado por la UI puede venir con prefijo visual `HC-`; el agregado lo normaliza y valida contra el UUID limpio antes de persistir.

Comparativa Antes vs Después:

- Antes: el controlador reenviaba `req.body` y `req.user.id` directamente al modelo, sin un agregado explícito ni validación centralizada.
- Después: `HigieneBocalAggregate` encapsula los tres valores críticos en propiedades privadas, valida en RAM y expone `obtenerParametros()` para llamar a `i_examen_higiene_oral($1, $2, $3)` sin alterar el contrato SQL.

Mapeo de Parámetros a Infraestructura:
| Posición ($n) | Propiedad privada del Agregado |
|---:|---|
| $1 | `this._idHistory.value` |
| $2 | `this._estadoHigiene.value` |
| $3 | `this._idUsuario` |

Notas de compatibilidad:

- `actualizarHigieneBocal` acepta un `HigieneBocalAggregate` o un objeto plano con `idHistory`, `estadoHigiene` e `idUsuario` para mantener compatibilidad con el controlador existente.

## Caso Implementado: Derivación Clínicas

### Módulo: Derivación Clínicas

Responsabilidad del Agregado:

- Encapsular la lógica de validación y normalización para las derivaciones clínicas asociadas a una historia (`id_historia`), garantizando que los parámetros que llegan al procedimiento `i_derivacion_clinicas` estén ordenados, normalizados y validados en RAM antes de tocar la base de datos.

Invariantes Defendidas (Value Objects):

- `IdHistoriaValueObject`: acepta UUIDv4; normaliza y elimina el prefijo visual `HC-` si está presente.
- `IdUsuarioValueObject`: valida que el identificador del usuario sea un UUIDv4 (proviene del token) para trazabilidad.
- `DestinosValueObject`: acepta objetos o cadenas JSON válidas; normaliza a objeto en memoria y rechaza JSON inválido.
- `TextoValueObject`: normaliza cadenas vacías a `null` y `trim()` en memoria para `observaciones`, `alumno` y `docente`.

Mapeo de Parámetros a Infraestructura:
| Posición ($n) | Propiedad privada del Agregado |
|---:|---|
| $1 | `_idHistory.value` |
| $2 | `JSON.stringify(_destinos)` |
| $3 | `_observaciones` |
| $4 | `_alumno` |
| $5 | `_docente` |
| $6 | `_idUsuario` |

Notas de compatibilidad:

- El controlador construye `DerivacionClinicasAggregate` y traduce `DomainError` a HTTP `400` sin cambiar rutas públicas.
- Se preserva la llamada SQL original: `CALL i_derivacion_clinicas($1,$2,$3,$4,$5,$6)`; `destinos` se envía como JSON string.
- El controlador acepta `id_historia` con o sin prefijo `HC-` y normaliza antes de validación.

## Caso Implementado: Diagnóstico Clínicas

### Módulo: Diagnóstico Clínicas

Responsabilidad del Agregado:

- Encapsular y normalizar la información clínica relacionada con diagnósticos definitivos (módulo `clinicas`), validando `id_historia` como UUIDv4, normalizando fechas y textos, y preparando los parámetros posicionales para el procedimiento `i_diagnostico_clinicas`.

Invariantes Defendidas (Value Objects):

- `IdHistoriaValueObject`: valida y normaliza UUIDv4, permite `HC-` prefijo visual y lo elimina antes de persistir.
- `FechaValueObject`: valida fechas y las normaliza a `YYYY-MM-DD` para llamadas a `date` en Postgres.
- `TextoValueObject`: normaliza cadenas vacías a `null` y hace `trim()` para todos los campos textuales (p. ej. `clinicaRespuesta`, `descripcionRespuesta`, `diagnosticoDefinitivo`, `tratamiento`, `pronostico`, `alumnoTratante`).
- `JSONValueObject`: acepta objetos o cadenas JSON válidas para `examenes_auxiliares` y normaliza a objeto en memoria.
- `IdUsuarioValueObject`: valida `idUsuario` (UUIDv4) proveniente del token.

Mapeo de Parámetros a Infraestructura:
| Posición ($n) | Propiedad privada del Agregado |
|---:|---|
| $1 | `_idHistory.value` |
| $2 | `_fechaRespuesta.value` (o `null`) |
| $3 | `_clinicaRespuesta.value` |
| $4 | `_descripcionRespuesta.value` |
| $5 | `JSON.stringify(_examenes)` |
| $6 | `_interconsultaTipo.value` |
| $7 | `_interconsultaFecha.value` (o `null`) |
| $8 | `_interconsultaClinica.value` |
| $9 | `_diagnosticoDefinitivo.value` |
| $10 | `_tratamiento.value` |
| $11 | `_pronostico.value` |
| $12 | `_alumnoTratante.value` |
| $13 | `_idUsuario.value` |

Notas de compatibilidad:

- El controlador ahora construye `DiagnosticoClinicasAggregate` y traduce `DomainError` a HTTP `400` sin cambiar rutas públicas.
- El controlador acepta campos del formulario con nombres alternativos como `fecha`, `clinica`, `diagnosticoDefinitivo`, `tratamiento`, `pronostico` y `alumnoTratante`, además de los nombres históricos del backend.
- Se mantiene la llamada SQL original: `CALL i_diagnostico_clinicas(...)` con los mismos tipos posicionales; `examenes` se envía como `jsonb` stringificado.
- La función de lectura `consultarDiagnosticoClinicas` devuelve un objeto con las claves crudas de la BD y también alias en camelCase; si no hay fila devuelve `{}` para compatibilidad con GET vacío en la UI.
- Si el tipo exacto del registro no coincide, el GET usa un fallback por `id_historia` para seguir mostrando datos antiguos en la pantalla.

## Caso Implementado: Evolución

### Módulo: Evolución

Responsabilidad del Agregado:

- Encapsular el registro cronológico de evolución clínica, validando la historia clínica como UUIDv4, normalizando la fecha de la nota y asegurando que `actividad` y `alumno` no lleguen vacíos al procedure `i_evolucion`.

Invariantes Defendidas (Value Objects):

- `IdHistoriaValueObject`: valida UUIDv4 y elimina el prefijo visual `HC-` antes de persistir.
- `FechaValueObject`: valida la fecha y la normaliza a `YYYY-MM-DD`.
- `TextoValueObject`: hace `trim()` y convierte cadenas vacías a `null`.
- `IdUsuarioValueObject`: valida el usuario autenticado como UUIDv4.

Mapeo de Parámetros a Infraestructura:
| Posición ($n) | Propiedad privada del Agregado |
|---:|---|
| $1 | `_idHistory.value` |
| $2 | `_fecha.value` |
| $3 | `_actividad.value` |
| $4 | `_alumno.value` |
| $5 | `_idUsuario.value` |

Notas de compatibilidad:

- El controlador acepta `id_historia` o `id` y también elimina el prefijo `HC-` si viene desde la UI.
- `consultarEvoluciones` mantiene el mismo `SELECT ... ORDER BY fecha DESC, id_evolucion DESC` y devuelve un array, aunque esté vacío.
- `registrarEvolucion` sigue usando `CALL i_evolucion(...)` con los mismos cinco parámetros posicionales.

## Núcleo HC Conservado

### Módulo: Historia Clínica Base

Responsabilidad del bloque conservado:

- Mantener únicamente las operaciones que todavía dependen de `hcRoutes` y que no se han movido a controladores/modelos específicos: revisión de historia, creación de historia, listado por estudiante, borrador, asignación de paciente y consulta de paciente por historia.

Operaciones que permanecen en `HcModel` / `HcController`:

- `registrarRevisionHistoriaClinica`
- `registrarHistoriaClinica`
- `listarHistoriasClinicasPorEstudiante`
- `obtenerBorradorHistoriaClinica`
- `asignarPacienteAHistoriaClinica`
- `consultarPacientePorHistoriaClinica`

Operaciones retiradas del bloque núcleo porque ya están modularizadas:

- Filiación
- Motivo de consulta
- Antecedentes anamnesis
- Enfermedad actual
- Examen físico general
- Examen físico regional
- Examen clínico de boca
- Higiene bucal
- Diagnóstico presuntivo
- Derivación clínicas
- Diagnóstico clínicas
- Evolución

Notas de compatibilidad:

- El bloque núcleo no aplica el patrón de agregado rico completo; se conserva como superficie de compatibilidad para las rutas que todavía lo usan.
- Los módulos ya migrados se controlan desde sus propios controladores y modelos, y deben seguir siendo la fuente única de verdad para esas secciones.

## Observación Operativa: Asignación de Paciente a Historia Clínica

- El flujo de asignación de paciente a historia clínica normaliza identificadores visuales con prefijo `HC-` antes de invocar `fn_asignar_paciente_a_historia`.
- El controlador acepta variantes de payload como `idHistory`, `id_historia`, `idPatient`, `id_paciente` y `pacienteId` para reducir fallos por discrepancia entre frontend y backend.
- Cuando el procedure rechaza los datos, el controlador devuelve el mensaje real de error para facilitar el diagnóstico en lugar de ocultarlo tras un 500 genérico.
