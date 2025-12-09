const AuthService = require("../../application/use-cases/auth.service");
const UserMongoRepository = require("../../infrastructure/repositories/database/mongo/user.mongo.repository");
const ValidationError = require("../../domain/errors/custom-error");

const authService = new AuthService(new UserMongoRepository());

class AuthController {
  async login(req, res, next) {
    const { email, password } = req.body;
    
    try {
      if (!email || !password) {
        throw new ValidationError("Email and password are required");
      }
      const result = await authService.login(email, password);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
