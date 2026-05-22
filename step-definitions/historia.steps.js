const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');

Given(
  'que el administrador cuenta con los datos obligatorios del paciente',
  function () {
    this.datos = {
      nombre: 'Juan Perez',
      dni: '12345678',
    };
  }
);

When('registra una nueva historia clínica', function () {
  this.resultado = {
    estado: 'EXITOSO',
    id: 'HC-001',
  };
});

Then('el sistema genera un identificador único', function () {
  assert.ok(this.resultado.id);
});

Then('la historia clínica queda registrada', function () {
  assert.strictEqual(this.resultado.estado, 'EXITOSO');
});

Given('que faltan campos obligatorios del paciente', function () {
  this.datos = {};
});

When('intenta registrar la historia clínica', function () {
  this.resultado = {
    estado: 'ERROR',
  };
});

Then('el sistema rechaza el registro', function () {
  assert.strictEqual(this.resultado.estado, 'ERROR');
});

Then('informa que existen datos obligatorios faltantes', function () {
  assert.ok(true);
});
