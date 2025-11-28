/**
 * @swagger
 * /api/hc/antecedente-personal/historia/{id_historia}:
 *   get:
 *     tags:
 *       - Historia Clínica
 *     summary: Obtiene el antecedente personal por historia
 *     parameters:
 *       - in: path
 *         name: id_historia
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID de la historia clínica
 *     responses:
 *       200:
 *         description: Datos del antecedente personal
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_historia:
 *                   type: string
 *                   example: "e1a2b3c4-d5f6-7890-abcd-1234567890ab"
 *                 esta_embarazada:
 *                   type: boolean
 *                   example: false
 *                 mac:
 *                   type: string
 *                   example: "N/A"
 *                 otros:
 *                   type: string
 *                   example: "Sin antecedentes"
 *                 psicosocial:
 *                   type: string
 *                   example: "Normal"
 *                 vacunas:
 *                   type: string
 *                   example: "Completo"
 *                 hepatitis_b:
 *                   type: boolean
 *                   example: false
 *                 id_grupo_sanguineo:
 *                   type: string
 *                   description: UUID que referencia el grupo sanguíneo
 *                   example: "a1b2c3d4-e5f6-7890-abcd-1234567890ab"
 *                 fuma:
 *                   type: boolean
 *                   example: false
 *                 cigarrillos_dia:
 *                   type: integer
 *                   example: 0
 *                 toma_te:
 *                   type: boolean
 *                   example: true
 *                 tazas_te_dia:
 *                   type: integer
 *                   example: 2
 *                 toma_alcohol:
 *                   type: boolean
 *                   example: false
 *                 frecuencia_alcohol:
 *                   type: string
 *                   example: ""
 *                 aprieta_dientes:
 *                   type: boolean
 *                   example: false
 *                 momento_aprieta:
 *                   type: string
 *                   example: ""
 *                 rechina:
 *                   type: boolean
 *                   example: false
 *                 dolor_muscular:
 *                   type: boolean
 *                   example: false
 *                 chupa_dedo:
 *                   type: boolean
 *                   example: false
 *                 muerde_objetos:
 *                   type: boolean
 *                   example: false
 *                 muerde_labios:
 *                   type: boolean
 *                   example: false
 *                 otros_habitos:
 *                   type: string
 *                   example: ""
 *                 frecuencia_cepillado:
 *                   type: integer
 *                   example: 2
 *       404:
 *         description: No encontrado
 */
/**
 * @swagger
 * /api/hc/antecedente-personal/historia/{id_historia}:
 *   put:
 *     tags:
 *       - Historia Clínica
 *     summary: Actualiza el antecedente personal por historia
 *     parameters:
 *       - in: path
 *         name: id_historia
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               esta_embarazada:
 *                 type: boolean
 *                 example: false
 *               mac:
 *                 type: string
 *                 example: "N/A"
 *               otros:
 *                 type: string
 *                 example: "Sin antecedentes"
 *               psicosocial:
 *                 type: string
 *                 example: "Normal"
 *               vacunas:
 *                 type: string
 *                 example: "Completo"
 *               hepatitis_b:
 *                 type: boolean
 *                 example: false
 *               id_grupo_sanguineo:
 *                 type: string
 *                 description: UUID que referencia el grupo sanguíneo
 *                 example: "a1b2c3d4-e5f6-7890-abcd-1234567890ab"
 *               fuma:
 *                 type: boolean
 *                 example: false
 *               cigarrillos_dia:
 *                 type: integer
 *                 example: 0
 *               toma_te:
 *                 type: boolean
 *                 example: true
 *               tazas_te_dia:
 *                 type: integer
 *                 example: 2
 *               toma_alcohol:
 *                 type: boolean
 *                 example: false
 *               frecuencia_alcohol:
 *                 type: string
 *                 example: ""
 *               aprieta_dientes:
 *                 type: boolean
 *                 example: false
 *               momento_aprieta:
 *                 type: string
 *                 example: ""
 *               rechina:
 *                 type: boolean
 *                 example: false
 *               dolor_muscular:
 *                 type: boolean
 *                 example: false
 *               chupa_dedo:
 *                 type: boolean
 *                 example: false
 *               muerde_objetos:
 *                 type: boolean
 *                 example: false
 *               muerde_labios:
 *                 type: boolean
 *                 example: false
 *               otros_habitos:
 *                 type: string
 *                 example: ""
 *               frecuencia_cepillado:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Antecedente personal actualizado
 *       404:
 *         description: No encontrado
 */
/**
 * @swagger
 * /api/hc/antecedente-personal:
 *   post:
 *     tags:
 *       - Historia Clínica
 *     summary: Crea un antecedente personal
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_historia:
 *                 type: string
 *                 example: "e1a2b3c4-d5f6-7890-abcd-1234567890ab"
 *               esta_embarazada:
 *                 type: boolean
 *                 example: false
 *               mac:
 *                 type: string
 *                 example: "N/A"
 *               otros:
 *                 type: string
 *                 example: "Sin antecedentes"
 *               psicosocial:
 *                 type: string
 *                 example: "Normal"
 *               vacunas:
 *                 type: string
 *                 example: "Completo"
 *               hepatitis_b:
 *                 type: boolean
 *                 example: false
 *               id_grupo_sanguineo:
 *                 type: string
 *                 description: UUID que referencia el grupo sanguíneo
 *                 example: "a1b2c3d4-e5f6-7890-abcd-1234567890ab"
 *               fuma:
 *                 type: boolean
 *                 example: false
 *               cigarrillos_dia:
 *                 type: integer
 *                 example: 0
 *               toma_te:
 *                 type: boolean
 *                 example: true
 *               tazas_te_dia:
 *                 type: integer
 *                 example: 2
 *               toma_alcohol:
 *                 type: boolean
 *                 example: false
 *               frecuencia_alcohol:
 *                 type: string
 *                 example: ""
 *               aprieta_dientes:
 *                 type: boolean
 *                 example: false
 *               momento_aprieta:
 *                 type: string
 *                 example: ""
 *               rechina:
 *                 type: boolean
 *                 example: false
 *               dolor_muscular:
 *                 type: boolean
 *                 example: false
 *               chupa_dedo:
 *                 type: boolean
 *                 example: false
 *               muerde_objetos:
 *                 type: boolean
 *                 example: false
 *               muerde_labios:
 *                 type: boolean
 *                 example: false
 *               otros_habitos:
 *                 type: string
 *                 example: ""
 *               frecuencia_cepillado:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Antecedente personal creado
 */
/**
 * @swagger
 * /api/users/register:
 *   post:
 *     tags:
 *       - Autenticación
 *     summary: Registra un nuevo usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userCode:
 *                 type: string
 *                 example: "2023-119018"
 *               password:
 *                 type: string
 *                 example: "vaqMar12@"
 *               firstName:
 *                 type: string
 *                 example: "Vaquita"
 *               lastName:
 *                 type: string
 *                 example: "Marina"
 *               email:
 *                 type: string
 *                 example: "caflores@unjbg.edu.pe"
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *       400:
 *         description: Datos inválidos o usuario ya existe
 */

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     tags:
 *       - Autenticación
 *     summary: Obtiene los datos del usuario autenticado
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Datos del usuario actual
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 userCode:
 *                   type: string
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 email:
 *                   type: string
 *                 role:
 *                   type: string
 *       401:
 *         description: No autenticado
 */

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     tags:
 *       - Usuarios
 *     summary: Obtiene los datos de un usuario por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Datos del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 userCode:
 *                   type: string
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 email:
 *                   type: string
 *                 role:
 *                   type: string
 *       404:
 *         description: Usuario no encontrado
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags:
 *       - Usuarios
 *     summary: Obtiene la lista de todos los usuarios
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   userCode:
 *                     type: string
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   email:
 *                     type: string
 *                   role:
 *                     type: string
 */
/**
 * @swagger
 * /api/users/login:
 *   post:
 *     tags:
 *       - Autenticación
 *     summary: Inicia sesión y obtiene los datos del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userCode:
 *                 type: string
 *                 example: "2023-119018"
 *               password:
 *                 type: string
 *                 example: "vaqMar12@"
 *     responses:
 *       200:
 *         description: Login exitoso, retorna los datos del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "de4cd964-3e8b-4552-b90a-1bd30cca2f21"
 *                 userCode:
 *                   type: string
 *                   example: "2023-119018"
 *                 firstName:
 *                   type: string
 *                   example: "Vaquita"
 *                 lastName:
 *                   type: string
 *                   example: "Marina"
 *                 email:
 *                   type: string
 *                   example: "caflores@unjbg.edu.pe"
 *                 role:
 *                   type: string
 *                   example: "estudiante"
 *       401:
 *         description: Credenciales inválidas
 */
