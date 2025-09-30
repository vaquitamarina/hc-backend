import { TokenService } from '../../services/tokenService.js';
import { CookieService } from '../../services/cookieServices.js';
export class AuthController {
  constructor(UserModel) {
    this.UserModel = UserModel;
  }

  login = async (req, res) => {
    try {
      const { userCode, password } = req.body;

      if (!userCode || !password) {
        return res.status(400).json({ error: 'Missing credentials' });
      }

      const user = await this.UserModel.login(userCode, password);

      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const accessToken = TokenService.generateAccessToken(user);
      const refreshToken = TokenService.generateRefreshToken(user);

      CookieService.setTokenCookies(res, accessToken, refreshToken);

      res.status(200).json({
        user: {
          id: user.id,
          userCode: user.userCode,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  getCurrentUser = async (req, res) => {
    res.status(200).json(req.user);
  };
}
