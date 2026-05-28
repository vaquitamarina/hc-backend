import { describe, test, expect } from 'vitest';
import {
  DomainError,
  IdHistoriaClinicaVO,
  AgudezaVisualVO,
  AperturaMaximaVO,
  MusculosDolorGradoVO,
  ExamenFisicoRegionalAggregate,
} from '../../examenRegional/domain/examenRegionalDomain.js';

describe('ExamenRegional Domain - Value Objects', () => {
  describe('IdHistoriaClinicaVO', () => {
    test('acepta UUID v4 válido y normaliza', () => {
      const raw = ' 123E4567-E89B-42D3-A456-426614174100 ';
      const vo = new IdHistoriaClinicaVO(raw);
      expect(vo.value).toBe('123e4567-e89b-42d3-a456-426614174100');
      expect(Object.isFrozen(vo)).toBe(true);
    });

    test('lanza DomainError para valores falsy o no-string con mensaje exacto', () => {
      expect(() => new IdHistoriaClinicaVO(null)).toThrow(
        'id_historia invalido: debe ser UUIDv4'
      );
      expect(() => new IdHistoriaClinicaVO(123)).toThrow(
        'id_historia invalido: debe ser UUIDv4'
      );
    });

    test('lanza DomainError para formato UUID inválido con mensaje exacto', () => {
      expect(() => new IdHistoriaClinicaVO('invalid-uuid')).toThrow(
        'id_historia invalido: formato UUIDv4 esperado'
      );
    });
  });

  describe('AgudezaVisualVO', () => {
    test('permite null/undefined y deja value en null', () => {
      expect(new AgudezaVisualVO(null).value).toBeNull();
      expect(new AgudezaVisualVO(undefined).value).toBeNull();
    });

    test('acepta valores numéricos válidos y los normaliza', () => {
      expect(new AgudezaVisualVO('8').value).toBe(8);
      expect(Object.isFrozen(new AgudezaVisualVO(5))).toBe(true);
    });

    test('valores fuera de rango o no numéricos resultan en null (no throw)', () => {
      expect(new AgudezaVisualVO(0).value).toBeNull();
      expect(new AgudezaVisualVO(11).value).toBeNull();
      expect(new AgudezaVisualVO('abc').value).toBeNull();
    });
  });

  describe('AperturaMaximaVO', () => {
    test('acepta null y números válidos', () => {
      expect(new AperturaMaximaVO(null).value).toBeNull();
      expect(new AperturaMaximaVO('45').value).toBe(45);
    });

    test('valores fuera de rango resultan en null', () => {
      expect(new AperturaMaximaVO(-1).value).toBeNull();
      expect(new AperturaMaximaVO(150).value).toBeNull();
      expect(new AperturaMaximaVO('nope').value).toBeNull();
    });
  });

  describe('MusculosDolorGradoVO', () => {
    test('normaliza valores válidos y acepta null', () => {
      expect(new MusculosDolorGradoVO(null).value).toBeNull();
      expect(new MusculosDolorGradoVO('7').value).toBe(7);
    });

    test('valores fuera de rango resultan en null', () => {
      expect(new MusculosDolorGradoVO(-5).value).toBeNull();
      expect(new MusculosDolorGradoVO(20).value).toBeNull();
    });
  });
});

describe('ExamenFisicoRegionalAggregate', () => {
  const validId = '123e4567-e89b-42d3-a456-426614174100';

  test('construye agregado válido y obtenerParametros respeta posiciones y normalizaciones', () => {
    const body = {
      cabezaPosicion: '  neutra ',
      ojosAgudezaVisual: '8',
      atmAperturaMaximaMm: '45',
      atmMusculosDolorGrado: '3',
    };

    const agg = new ExamenFisicoRegionalAggregate({
      id_historia: validId,
      body,
    });
    expect(Object.isFrozen(agg)).toBe(true);
    const params = agg.obtenerParametros();
    // id_historia posicion 0
    expect(params[0]).toBe(validId);
    // cabezaPosicion (texto normalizado) en posicion 1
    expect(params[1]).toBe('neutra');
    // ojosAgudezaVisual en posicion 11
    expect(params[11]).toBe(8);
    // atmAperturaMaximaMm en posicion 39
    expect(params[39]).toBe(45);
    // atmMusculosDolorGrado en posicion 42
    expect(params[42]).toBe(3);
  });

  test('normaliza strings vacíos a null', () => {
    const body = {
      cabezaPosicion: '   ',
      ojosAgudezaVisual: '',
      atmAperturaMaximaMm: '',
    };
    const agg = new ExamenFisicoRegionalAggregate({
      id_historia: validId,
      body,
    });
    const params = agg.obtenerParametros();
    expect(params[1]).toBeNull();
    expect(params[11]).toBeNull();
    expect(params[39]).toBeNull();
  });

  test('lanza DomainError si id_historia inválido', () => {
    expect(
      () =>
        new ExamenFisicoRegionalAggregate({
          id_historia: 'invalid-uuid',
          body: {},
        })
    ).toThrow('id_historia invalido: formato UUIDv4 esperado');
  });
});
