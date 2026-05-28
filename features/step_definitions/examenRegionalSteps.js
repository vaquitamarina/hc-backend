import assert from 'assert';
import { Given, When, Then, Before } from '@cucumber/cucumber';
import ExamenRegionalTestingAPI from '../support/ExamenRegionalTestingAPI.js';
import { DomainError } from '../../examenRegional/domain/examenRegionalDomain.js';

class InMemoryExamenRegionalRepository {
  constructor() {
    this.store = new Map();
  }

  async create(agregado) {
    const payload = {
      id_historia: agregado.idHistoria,
      params: agregado.obtenerParametros(),
    };
    this.store.set(agregado.idHistoria, payload);
    return payload;
  }

  async getByHistoria(id_historia) {
    const r = this.store.get(id_historia);
    return r ?? null;
  }

  async update(agregado) {
    if (!this.store.has(agregado.idHistoria)) {
      return { success: false };
    }
    const payload = {
      id_historia: agregado.idHistoria,
      params: agregado.obtenerParametros(),
    };
    this.store.set(agregado.idHistoria, payload);
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
  repository = new InMemoryExamenRegionalRepository();
  api = new ExamenRegionalTestingAPI(repository);
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

Given('los datos del examen regional:', function (dataTable) {
  const raw = tableToObject(dataTable);
  // Normalizar tipos numéricos
  if (raw.ojos_agudeza_visual !== undefined) {
    raw.ojos_agudeza_visual =
      raw.ojos_agudeza_visual === '' ? null : Number(raw.ojos_agudeza_visual);
  }
  if (raw.atm_apertura_maxima_mm !== undefined) {
    raw.atm_apertura_maxima_mm =
      raw.atm_apertura_maxima_mm === ''
        ? null
        : Number(raw.atm_apertura_maxima_mm);
  }
  if (raw.atm_musculos_dolor_grado !== undefined) {
    raw.atm_musculos_dolor_grado =
      raw.atm_musculos_dolor_grado === ''
        ? null
        : Number(raw.atm_musculos_dolor_grado);
  }
  this.testInput = { id_historia: raw.id_historia, body: raw };
});

Given(
  'existe un examen regional registrado con id_historia {string} con los datos:',
  async function (id_historia, dataTable) {
    const raw = tableToObject(dataTable);
    if (raw.ojos_agudeza_visual !== undefined) {
      raw.ojos_agudeza_visual =
        raw.ojos_agudeza_visual === '' ? null : Number(raw.ojos_agudeza_visual);
    }
    if (raw.atm_apertura_maxima_mm !== undefined) {
      raw.atm_apertura_maxima_mm =
        raw.atm_apertura_maxima_mm === ''
          ? null
          : Number(raw.atm_apertura_maxima_mm);
    }
    if (raw.atm_musculos_dolor_grado !== undefined) {
      raw.atm_musculos_dolor_grado =
        raw.atm_musculos_dolor_grado === ''
          ? null
          : Number(raw.atm_musculos_dolor_grado);
    }
    raw.id_historia = id_historia;
    const payload = { id_historia: id_historia, body: raw };
    try {
      await api.registerExamen(payload);
    } catch (err) {
      throw err;
    }
  }
);

When('intento registrar el examen regional', async function () {
  lastError = null;
  lastResult = null;
  try {
    lastResult = await api.registerExamen(this.testInput);
  } catch (err) {
    lastError = err;
  }
});

When('intento actualizar el examen regional con:', async function (dataTable) {
  lastError = null;
  lastResult = null;
  const raw = tableToObject(dataTable);
  if (raw.ojos_agudeza_visual !== undefined) {
    raw.ojos_agudeza_visual =
      raw.ojos_agudeza_visual === '' ? null : Number(raw.ojos_agudeza_visual);
  }
  if (raw.atm_apertura_maxima_mm !== undefined) {
    raw.atm_apertura_maxima_mm =
      raw.atm_apertura_maxima_mm === ''
        ? null
        : Number(raw.atm_apertura_maxima_mm);
  }
  if (raw.atm_musculos_dolor_grado !== undefined) {
    raw.atm_musculos_dolor_grado =
      raw.atm_musculos_dolor_grado === ''
        ? null
        : Number(raw.atm_musculos_dolor_grado);
  }
  const payload = { id_historia: raw.id_historia, body: raw };
  try {
    lastResult = await api.updateExamen(payload);
  } catch (err) {
    lastError = err;
  }
});

Then(
  'la operación del examen regional debe ser exitosa con el mensaje {string}',
  function (expectedMessage) {
    assert.ok(lastResult, 'No hubo resultado en la operación');
    assert.strictEqual(lastResult.message, expectedMessage);
  }
);

Then(
  'debe existir un examen regional para la historia clinica {string}',
  async function (id_historia) {
    const found = await repository.getByHistoria(id_historia);
    assert.ok(found, `No se encontró examen regional para ${id_historia}`);
  }
);

Then(
  'la operación de actualización del examen regional debe ser exitosa con el mensaje {string}',
  function (expectedMessage) {
    assert.ok(lastResult, 'No hubo resultado en la operación');
    assert.strictEqual(lastResult.message, expectedMessage);
  }
);

Then(
  'la apertura maxima para la historia clinica {string} debe ser {string}',
  async function (id_historia, expected) {
    const found = await repository.getByHistoria(id_historia);
    assert.ok(found, `No se encontró examen regional para ${id_historia}`);
    const params = found.params;
    const apertura = params[39];
    assert.strictEqual(String(apertura), expected);
  }
);

Then(
  'se debe lanzar un error de dominio al registrar examen regional con el mensaje {string}',
  function (expectedMessage) {
    assert.ok(lastError, 'Se esperaba un error pero no se lanzó ninguno');
    assert.strictEqual(lastError.message, expectedMessage);
  }
);

Then(
  'no debe existir un examen regional para la historia clinica {string}',
  async function (id_historia) {
    const found = await repository.getByHistoria(id_historia);
    assert.strictEqual(found, null);
  }
);

Then(
  'los campos numéricos normalizados deben ser nulos para la historia clinica {string}',
  async function (id_historia) {
    const found = await repository.getByHistoria(id_historia);
    assert.ok(found, `No se encontró examen regional para ${id_historia}`);
    const params = found.params;
    // índices según obtenerParametros(): ojosAgudezaVisual=11, atmAperturaMaximaMm=39, atmMusculosDolorGrado=42
    assert.strictEqual(params[11], null);
    assert.strictEqual(params[39], null);
    assert.strictEqual(params[42], null);
  }
);
