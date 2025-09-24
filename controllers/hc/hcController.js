export class HcController {
  constructor(HcModel) {
    this.HcModel = HcModel;
  }

  createReview = async (req, res) => {
    const { idHistory, idTeacher, state, observations } = req.body;
    const result = await this.HcModel.createReview({
      idHistory,
      idTeacher,
      state,
      observations,
    });
    if (result) {
      return res.status(201).json({
        success: true,
        message: 'Revision registrada con exito',
      });
    } else {
      return res.status(500).json({
        success: false,
        message: 'Error al registrar la revision',
      });
    }
  };
}
