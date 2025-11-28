/**
 * @swagger
 * /hc/antecedente-personal/historia/{id_historia}:
 *   get:
 *     tags:
 *       - Anamnesis
 *     summary: Obtiene el antecedente personal por id_historia
 *     parameters:
 *       - in: path
 *         name: id_historia
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador único de la historia clínica
 *     responses:
 *       200:
 *         description: Antecedente personal encontrado
 *       404:
 *         description: No encontrado
 */
/**
 * @swagger
 * /hc/antecedente-personal:
 *   post:
 *     tags:
 *       - Anamnesis
 *     summary: Crea un antecedente personal
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               esta_embarazada:
 *                 type: boolean
 *               mac:
 *                 type: string
 *               otros:
 *                 type: string
 *               psicosocial:
 *                 type: string
 *               vacunas:
 *                 type: string
 *               hepatitis_b:
 *                 type: boolean
 *               id_grupo_sanguineo:
 *                 type: string
 *               fuma:
 *                 type: boolean
 *               cigarrillos_dia:
 *                 type: integer
 *               toma_te:
 *                 type: boolean
 *               tazas_te_dia:
 *                 type: integer
 *               toma_alcohol:
 *                 type: boolean
 *               frecuencia_alcohol:
 *                 type: string
 *               aprieta_dientes:
 *                 type: boolean
 *               momento_aprieta:
 *                 type: string
 *               rechina:
 *                 type: boolean
 *               dolor_muscular:
 *                 type: boolean
 *               chupa_dedo:
 *                 type: boolean
 *               muerde_objetos:
 *                 type: boolean
 *               muerde_labios:
 *                 type: boolean
 *               otros_habitos:
 *                 type: string
 *               frecuencia_cepillado:
 *                 type: integer
 *             example:
 *               id_historia: "{id_historia}"
 *               esta_embarazada: false
 *               mac: "N/A"
 *               otros: "Sin antecedentes"
 *               psicosocial: "Normal"
 *               vacunas: "Completo"
 *               hepatitis_b: false
 *               id_grupo_sanguineo: "{id_grupo_sanguineo}"
 *               fuma: false
 *               cigarrillos_dia: 0
 *               toma_te: true
 *               tazas_te_dia: 2
 *               toma_alcohol: false
 *               frecuencia_alcohol: ""
 *               aprieta_dientes: false
 *               momento_aprieta: ""
 *               rechina: false
 *               dolor_muscular: false
 *               chupa_dedo: false
 *               muerde_objetos: false
 *               muerde_labios: false
 *               otros_habitos: ""
 *               frecuencia_cepillado: 2
 *     responses:
 *       201:
 *         description: Antecedente personal creado
 */
/**
 * @swagger
 * /hc/antecedente-personal/historia/{id_historia}:
 *   put:
 *     tags:
 *       - Anamnesis
 *     summary: Actualiza el antecedente personal por id_historia
 *     parameters:
 *       - in: path
 *         name: id_historia
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador único de la historia clínica
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               esta_embarazada:
 *                 type: boolean
 *               mac:
 *                 type: string
 *               otros:
 *                 type: string
 *               psicosocial:
 *                 type: string
 *               vacunas:
 *                 type: string
 *               hepatitis_b:
 *                 type: boolean
 *               id_grupo_sanguineo:
 *                 type: string
 *               fuma:
 *                 type: boolean
 *               cigarrillos_dia:
 *                 type: integer
 *               toma_te:
 *                 type: boolean
 *               tazas_te_dia:
 *                 type: integer
 *               toma_alcohol:
 *                 type: boolean
 *               frecuencia_alcohol:
 *                 type: string
 *               aprieta_dientes:
 *                 type: boolean
 *               momento_aprieta:
 *                 type: string
 *               rechina:
 *                 type: boolean
 *               dolor_muscular:
 *                 type: boolean
 *               chupa_dedo:
 *                 type: boolean
 *               muerde_objetos:
 *                 type: boolean
 *               muerde_labios:
 *                 type: boolean
 *               otros_habitos:
 *                 type: string
 *               frecuencia_cepillado:
 *                 type: integer
 *             example:
 *               id_antecedente: "{id_antecedente}"
 *               esta_embarazada: false
 *               mac: "N/A"
 *               otros: "Sin antecedentes"
 *               psicosocial: "Normal"
 *               vacunas: "Completo"
 *               hepatitis_b: false
 *               id_grupo_sanguineo: "{id_grupo_sanguineo}"
 *               fuma: false
 *               cigarrillos_dia: 0
 *               toma_te: true
 *               tazas_te_dia: 2
 *               toma_alcohol: false
 *               frecuencia_alcohol: ""
 *               aprieta_dientes: false
 *               momento_aprieta: ""
 *               rechina: false
 *               dolor_muscular: false
 *               chupa_dedo: false
 *               muerde_objetos: false
 *               muerde_labios: false
 *               otros_habitos: ""
 *               frecuencia_cepillado: 2
 *     responses:
 *       200:
 *         description: Antecedente personal actualizado
 *       404:
 *         description: No encontrado
 */
/**
 * @swagger
 * /hc/motivo-consulta/historia/{id_historia}:
 *   get:
 *     tags:
 *       - Anamnesis
 *     summary: Obtiene el motivo de consulta por id_historia
 *     parameters:
 *       - in: path
 *         name: id_historia
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador único de la historia clínica
 *     responses:
 *       200:
 *         description: Motivo de consulta encontrado
 *       404:
 *         description: No encontrado
 */
/**
 * @swagger
 * /hc/motivo-consulta:
 *   post:
 *     tags:
 *       - Anamnesis
 *     summary: Crea un motivo de consulta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               motivo:
 *                 type: string
 *             example:
 *               id_historia: "{id_historia}"
 *               motivo: "Dolor de muelas"
 *     responses:
 *       201:
 *         description: Motivo de consulta creado
 */
/**
 * @swagger
 * /hc/motivo-consulta/historia/{id_historia}:
 *   put:
 *     tags:
 *       - Anamnesis
 *     summary: Actualiza el motivo de consulta por id_historia
 *     parameters:
 *       - in: path
 *         name: id_historia
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador único de la historia clínica
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               motivo:
 *                 type: string
 *             example:
 *               id_motivo: "{id_motivo}"
 *               motivo: "Dolor de muelas"
 *     responses:
 *       200:
 *         description: Motivo de consulta actualizado
 *       404:
 *         description: No encontrado
 */
/**
 * @swagger
 * /hc/enfermedad-actual/historia/{id_historia}:
 *   get:
 *     tags:
 *       - Anamnesis
 *     summary: Obtiene la enfermedad actual por id_historia
 *     parameters:
 *       - in: path
 *         name: id_historia
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador único de la historia clínica
 *     responses:
 *       200:
 *         description: Enfermedad actual encontrada
 *       404:
 *         description: No encontrado
 */
/**
 * @swagger
 * /hc/enfermedad-actual:
 *   post:
 *     tags:
 *       - Anamnesis
 *     summary: Crea una enfermedad actual
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sintoma_principal:
 *                 type: string
 *               tiempo_enfermedad:
 *                 type: string
 *               forma_inicio:
 *                 type: string
 *               curso:
 *                 type: string
 *               relato:
 *                 type: string
 *               tratamiento_prev:
 *                 type: string
 *             example:
 *               id_historia: "{id_historia}"
 *               sintoma_principal: "Dolor intenso"
 *               tiempo_enfermedad: "2 semanas"
 *               forma_inicio: "Repentino"
 *               curso: "Progresivo"
 *               relato: "El paciente refiere dolor desde hace dos semanas."
 *               tratamiento_prev: "Ibuprofeno"
 *     responses:
 *       201:
 *         description: Enfermedad actual creada
 */
/**
 * @swagger
 * /hc/enfermedad-actual/historia/{id_historia}:
 *   put:
 *     tags:
 *       - Anamnesis
 *     summary: Actualiza la enfermedad actual por id_historia
 *     parameters:
 *       - in: path
 *         name: id_historia
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador único de la historia clínica
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sintoma_principal:
 *                 type: string
 *               tiempo_enfermedad:
 *                 type: string
 *               forma_inicio:
 *                 type: string
 *               curso:
 *                 type: string
 *               relato:
 *                 type: string
 *               tratamiento_prev:
 *                 type: string
 *             example:
 *               id_enfermedad_actual: "{id_enfermedad_actual}"
 *               sintoma_principal: "Dolor intenso"
 *               tiempo_enfermedad: "2 semanas"
 *               forma_inicio: "Repentino"
 *               curso: "Progresivo"
 *               relato: "El paciente refiere dolor desde hace dos semanas."
 *               tratamiento_prev: "Ibuprofeno"
 *     responses:
 *       200:
 *         description: Enfermedad actual actualizada
 *       404:
 *         description: No encontrado
 */
