Feature: Gestión de Examen Físico Regional
  Como profesional de salud
  Quiero registrar y actualizar el examen físico regional de una historia clínica
  Para conservar los hallazgos estructurados y validados por las reglas de dominio

  Scenario: Registro feliz de examen regional con datos válidos
    Given los datos del examen regional:
      | id_historia                          | ojos_agudeza_visual | atm_apertura_maxima_mm |
      | 123e4567-e89b-42d3-a456-426614174100 | 8                   | 45                     |
    When intento registrar el examen regional
    Then la operación del examen regional debe ser exitosa con el mensaje "Examen registrado con exito"
    And debe existir un examen regional para la historia clinica "123e4567-e89b-42d3-a456-426614174100"

  Scenario: Actualización feliz de examen regional existente
    Given existe un examen regional registrado con id_historia "123e4567-e89b-42d3-a456-426614174101" con los datos:
      | id_historia                          | ojos_agudeza_visual | atm_apertura_maxima_mm |
      | 123e4567-e89b-42d3-a456-426614174101 | 7                   | 40                     |
    When intento actualizar el examen regional con:
      | id_historia                          | ojos_agudeza_visual | atm_apertura_maxima_mm |
      | 123e4567-e89b-42d3-a456-426614174101 | 9                   | 42                     |
    Then la operación de actualización del examen regional debe ser exitosa con el mensaje "Examen actualizado correctamente"
    And la apertura maxima para la historia clinica "123e4567-e89b-42d3-a456-426614174101" debe ser "42"

  Scenario: Error por UUID inválido de historia clínica
    Given los datos del examen regional:
      | id_historia  | ojos_agudeza_visual | atm_apertura_maxima_mm |
      | invalid-uuid | 6                   | 38                     |
    When intento registrar el examen regional
    Then se debe lanzar un error de dominio al registrar examen regional con el mensaje "id_historia invalido: formato UUIDv4 esperado"
    And no debe existir un examen regional para la historia clinica "invalid-uuid"

  Scenario: Normalización de valores numéricos fuera de rango
    Given los datos del examen regional:
      | id_historia                          | ojos_agudeza_visual | atm_apertura_maxima_mm | atm_musculos_dolor_grado |
      | 123e4567-e89b-42d3-a456-426614174102 | 20                  | -5                     | 99                       |
    When intento registrar el examen regional
    Then la operación del examen regional debe ser exitosa con el mensaje "Examen registrado con exito"
    And los campos numéricos normalizados deben ser nulos para la historia clinica "123e4567-e89b-42d3-a456-426614174102"
