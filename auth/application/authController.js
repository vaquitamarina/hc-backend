import AuthRepository from '../infrastructure/authRepository.js';
import { TokenService } from '../../services/tokenService.js';
import { CookieService } from '../../services/cookieServices.js';
import { DomainError } from '../domain/authDomain.js';

const iniciarSesion = async (req, res) => {
  try {
    const { userCode, password } = req.body;

    if (!userCode || !password) {
      return res.status(400).json({ error: 'Missing credentials' });
    }

    // Basic domain validation could be added here; reuse existing VOs elsewhere.
    const user = await AuthRepository.autenticarUsuario(userCode, password);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const accessToken = TokenService.generateAccessToken(user);
    const refreshToken = TokenService.generateRefreshToken(user);

    CookieService.setTokenCookies(res, accessToken, refreshToken);

    res.status(200).json({
      id: user.id,
      userCode: user.userCode,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    if (err instanceof DomainError) {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

const obtenerSesionActual = async (req, res) => {
  res.status(200).json(req.user);
};

const cerrarSesion = (req, res) => {
  res.clearCookie('accessToken', { path: '/' });
  res.status(200).json({ message: 'Logout exitoso' });
};

export default {
  iniciarSesion,
  obtenerSesionActual,
  cerrarSesion,
};
