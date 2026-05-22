Feature: HU04 - Asignar paciente a Historia Clínica

  Scenario: Asignar paciente a historia en borrador (camino feliz)
    Given existe una historia en estado borrador con id "HC-123"
    And existe un paciente con id "P-001"
    When se asigna el paciente a la historia
    Then el sistema confirma que el paciente fue asignado

  Scenario: Intentar asignar paciente inexistente (error)
    Given existe una historia en estado borrador con id "HC-124"
    When se asigna el paciente a la historia
    Then el sistema devuelve un error indicando paciente no encontrado
