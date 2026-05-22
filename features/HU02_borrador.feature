Feature: HU02 - Obtener o crear borrador de Historia Clínica

  Scenario: Obtener un borrador nuevo si no existe (camino feliz)
    Given el usuario autenticado solicita obtener o crear un borrador
    When el sistema busca un borrador existente o crea uno nuevo
    Then el sistema devuelve un identificador de historia en borrador

  Scenario: Devolver borrador existente en lugar de crear otro (camino feliz)
    Given ya existe un borrador para el estudiante
    When el sistema busca un borrador existente o crea uno nuevo
    Then el sistema devuelve un identificador de historia en borrador
