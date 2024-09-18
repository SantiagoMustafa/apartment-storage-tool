import ErrorModel from "~/models/Error";

class UserNotFound extends ErrorModel {
  constructor() {
    super(400, "USER_NOT_FOUND", "Usuario no encontrado");
  }
}

class UserAlreadyExists extends ErrorModel {
  constructor() {
    super(400, "USER_ALREADY_EXISTS", "El usuario ya existe");
  }
}

class PasswordNotMatch extends ErrorModel {
  constructor() {
    super(400, "PASSWORD_NOT_MATCH", "Las contraseñas no coinciden");
  }
}

class InvalidPassword extends ErrorModel {
  constructor() {
    super(400, "INVALID_PASSWORD", "Contraseña incorrecta");
  }
}

class InvalidToken extends ErrorModel {
  constructor() {
    super(400, "INVALID_TOKEN", "Token invalido");
  }
}

class TokenExpired extends ErrorModel {
  constructor() {
    super(400, "TOKEN_EXPIRED", "Token expirado");
  }
}

class Unauthorized extends ErrorModel {
  constructor() {
    super(401, "UNAUTHORIZED", "No autorizado");
  }
}

class InternalServerError extends ErrorModel {
  constructor() {
    super(500, "INTERNAL_SERVER_ERROR", "Error interno del servidor");
  }
}

export default class AuthError {
  static UserNotFound = new UserNotFound();
  static UserAlreadyExists = new UserAlreadyExists();
  static PasswordNotMatch = new PasswordNotMatch();
  static InvalidPassword = new InvalidPassword();
  static InvalidToken = new InvalidToken();
  static TokenExpired = new TokenExpired();
  static Unauthorized = new Unauthorized();
  static InternalServerError = new InternalServerError();
}
