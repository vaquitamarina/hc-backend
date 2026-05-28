### Módulo: Auth (Vertical Slice)

**Dominio (Core Pura):** Qué validan los Value Objects y qué protege el Agregado.

- `UserCodeValueObject`: valida que `userCode` sea una cadena no vacía.
- `PasswordValueObject`: valida que `password` no sea vacío (se protege la entrada, no el hash).
- `AuthAggregate`: compone `userCode` y `password`, protege invariantes y expone `obtenerParametros()` (posicional, usado por el repositorio).
- Errores de validación lanzan `DomainError`.
- CERO SQL en esta capa.

**Aplicación (Adaptador Primario):** Cómo el controlador recibe la petición HTTP y usa el dominio.

- `AuthController` construye el `AuthAggregate` desde `req`, captura `DomainError` y devuelve 400 en fallos de validación. Usa el agregado para solicitar al repositorio la fila de usuario, verifica el hash con `argon2`, genera `access` y `refresh` tokens con `TokenService` y devuelve la información del usuario estableciendo cookies a través de `CookieService`.

**Infraestructura (Adaptador Secundario):** Cómo el Repositorio aísla las consultas SQL de PostgreSQL.

- `AuthRepository` importa `pool` desde `../../db/db.js` y ejecuta la función SQL `fn_obtener_usuario_login($1)` usando los parámetros posicionales devueltos por `AuthAggregate.obtenerParametros()`. Devuelve la fila cruda del usuario (o `null`) para que la capa de aplicación verifique el hash y aplique políticas de autenticación.
