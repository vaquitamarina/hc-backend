import { describe, test, expect } from 'vitest';
import {
  DomainError,
  IdHistoriaClinicaVO,
  EdadClinicaVO,
  FechaClinicaVO,
  FiliacionAggregate,
} from '../../filiacion/domain/filiacionDomain.js';

describe('Filiacion Domain - Value Objects', () => {
  describe('IdHistoriaClinicaVO', () => {
    test('acepta UUID v4 válido y normaliza a minúsculas', () => {
      const raw = ' 123E4567-E89B-42D3-A456-426614174000 ';
      const vo = new IdHistoriaClinicaVO(raw);
      expect(vo.value).toBe('123e4567-e89b-42d3-a456-426614174000');
      expect(Object.isFrozen(vo)).toBe(true);
    });

    test('lanza DomainError para valores no string', () => {
      expect(() => new IdHistoriaClinicaVO(123)).toThrow(
        'La historia clinica debe ser un UUID v4 valido'
      );
    });

    test('lanza DomainError para formato UUID inválido', () => {
      expect(() => new IdHistoriaClinicaVO('invalid-uuid')).toThrow(
        'La historia clinica debe ser un UUID v4 valido'
      );
    });
  });

  describe('EdadClinicaVO', () => {
    test('permite null/undefined/empty y deja value en null', () => {
      expect(new EdadClinicaVO(null).value).toBeNull();
      expect(new EdadClinicaVO(undefined).value).toBeNull();
      expect(new EdadClinicaVO('').value).toBeNull();
    });

    test('acepta enteros dentro de rango y los normaliza', () => {
      const vo = new EdadClinicaVO('45');
      expect(vo.value).toBe(45);
      expect(Object.isFrozen(vo)).toBe(true);
    });

    test('lanza DomainError cuando la edad no es entero válido o está fuera de rango', () => {
      expect(() => new EdadClinicaVO(3.5)).toThrow(
        'La edad clinica debe ser un entero entre 0 y 130'
      );
      expect(() => new EdadClinicaVO(-1)).toThrow(
        'La edad clinica debe ser un entero entre 0 y 130'
      );
      expect(() => new EdadClinicaVO(131)).toThrow(
        'La edad clinica debe ser un entero entre 0 y 130'
      );
      expect(() => new EdadClinicaVO('abc')).toThrow(
        'La edad clinica debe ser un entero entre 0 y 130'
      );
    });
  });

  describe('FechaClinicaVO', () => {
    test('permite null/undefined/empty y deja value en null', () => {
      expect(new FechaClinicaVO(null, 'err').value).toBeNull();
      expect(new FechaClinicaVO(undefined, 'err').value).toBeNull();
      expect(new FechaClinicaVO('', 'err').value).toBeNull();
    });

    test('acepta fechas ISO válidas y las serializa a ISO', () => {
      const raw = '1980-01-01T00:00:00Z';
      const vo = new FechaClinicaVO(raw, 'fecha inválida');
      expect(vo.value).toBe(new Date(raw).toISOString());
      expect(Object.isFrozen(vo)).toBe(true);
    });

    test('lanza DomainError con el mensaje provisto si la fecha es inválida', () => {
      const mensaje = 'La fecha no tiene formato';
      expect(() => new FechaClinicaVO('not-a-date', mensaje)).toThrow(mensaje);
    });
  });
});

describe('FiliacionAggregate (Agregado)', () => {
  const validId = '123e4567-e89b-42d3-a456-426614174000';

  test('construye agregado válido y obtener parametros respetando posiciones', () => {
    const agg = new FiliacionAggregate({
      id_historia: validId,
      raza: ' mestizo ',
      edad: 45,
      sexo: 'M',
      fecha_elaboracion: '2020-01-01T00:00:00Z',
    });

    expect(Object.isFrozen(agg)).toBe(true);
    const params = agg.obtenerParametros();
    // id_historia en posición 0
    expect(params[0]).toBe(agg.idHistoria);
    // raza (texto normalizado) en posición 1
    expect(params[1]).toBe('mestizo');
    // edad en posición 17 (0-based)
    expect(params[17]).toBe(45);
    // sexo en posición 18
    expect(params[18]).toBe('M');
    // fecha_elaboracion en posición 19
    expect(params[19]).toBe(new Date('2020-01-01T00:00:00Z').toISOString());
  });

  test('acepta sexo nulo y lo normaliza a null', () => {
    const agg = new FiliacionAggregate({ id_historia: validId, sexo: null });
    const params = agg.obtenerParametros();
    expect(params[18]).toBeNull();
  });

  test('lanza DomainError si sexo no permitido', () => {
    expect(
      () => new FiliacionAggregate({ id_historia: validId, sexo: 'X' })
    ).toThrow('El sexo clinico no tiene un valor permitido');
  });
});
