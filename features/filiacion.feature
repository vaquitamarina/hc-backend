Feature: Gestión de Filiación
  Como personal de salud
  Quiero registrar y actualizar la filiación de una historia clínica
  Para mantener la información personal del paciente consistente y validada

  Scenario: Registro feliz de filiación con datos válidos
    Given los datos de filiación:
      | id_historia                          | edad | sexo | fecha_nacimiento         |
      | 123e4567-e89b-42d3-a456-426614174000 | 45   | M    | 1980-01-01T00:00:00Z     |
    When intento registrar la filiación
    Then la operación debe ser exitosa con el mensaje "Filiacion registrada con exito"
    And debe existir una filiación para la historia clinica "123e4567-e89b-42d3-a456-426614174000"

  Scenario: Actualización feliz de filiación existente
    Given existe una filiación registrada con id_historia "123e4567-e89b-42d3-a456-426614174001" con los datos:
      | id_historia                          | edad | sexo | fecha_nacimiento         |
      | 123e4567-e89b-42d3-a456-426614174001 | 30   | F    | 1995-05-05T00:00:00Z     |
    When intento actualizar la filiación con:
      | id_historia                          | edad | sexo | fecha_nacimiento         |
      | 123e4567-e89b-42d3-a456-426614174001 | 31   | F    | 1995-05-05T00:00:00Z     |
    Then la operación debe ser exitosa con el mensaje "Filiacion actualizada correctamente"
    And la edad clinica para la historia clinica "123e4567-e89b-42d3-a456-426614174001" debe ser "31"

  Scenario: Error por edad fuera de rango (Prueba de invariante)
    Given los datos de filiación:
      | id_historia                          | edad | sexo | fecha_nacimiento         |
      | 123e4567-e89b-42d3-a456-426614174002 | 200  | M    | 1980-01-01T00:00:00Z     |
    When intento registrar la filiación
    Then se debe lanzar un error de dominio con el mensaje "La edad clinica debe ser un entero entre 0 y 130"
    And no debe existir una filiación para la historia clinica "123e4567-e89b-42d3-a456-426614174002"

  Scenario: Error por UUID inválido de historia clínica
    Given los datos de filiación:
      | id_historia   | edad | sexo | fecha_nacimiento          |
      | invalid-uuid  | 25   | M    | 2000-01-01T00:00:00Z      |
    When intento registrar la filiación
    Then se debe lanzar un error de dominio con el mensaje "La historia clinica debe ser un UUID v4 valido"
    And no debe existir una filiación para la historia clinica "invalid-uuid"

  Scenario: Error por sexo clínico inválido
    Given los datos de filiación:
      | id_historia                          | edad | sexo | fecha_nacimiento         |
      | 123e4567-e89b-42d3-a456-426614174003 | 40   | X    | 1986-07-07T00:00:00Z     |
    When intento registrar la filiación
    Then se debe lanzar un error de dominio con el mensaje "El sexo clinico no tiene un valor permitido"
    And no debe existir una filiación para la historia clinica "123e4567-e89b-42d3-a456-426614174003"
