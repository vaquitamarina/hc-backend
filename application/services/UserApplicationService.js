/**
 * UserApplicationService
 * Implementa casos de uso relacionados con Usuarios
 */
export class RegisterUserApplicationService {
  constructor(userRepository) {
    if (!userRepository) {
      throw new Error('UserRepository dependency required');
    }
    this.userRepository = userRepository;
  }

  async execute(input) {
    const {
      userCode,
      firstName,
      lastName,
      dni,
      email,
      role,
      password,
    } = input;

    if (!userCode || !firstName || !email || !password) {
      throw new Error('Missing required fields');
    }

    const user = await this.userRepository.register(
      userCode,
      firstName,
      lastName,
      dni,
      email,
      role,
      password
    );

    if (!user) {
      throw new Error('Failed to register user');
    }

    return {
      userCode: user.userCode,
      firstName: user.firstName,
      email: user.email,
      role: user.role,
    };
  }
}

/**
 * GetUserApplicationService
 */
export class GetUserApplicationService {
  constructor(userRepository) {
    if (!userRepository) {
      throw new Error('UserRepository dependency required');
    }
    this.userRepository = userRepository;
  }

  async execute(userId) {
    if (!userId) {
      throw new Error('userId is required');
    }

    const user = await this.userRepository.getUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}
