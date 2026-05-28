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

### Módulo: User (Vertical Slice)

**Dominio (Core Pura):** `UserCodeValueObject` valida `userCode` no vacío y `EmailValueObject` valida formato de `email`; `UserAggregate` protege invariantes y expone `obtenerParametrosParaRegistrar()` (sin acceso a BD). Errores de validación lanzan `DomainError`.

- **Aplicación (Adaptador Primario):** `UserController` construye el agregado desde `req.body`, hashea la contraseña y orquesta llamadas a `UserRepository` para registrar, listar y obtener usuarios por id. Traduce `DomainError` a HTTP 400.
- **Infraestructura (Adaptador Secundario):** `UserRepository` importa `pool` desde `db/db.js` y ejecuta `CALL i_registrar_usuario(...)`, `SELECT * FROM usuario` y funciones `fn_obtener_usuario*` usando parámetros del agregado, aislando la SQL del dominio.

## Módulo: Catalogo (Vertical Slice)

- **Dominio (Core Pura):** Contiene Value Objects que validan y normalizan el nombre del catálogo (lista blanca) y el id (positivo). El dominio no conoce la base de datos y lanza `DomainError` en caso de validaciones fallidas (`CatalogNameValueObject`, `IdPositiveValueObject`, `CatalogoAggregate`).
- **Aplicación (Adaptador Primario):** El controlador construye el agregado desde `req.params`, captura `DomainError` para responder con HTTP 400 y orquesta llamadas al repositorio para listar o resolver nombres de opciones.
- **Infraestructura (Adaptador Secundario):** El repositorio importa `pool` desde `db/db.js` y ejecuta consultas SQL limitadas a tablas permitidas. La interpolación del nombre de tabla se realiza sólo después de la validación del dominio para minimizar riesgo de inyección.

Este patrón separa validación y reglas del negocio del acceso a la base de datos, facilitando pruebas unitarias y reemplazo de adaptadores.

## 4. Diseño Arquitectónico (Arquitectura Hexagonal)

### 4.1 Diagrama de Arquitectura

```mermaid
flowchart LR
	subgraph Core[Core (Dominio)]
		D1[Entidades]
		D2[Objetos de Valor]
		D3[Agregados]
		D4[Servicios de Dominio]
	end

	subgraph Ports[Puertos (Interfaces)]
		P1[RepositoryPort]
		P2[ApplicationPort]
	end

	subgraph Adapters[Adaptadores (Infraestructura)]
		A1[Repositorios (pool/db)]
		A2[Controladores / Rutas (Express)]
		A3[APIs externas / UI]
	end

	Core -->|usa| Ports
	Ports -->|implementa| Adapters
	A2 -->|invoca| Ports
	A1 -->|persistencia| Adapters
```

El diagrama muestra el `Core` (sin dependencias externas), los `Puertos` que definen contratos/contratos de borde, y los `Adaptadores` que implementan esos puertos (DB, HTTP, UI).

### 4.1.1 Core (Dominio)

- Entidades: objetos con identidad (por ejemplo `HistoriaClinica`).
- Objetos de Valor: inmutables, validan y normalizan (por ejemplo `HistoriaClinicaIdValueObject`).
- Agregados: agrupan entidades/VOs que deben respetar invariantes transaccionales (`HcAggregate`, `UserAggregate`, `PatientAggregate`).
- Servicios de Dominio: lógica que no encaja en un agregado y opera sobre agregados manteniendo invariantes.

### 4.1.2 Puertos (Interfaces)

- RepositoryPort: define operaciones atómicas necesarias por el dominio (por ejemplo `registrarRevision(agregado)` o `listarPorEstudiante(id)`), devuelve primitivas u objetos simples.
- ApplicationPort: contratos que los controladores usan para orquestar casos de uso (p. ej. `registrarHistoriaClinica(dto)`).

### 4.1.3 Adaptadores (Infraestructura)

- Repositorios: implementan `RepositoryPort` usando `pool.query(...)` y preferentemente una única llamada SQL (procedimiento almacenado o transacción) para respetar la frontera transaccional.
- Controladores/Rutas: adaptadores primarios que construyen agregados desde `req`, manejan `DomainError` → 400 y llaman a puertos de aplicación.
- Otros adaptadores: servicios de token, cookies, clientes HTTP, etc.

### 4.2 Decisiones de Diseño

- Por qué usar un agregado específico: seleccionar un agregado responde a la necesidad de mantener invariantes que deben cumplirse en una sola operación atómica. Por ejemplo, `RevisionHistoriaClinicaAggregate` agrupa `id_historia`, `id_docente`, `estado` y `observaciones` porque la regla "no registrar revisiones con estado vacío y siempre referenciar historia válida" debe comprobarse antes de persistir. Mantener esa frontera evita inconsistencias parciales.

- Cómo garantizar la frontera transaccional:
  - Diseñar los `Repository` para exponer operaciones atómicas (ej. `CALL i_revision_historia(...)` o un `BEGIN; ...; COMMIT` en una sola función). El dominio construye los parámetros via `agregado.obtenerParametros()` y la infraestructura ejecuta una única llamada que garantiza la atomicidad en la BD.
  - Evitar que la lógica de negocio haga múltiples llamadas independientes a la BD dentro de la misma operación; si es necesario, encapsularlas en una transacción en el adaptador de infraestructura.
  - Mantener los VOs inmutables y los agregados con métodos que devuelvan parámetros posicionales (contrato estable) para reducir acoplamiento entre dominio e infraestructura.

### Guía práctica para tu compañero — pasos concretos

- Implementar un nuevo vertical-slice:
  1.  Crear `domain/` con VOs, `DomainError` y `Aggregate` que exponga `obtenerParametros()`.
  2.  Crear `infrastructure/` con un `Repository` que implemente los puertos; usar `pool.query()` y preferir una única llamada/función SQL por caso de uso.
  3.  Crear `application/` con controladores que construyan el agregado desde `req`, capture `DomainError` y llame al repositorio.
  4.  Actualizar `routes/` para apuntar al nuevo `application` controller.

- Tests recomendados:
  - Unit tests del dominio: validar VOs, invariantes y `obtenerParametros()`.
  - Unit tests del controller: simular el repositorio (mocks) y verificar respuestas HTTP para casos felices y errores de dominio.
  - Integration test ligero: llamada a la ruta con una BD de prueba o docker-compose y verificar que el procedimiento almacenado fue invocado correctamente.

- Checklist antes de merge:
  - El dominio no importa `pool` ni archivos de infraestructura.
  - Repositorio ejecuta una llamada SQL atómica por caso de uso.
  - Controlador traduce `DomainError` → 400 y errores inesperados → 500.
  - Rutas actualizadas y servidor arranca sin `ERR_MODULE_NOT_FOUND`.

### Ejemplo de contrato (puerto) y adaptador — pseudo-código

- Puerto (`RepositoryPort`):

```js
// repositoryPort.js
export class RegistroRevisionPort {
  async registrarRevision(agregado) {
    /* devuelve boolean */
  }
}
```

- Implementación (adaptador infra):

```js
import pool from '../../db/db.js';
class HcRepository /* implements RegistroRevisionPort */ {
  static async registrarRevision(agregado) {
    return pool.query(
      'CALL i_revision_historia($1,$2,$3,$4)',
      agregado.obtenerParametros()
    );
  }
}
```

Esta separación facilita pruebas: el puerto puede ser mocked en tests de `application` sin tocar la BD.

---

Si quieres, puedo:

- Generar una plantilla `PORT` y `REPOSITORY` para un nuevo módulo.
- Añadir ejemplos de tests unitarios para un `Aggregate` y su `Controller`.
  Si quieres, puedo:
- Generar una plantilla `PORT` y `REPOSITORY` para un nuevo módulo.
- Añadir ejemplos de tests unitarios para un `Aggregate` y su `Controller`.

## 5. Preparación práctica para integración con una IA

Esta sección contiene artefactos y plantillas diseñadas para que una IA (o tu compañero) pueda generar, validar y desplegar vertical-slices automáticamente.

### 5.1 Manifiesto de módulo (metadata)

Coloca un archivo `module.json` en la raíz del vertical-slice para que la IA entienda el contrato del módulo:

```json
{
  "name": "hc",
  "description": "Historias clínicas: registros, revisiones, borradores",
  "endpoints": [
    {
      "method": "POST",
      "path": "/review",
      "action": "registrarRevisionHistoriaClinica"
    },
    {
      "method": "GET",
      "path": "/student/{id}",
      "action": "listarHistoriasClinicasPorEstudiante"
    }
  ],
  "domain": {
    "aggregates": ["RevisionHistoriaClinicaAggregate"],
    "valueObjects": ["HistoriaClinicaIdValueObject"]
  }
}
```

La IA puede leer `module.json` para generar archivos coherentes y rutas.

### 5.2 OpenAPI / contrato HTTP (snippet)

Provee un fragmento OpenAPI para que la IA genere controladores y tests de integración:

```yaml
paths:
	/hc/review:
		post:
			summary: Registrar revisión de historia clínica
			requestBody:
				required: true
				content:
					application/json:
						schema:
							type: object
							properties:
								idHistory: { type: string, format: uuid }
								idTeacher: { type: string, format: uuid }
								state: { type: string }
			responses:
				'201': { description: Created }
				'400': { description: Domain error }
```

### 5.3 Ejemplos de payloads (positivos y negativos)

- Positivo (review):

```json
{
  "idHistory": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "idTeacher": "...",
  "state": "aprobado",
  "observations": "OK"
}
```

- Negativo (falta idHistory):

```json
{ "idTeacher": "...", "state": "aprobado" }
```

La IA debe generar tests que cubran ambos casos.

### 5.4 Plantillas de prompt para la IA (spanish)

Usa estos prompts para pedirle a la IA que genere código consistente con la arquitectura:

- Generar dominio (VO + Aggregate):
  "Eres un generador de código para Node.js (ESM). Crea un archivo `domain/{module}Domain.js` que incluya `DomainError`, los Value Objects y el Aggregate `XAggregate` que exponga `obtenerParametros()`. No incluyas dependencias de infraestructura. Devuelve sólo el contenido del archivo."

- Generar repositorio (infra):
  "Genera `infrastructure/{module}Repository.js` que implemente el puerto `RepositoryPort` y use `pool.query` para ejecutar `CALL` o `SELECT` con `agregado.obtenerParametros()`. Mantén la SQL parametrizada."

- Generar controller (app):
  "Genera `application/{module}Controller.js` con funciones Express (async) que construyan agregados desde `req`, capturen `DomainError` (400) y llamen al repositorio. Devuelve handlers exportados como default object."

Incluye en la petición `module.json` y ejemplos de payloads para que la IA produzca código ajustado al contrato.

### 5.5 Plantillas de archivos (snippets)

- `RepositoryPort` (ejemplo)

```js
// ports/repositoryPort.js
export class RepositoryPort {
  async listarPorEstudiante(id) {
    throw new Error('Not implemented');
  }
}
```

- `Controller` mínimo (ejemplo)

```js
import Repo from '../infrastructure/moduleRepository.js';
const repo = new Repo();
const handler = async (req, res) => {
  try {
    const agg = construirAgregado(req);
    const rows = await repo.listarPorEstudiante(agg.obtenerParametros());
    return res.json(rows);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
export default { handler };
```

### 5.6 Ejemplo de tests (vitest/jest) — Aggregate unit test

```js
import { expect, test } from 'vitest';
import { HistoriaClinicaIdValueObject } from '../../hc/domain/hcDomain.js';

test('HistoriaClinicaIdValueObject valida UUIDv4', () => {
  expect(() => new HistoriaClinicaIdValueObject('invalid')).toThrow();
  expect(
    () =>
      new HistoriaClinicaIdValueObject('3fa85f64-5717-4562-b3fc-2c963f66afa6')
  ).not.toThrow();
});
```

Controller test (mocks):

```js
import { vi, test, expect } from 'vitest';
import Controller from '../../hc/application/hcController.js';

test('listarHistoriasClinicasPorEstudiante responde 200', async () => {
  const req = { params: { id: 'uuid' } };
  const res = { status: vi.fn(() => res), json: vi.fn() };
  // mock repository method
});
```

### 5.7 Validaciones automáticas que la IA puede ejecutar

- Comprobar que `domain` no importe `pool` ni rutas.
- Ejecutar `mcp_pylance_mcp_s_pylanceSyntaxErrors` (o `node --check`) para validar JS.
- Ejecutar pruebas unitarias en modo CI con DB en Docker o mocks.

### 5.8 Convenciones y metadatos útiles

- Nombres: `domain`, `infrastructure`, `application` en ruta raíz del módulo.
- Agregado: exponer `obtenerParametros()` como contrato posicional.
- Archivos: `module.json`, `README.md` corto con endpoints y payloads.
- Mensajes de commit: `feat(module): add vertical-slice {module}`

---

Con esto tu compañero puede alimentar la IA con `module.json`, `modelo-hexa.md` y ejemplos OpenAPI/payloads para que la IA genere artefactos coherentes. ¿Deseas que genere un `module.json` y una plantilla de test para un módulo concreto ahora?
