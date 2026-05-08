# Arquitectura Hexagonal - Guía de Implementación

## Estructura Creada

```
domain/
  ├── ports/
  │   ├── HcRepository.js          (Puerto Secundario - HC)
  │   ├── HcUseCase.js             (Puerto Primario - HC)
  │   ├── UserRepository.js        (Puerto Secundario - User)
  │   ├── PatientRepository.js     (Puerto Secundario - Patient)
  │   └── StudentRepository.js     (Puerto Secundario - Student)
  └── aggregates/
      └── (próximamente: objetos de dominio puros)

application/
  └── services/
      ├── HcApplicationService.js
      ├── UserApplicationService.js
      └── PatientApplicationService.js

infrastructure/
  ├── Container.js                 (Inyector de Dependencias)
  ├── repositories/
  │   ├── HcJpaRepository.js       (Adaptador - HC)
  │   ├── UserJpaRepository.js     (Adaptador - User)
  │   ├── PatientJpaRepository.js  (Adaptador - Patient)
  │   └── StudentJpaRepository.js  (Adaptador - Student)
  └── adapters/
      ├── HcControllerAdapter.js   (Adaptador Primario - HC)
      ├── UserControllerAdapter.js (Adaptador Primario - User)
      └── PatientControllerAdapter.js (Adaptador Primario - Patient)
```

## Cómo Usar (Migración Incremental)

### 1. Usar el Container en tus rutas

**Antes (controladores acoplados a Models):**
```javascript
// routes/hcRoutes.js (VIEJO)
import { HcModel } from '../models/hc/hcModel.js';

router.post('/hc', async (req, res) => {
  const result = await HcModel.registerHc(req.body.idStudent);
  res.json(result);
});
```

**Después (controladores con servicios):**
```javascript
// routes/hcRoutes.js (NUEVO)
import Container from '../infrastructure/Container.js';
import { HcControllerAdapter } from '../infrastructure/adapters/HcControllerAdapter.js';

const adapter = new HcControllerAdapter(
  Container.getCreateHcService(),
  Container.getGetHcByStudentService(),
  Container.getUpdateFiliationService(),
  Container.getCreateReviewService(),
  Container.getAssignPatientToHcService(),
  Container.getCreateDraftHcService(),
  Container.getGetFiliationByHistoryService()
);

router.post('/hc', adapter.registerHc);
router.get('/hc/:studentId', adapter.getByStudent);
router.patch('/hc/:idHistory/filiation', adapter.updateFiliation);
```

### 2. Flujo de Datos (Ejemplo: Crear HC)

```
HTTP Request (POST /hc)
        ↓
HcControllerAdapter.registerHc()  ← Adaptador Primario
        ↓
CreateHcApplicationService.execute()  ← Caso de Uso
        ↓
HcJpaRepository.registerHc()  ← Adaptador Secundario
        ↓
HcModel.registerHc()  ← Modelo Existente (sin cambios)
        ↓
Database (PostgreSQL)
```

### 3. Inyección de Dependencias Manual (Opcional)

Si prefieres control explícito:

```javascript
import { HcJpaRepository } from './infrastructure/repositories/HcJpaRepository.js';
import { CreateHcApplicationService } from './application/services/HcApplicationService.js';

const hcRepo = new HcJpaRepository();
const createHcService = new CreateHcApplicationService(hcRepo);

// Usar
const result = await createHcService.execute({ idStudent: '123' });
```

### 4. Validaciones en Servicios

Los servicios ya validan entrada:

```javascript
// ✅ Funciona
await createHcService.execute({ idStudent: '123' });

// ❌ Lanza error automáticamente
await createHcService.execute({ }); // Error: idStudent is required
```

## Dependency Rule ✅

La arquitectura garantiza:

✅ **Domain NO importa de:**
- `db/db.js`
- `models/`
- `infrastructure/`
- Express, Postgres, etc.

✅ **Application NO importa de:**
- `controllers/`
- `routes/`
- `db/db.js`

✅ **Infrastructure CAN importa de:**
- `domain/`
- `application/`
- `models/` (temporalmente para transición)

## Próximos Pasos (Fase 3)

- [ ] Crear Value Objects en `domain/` (reemplazar primitivos)
- [ ] Mappers: Domain ↔ DTO (separación strict)
- [ ] Agregar más servicios de aplicación
- [ ] Refactorizar controllers existentes gradualmente

## Ejemplo Completo: Registrar HC

**API Route:**
```javascript
POST /hc
{
  "idStudent": "STU-2025-001"
}
```

**Controlador:**
```javascript
async registerHc(req, res) {
  try {
    const hc = await this.createHcService.execute({ 
      idStudent: req.body.idStudent 
    });
    
    res.status(201).json({
      message: 'Historia clínica registrada',
      data: hc
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
```

**Servicio:**
```javascript
async execute(input) {
  if (!input.idStudent) throw new Error('idStudent required');
  
  const hc = await this.hcRepository.registerHc(input.idStudent);
  
  return {
    id: hc.id_historia,
    studentId: hc.id_estudiante,
    status: hc.estado
  };
}
```

**Repositorio:**
```javascript
async registerHc(idStudent) {
  return HcModel.registerHc(idStudent); // Delega a modelo existente
}
```

**Modelo (SIN CAMBIOS):**
```javascript
static async registerHc(idStudent) {
  const result = await pool.query(
    'SELECT * FROM fn_crear_historia_clinica($1)',
    [idStudent]
  );
  return result.rows[0];
}
```

## Beneficios Inmediatos

✅ Código organizado en capas  
✅ Lógica de negocio independiente  
✅ Fácil de testear (mockear repositorios)  
✅ Controllers sin lógica SQL  
✅ Validaciones centralizadas  
✅ Compatible con código existente  

## Testing Ejemplo

```javascript
// test/CreateHcApplicationService.test.js
import { CreateHcApplicationService } from '../application/services/HcApplicationService';

describe('CreateHcApplicationService', () => {
  it('should throw error if idStudent missing', async () => {
    const mockRepo = { registerHc: jest.fn() };
    const service = new CreateHcApplicationService(mockRepo);
    
    await expect(service.execute({}))
      .rejects.toThrow('idStudent is required');
  });
});
```
