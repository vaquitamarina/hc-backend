import antecedenteRepository from '../infrastructure/antecedenteRepository.js';
import {
  AntecedenteFamiliarAggregate,
  AntecedenteMedicoAggregate,
  AntecedentePersonalAggregate,
  DomainError,
  IdHistoriaClinicaVO,
  SeguimientoDelTratamientoAggregate,
} from '../domain/antecedenteDomain.js';

/**
 * Adaptador Primario del modulo de antecedentes.
 */
class AntecedenteControllerClass {
  construirDatos(req) {
    return {
      ...req.body,
      id_historia: req.params.id_historia ?? req.body.id_historia,
    };
  }

  obtenerHistoriaId(req) {
    return new IdHistoriaClinicaVO(
      req.params.id_historia ?? req.body.id_historia
    ).value;
  }

  registrarAntecedentesPersonalesNoPatologicos = async (req, res) => {
    try {
      const agregado = new AntecedentePersonalAggregate(
        this.construirDatos(req)
      );
      await antecedenteRepository.createAntecedentePersonal(agregado);
      return res.status(201).json({
        message:
          'Antecedentes personales no patologicos registrados correctamente',
      });
    } catch (error) {
      if (error instanceof DomainError) {
        return res.status(400).json({ error: error.message });
      }
      return res
        .status(500)
        .json({ error: 'Error al registrar antecedente personal' });
    }
  };

  consultarAntecedentesPersonalesNoPatologicos = async (req, res) => {
    try {
      const idHistoria = this.obtenerHistoriaId(req);
      const result =
        await antecedenteRepository.getAntecedentePersonalByHistoria(
          idHistoria
        );
      if (!result) {
        return res.status(404).json({ error: 'No encontrado' });
      }
      return res.status(200).json(result);
    } catch (error) {
      if (error instanceof DomainError) {
        return res.status(400).json({ error: error.message });
      }
      return res
        .status(500)
        .json({ error: 'Error al obtener antecedente personal' });
    }
  };

  actualizarAntecedentesPersonalesNoPatologicos = async (req, res) => {
    try {
      const idHistoria = this.obtenerHistoriaId(req);
      const existente =
        await antecedenteRepository.getAntecedentePersonalByHistoria(
          idHistoria
        );
      if (!existente) {
        return res.status(404).json({ error: 'No encontrado' });
      }

      const agregado = new AntecedentePersonalAggregate(
        this.construirDatos(req)
      );
      await antecedenteRepository.updateAntecedentePersonal(agregado);
      return res.status(200).json({
        message:
          'Antecedentes personales no patologicos actualizados correctamente',
      });
    } catch (error) {
      if (error instanceof DomainError) {
        return res.status(400).json({ error: error.message });
      }
      return res
        .status(500)
        .json({ error: 'Error al actualizar antecedente personal' });
    }
  };

  registrarAntecedentesPersonalesPatologicos = async (req, res) => {
    try {
      const agregado = new AntecedenteMedicoAggregate(this.construirDatos(req));
      await antecedenteRepository.createAntecedenteMedico(agregado);
      return res.status(201).json({
        message:
          'Antecedentes personales patologicos registrados correctamente',
      });
    } catch (error) {
      if (error instanceof DomainError) {
        return res.status(400).json({ error: error.message });
      }
      return res
        .status(500)
        .json({ error: 'Error al registrar antecedente medico' });
    }
  };

  consultarAntecedentesPersonalesPatologicos = async (req, res) => {
    try {
      const idHistoria = this.obtenerHistoriaId(req);
      const result =
        await antecedenteRepository.getAntecedenteMedicoByHistoria(idHistoria);
      if (!result) {
        return res.status(404).json({ error: 'No encontrado' });
      }
      return res.status(200).json(result);
    } catch (error) {
      if (error instanceof DomainError) {
        return res.status(400).json({ error: error.message });
      }
      return res
        .status(500)
        .json({ error: 'Error al obtener antecedente medico' });
    }
  };

  actualizarAntecedentesPersonalesPatologicos = async (req, res) => {
    try {
      const idHistoria = this.obtenerHistoriaId(req);
      const existente =
        await antecedenteRepository.getAntecedenteMedicoByHistoria(idHistoria);
      if (!existente) {
        return res.status(404).json({ error: 'No encontrado' });
      }

      const agregado = new AntecedenteMedicoAggregate(this.construirDatos(req));
      await antecedenteRepository.updateAntecedenteMedico(agregado);
      return res.status(200).json({
        message:
          'Antecedentes personales patologicos actualizados correctamente',
      });
    } catch (error) {
      if (error instanceof DomainError) {
        return res.status(400).json({ error: error.message });
      }
      return res
        .status(500)
        .json({ error: 'Error al actualizar antecedente medico' });
    }
  };

  registrarAntecedentesHeredoFamiliares = async (req, res) => {
    try {
      const agregado = new AntecedenteFamiliarAggregate(
        this.construirDatos(req)
      );
      await antecedenteRepository.createAntecedenteFamiliar(agregado);
      return res.status(201).json({
        message: 'Antecedentes heredo familiares registrados correctamente',
      });
    } catch (error) {
      if (error instanceof DomainError) {
        return res.status(400).json({ error: error.message });
      }
      return res
        .status(500)
        .json({ error: 'Error al registrar antecedente familiar' });
    }
  };

  consultarAntecedentesHeredoFamiliares = async (req, res) => {
    try {
      const idHistoria = this.obtenerHistoriaId(req);
      const result =
        await antecedenteRepository.getAntecedenteFamiliarByHistoria(
          idHistoria
        );
      if (!result) {
        return res.status(404).json({ error: 'No encontrado' });
      }
      return res.status(200).json(result);
    } catch (error) {
      if (error instanceof DomainError) {
        return res.status(400).json({ error: error.message });
      }
      return res
        .status(500)
        .json({ error: 'Error al obtener antecedente familiar' });
    }
  };

  actualizarAntecedentesHeredoFamiliares = async (req, res) => {
    try {
      const idHistoria = this.obtenerHistoriaId(req);
      const existente =
        await antecedenteRepository.getAntecedenteFamiliarByHistoria(
          idHistoria
        );
      if (!existente) {
        return res.status(404).json({ error: 'No encontrado' });
      }

      const agregado = new AntecedenteFamiliarAggregate(
        this.construirDatos(req)
      );
      await antecedenteRepository.updateAntecedenteFamiliar(agregado);
      return res.status(200).json({
        message: 'Antecedentes heredo familiares actualizados correctamente',
      });
    } catch (error) {
      if (error instanceof DomainError) {
        return res.status(400).json({ error: error.message });
      }
      return res
        .status(500)
        .json({ error: 'Error al actualizar antecedente familiar' });
    }
  };

  registrarSeguimientoDelTratamiento = async (req, res) => {
    try {
      const agregado = new SeguimientoDelTratamientoAggregate(
        this.construirDatos(req)
      );
      await antecedenteRepository.createAntecedenteCumplimiento(agregado);
      return res.status(201).json({
        message: 'Seguimiento del tratamiento registrado correctamente',
      });
    } catch (error) {
      if (error instanceof DomainError) {
        return res.status(400).json({ error: error.message });
      }
      return res
        .status(500)
        .json({ error: 'Error al registrar seguimiento del tratamiento' });
    }
  };

  consultarSeguimientoDelTratamiento = async (req, res) => {
    try {
      const idHistoria = this.obtenerHistoriaId(req);
      const result =
        await antecedenteRepository.getAntecedenteCumplimientoByHistoria(
          idHistoria
        );
      if (!result) {
        return res.status(404).json({ error: 'No encontrado' });
      }
      return res.status(200).json(result);
    } catch (error) {
      if (error instanceof DomainError) {
        return res.status(400).json({ error: error.message });
      }
      return res
        .status(500)
        .json({ error: 'Error al obtener seguimiento del tratamiento' });
    }
  };

  actualizarSeguimientoDelTratamiento = async (req, res) => {
    try {
      const idHistoria = this.obtenerHistoriaId(req);
      const existente =
        await antecedenteRepository.getAntecedenteCumplimientoByHistoria(
          idHistoria
        );
      if (!existente) {
        return res.status(404).json({ error: 'No encontrado' });
      }

      const agregado = new SeguimientoDelTratamientoAggregate(
        this.construirDatos(req)
      );
      await antecedenteRepository.updateAntecedenteCumplimiento(agregado);
      return res.status(200).json({
        message: 'Seguimiento del tratamiento actualizado correctamente',
      });
    } catch (error) {
      if (error instanceof DomainError) {
        return res.status(400).json({ error: error.message });
      }
      return res
        .status(500)
        .json({ error: 'Error al actualizar seguimiento del tratamiento' });
    }
  };
}

export const AntecedenteController = new AntecedenteControllerClass();
