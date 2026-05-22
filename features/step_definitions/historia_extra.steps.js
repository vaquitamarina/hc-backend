import assert from 'assert';
import { Given, When, Then } from '@cucumber/cucumber';

// --- Steps para borrador (HU02) ---
Given(
  'el usuario autenticado solicita obtener o crear un borrador',
  function () {
    // simulamos que el usuario autenticado tiene id 'student-1'
    this.userId = 'student-1';
  }
);

When('el sistema busca un borrador existente o crea uno nuevo', function () {
  // Simulamos la lógica: si no hay borrador, creamos uno
  if (!this.__borradores) {
    this.__borradores = {};
  }

  if (this.__borradores[this.userId]) {
    this.borrador = { id_historia: this.__borradores[this.userId] };
  } else {
    const nuevoId = `HC-${Math.floor(Math.random() * 900) + 100}`;
    this.__borradores[this.userId] = nuevoId;
    this.borrador = { id_historia: nuevoId };
  }
});

Then(
  'el sistema devuelve un identificador de historia en borrador',
  function () {
    assert.ok(this.borrador && this.borrador.id_historia);
  }
);

Given('ya existe un borrador para el estudiante', function () {
  if (!this.__borradores) {
    this.__borradores = {};
  }
  this.userId = 'student-1';
  this.__borradores[this.userId] = 'HC-999';
});

// --- Steps para asignar paciente (HU04) ---
Given('existe una historia en estado borrador con id {string}', function (id) {
  if (!this.__historias) {
    this.__historias = {};
  }
  this.__historias[id] = {
    id_historia: id,
    estado: 'borrador',
    id_paciente: null,
  };
  this.historiaId = id;
});

Given('existe un paciente con id {string}', function (idPaciente) {
  if (!this.__pacientes) {
    this.__pacientes = {};
  }
  this.__pacientes[idPaciente] = { id: idPaciente };
  this.pacienteId = idPaciente;
});

When('se asigna el paciente a la historia', function () {
  const h = this.__historias[this.historiaId];
  if (!h) {
    this.assignResult = { error: 'Historia no encontrada' };
    return;
  }
  if (!this.__pacientes || !this.__pacientes[this.pacienteId]) {
    this.assignResult = { error: 'Paciente no encontrado' };
    return;
  }
  h.id_paciente = this.pacienteId;
  h.estado = 'en_proceso';
  this.assignResult = {
    success: true,
    message: 'Paciente asignado a la historia clinica',
  };
});

Then('el sistema confirma que el paciente fue asignado', function () {
  assert.ok(this.assignResult && this.assignResult.success);
});

Then(
  'el sistema devuelve un error indicando paciente no encontrado',
  function () {
    assert.ok(
      this.assignResult &&
        this.assignResult.error &&
        this.assignResult.error.includes('Paciente')
    );
  }
);
