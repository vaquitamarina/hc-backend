export class UserController {
  constructor(UserModel) {
    this.UserModel = UserModel;
  }

  getAll = async (req, res) => {
    const users = await this.UserModel.getAll();
    res.json(users);
  };

  insert = async (req, res) => {
    const newUser = await this.UserModel.insert(req.body);
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
}
