import assert from 'assert';
import { Given, When, Then, Before } from '@cucumber/cucumber';
import FiliacionTestingAPI from '../support/FiliacionTestingAPI.js';
import { DomainError } from '../../filiacion/domain/filiacionDomain.js';

class InMemoryFiliacionRepository {
  constructor() {
    this.store = new Map();
  }

  async create(agregado) {
    this.store.set(agregado.idHistoria, {
      id_historia: agregado.idHistoria,
      params: agregado.obtenerParametros(),
    });
    return { success: true, id_historia: agregado.idHistoria };
  }

  async getByHistoria(id_historia) {
    const r = this.store.get(id_historia);
    return r ?? null;
  }

  async update(agregado) {
    if (!this.store.has(agregado.idHistoria)) {
      return { success: false };
    }
    this.store.set(agregado.idHistoria, {
      id_historia: agregado.idHistoria,
      params: agregado.obtenerParametros(),
    });
    return { success: true };
  }

  clear() {
    this.store.clear();
  }
}

let repository;
let api;
let lastResult;
let lastError;

Before(() => {
  repository = new InMemoryFiliacionRepository();
  api = new FiliacionTestingAPI(repository);
  lastResult = null;
  lastError = null;
});

function tableToObject(table) {
  if (!table) {
    return {};
  }
  const raw = table.raw();
  if (!raw || raw.length < 2) {
    return {};
  }
  const headers = raw[0].map((h) => String(h).trim());
  const values = raw[1];
  const obj = {};
  for (let i = 0; i < headers.length; i++) {
    obj[headers[i]] = values[i] === undefined ? '' : String(values[i]).trim();
  }
  return obj;
}

Given('los datos de filiación:', async function (dataTable) {
  const raw = tableToObject(dataTable);
  if (raw.edad !== undefined) {
    raw.edad = raw.edad === '' ? null : Number(raw.edad);
  }
  this.testInput = raw;
});

Given(
  'existe una filiación registrada con id_historia {string} con los datos:',
  async function (id_historia, dataTable) {
    const raw = tableToObject(dataTable);
    if (raw.edad !== undefined) {
      raw.edad = raw.edad === '' ? null : Number(raw.edad);
    }
    raw.id_historia = id_historia;
    try {
      await api.registerFiliacion(raw);
    } catch (err) {
      throw err;
    }
  }
);

When('intento registrar la filiación', async function () {
  lastError = null;
  lastResult = null;
  try {
    lastResult = await api.registerFiliacion(this.testInput);
  } catch (err) {
    lastError = err;
  }
});

When('intento actualizar la filiación con:', async function (dataTable) {
  lastError = null;
  lastResult = null;
  const raw = tableToObject(dataTable);
  if (raw.edad !== undefined) {
    raw.edad = raw.edad === '' ? null : Number(raw.edad);
  }
  try {
    lastResult = await api.updateFiliacion(raw);
  } catch (err) {
    lastError = err;
  }
});

Then(
  'la operación debe ser exitosa con el mensaje {string}',
  function (expectedMessage) {
    assert.ok(lastResult, 'No hubo resultado en la operación');
    assert.strictEqual(lastResult.message, expectedMessage);
  }
);

Then(
  'debe existir una filiación para la historia clinica {string}',
  async function (id_historia) {
    const found = await repository.getByHistoria(id_historia);
    assert.ok(found, `No se encontró filiación para ${id_historia}`);
  }
);

Then(
  'la edad clinica para la historia clinica {string} debe ser {string}',
  async function (id_historia, expectedEdad) {
    const found = await repository.getByHistoria(id_historia);
    assert.ok(found, `No se encontró filiación para ${id_historia}`);
    const params = found.params;
    const edad = params[17];
    assert.strictEqual(String(edad), expectedEdad);
  }
);

Then(
  'se debe lanzar un error de dominio con el mensaje {string}',
  function (expectedMessage) {
    assert.ok(lastError, 'Se esperaba un error pero no se lanzó ninguno');
    assert.strictEqual(lastError.message, expectedMessage);
  }
);

Then(
  'no debe existir una filiación para la historia clinica {string}',
  async function (id_historia) {
    const found = await repository.getByHistoria(id_historia);
    assert.strictEqual(found, null);
  }
);
