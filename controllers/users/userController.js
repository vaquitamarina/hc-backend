export class UserController {
  constructor(UserModel) {
    this.UserModel = UserModel;
  }

  getAll = async (req, res) => {
    const users = await this.UserModel.getAll();
    res.json(users);
  };

  register = async (req, res) => {
    const newUser = await this.UserModel.register(req.body);
    res.status(201).json(newUser);
  };

  login = async (req, res) => {
    const { userCode, password } = req.body;
    const user = await this.UserModel.login(userCode, password);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.json(user);
  };

  getUserById = async (req, res) => {
    const { id } = req.params;
    const user = await this.UserModel.getUserById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado',
      });
    }
    res.status(200).json({
      success: true,
      data: user,
    });
  };
}
