import jwt from 'jsonwebtoken';
import { validatePasswd } from '../../schemas/passwdSchema.js';

export class UserController {
  constructor(UserModel) {
    this.UserModel = UserModel;
  }

  listarUsuarios = async (req, res) => {
    const users = await this.UserModel.listarUsuarios();
    res.json(users);
  };

  registrarUsuario = async (req, res) => {
    try {
      const { userCode, firstName, lastName, dni, email, role, password } =
        req.body;
      const result = validatePasswd(password);
      if (!result.success) {
        return res.status(400).json({
          error: JSON.parse(result.error.message).map((e) => e.message),
        });
      }
      const { UserCodeValueObject, EmailValueObject } = this.UserModel;
      const userCodeVO = new UserCodeValueObject(userCode);
      const emailVO = new EmailValueObject(email);
      const newUser = await this.UserModel.registrarUsuario(
        userCodeVO.value,
        firstName,
        lastName,
        dni,
        emailVO.value,
        role,
        password
      );
      if (!newUser) {
        return res.status(400).json({ error: 'Error registering user' });
      }
      return res.status(201).json(newUser);
    } catch (error) {
      if (
        error.message &&
        (error.message.includes('userCode') || error.message.includes('email'))
      ) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Error registering user' });
    }
  };

  iniciarSesion = async (req, res) => {
    const { userCode, password } = req.body;
    const user = await this.UserModel.autenticarUsuario(userCode, password);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id }, 'secret'); // Usa tu clave real en producción
    res.status(200).json({ ...user, token });
  };

  obtenerUsuarioPorId = async (req, res) => {
    const { id } = req.params;
    const user = await this.UserModel.obtenerUsuarioPorId(id);
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
