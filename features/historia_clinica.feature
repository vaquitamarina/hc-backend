Feature: Registro de historias clínicas

Scenario: Registrar una historia clínica correctamente
Given que el administrador cuenta con los datos obligatorios del paciente
When registra una nueva historia clínica
Then el sistema genera un identificador único
And la historia clínica queda registrada

Scenario: Registrar una historia clínica con datos incompletos
Given que faltan campos obligatorios del paciente
When intenta registrar la historia clínica
Then el sistema rechaza el registro
And informa que existen datos obligatorios faltantes