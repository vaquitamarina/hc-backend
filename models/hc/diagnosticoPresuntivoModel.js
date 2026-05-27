import { HcModel } from './hcModel.js';

export async function consultarDiagnosticoPresuntivo(idHistory) {
  return HcModel.getDiagnosticoPresuntivo(idHistory);
}

export async function actualizarDiagnosticoPresuntivo({
  idHistory,
  descripcion,
  idUsuario,
}) {
  return HcModel.updateDiagnosticoPresuntivo({
    idHistory,
    descripcion,
    idUsuario,
  });
}
