/**
 * UserControllerAdapter - Adaptador Primario
 * Maneja las operaciones HTTP de Usuarios
 */

export class UserControllerAdapter {
  constructor(registerUserService, getUserService) {
    this.registerUserService = registerUserService;
    this.getUserService = getUserService;
  }

  /**
   * POST /users/register
   */
  register = async (req, res) => {
    try {
      const input = req.body;

      const user = await this.registerUserService.execute(input);

      return res.status(201).json({
        message: 'Usuario registrado con éxito',
        data: user,
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  };

  /**
   * GET /users/:id
   */
  getById = async (req, res) => {
    try {
      const { id } = req.params;

      const user = await this.getUserService.execute(id);

      return res.status(200).json(user);
    } catch (error) {
      return res.status(404).json({
        error: error.message,
      });
    }
  };
}
