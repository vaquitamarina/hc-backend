import { UserModel } from '../../models/user/userModel.js';

class AuthRepository {
  static async autenticarUsuario(userCode, password) {
    // Delegate to existing user model's authentication logic.
    return UserModel.autenticarUsuario(userCode, password);
  }
}

export default AuthRepository;
