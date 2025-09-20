export class UserController {
  constructor(userModel) {
    this.userModel = userModel;
  }

  getAll = async (req, res) => {
    const users = await this.userModel.getAll();
    res.json(users);
  };

  insert = async (req, res) => {
    const newUser = await this.userModel.insert(req.body);
    res.status(201).json(newUser);
  };
}
