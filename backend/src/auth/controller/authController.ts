// Types
import { NextFunction, Request, Response } from "express";
import { UserRegister, UserLogin, UserUpdate } from "~/auth/types/user";

// Models
import AuthModel from "../model/authModel";

// Utils
import { generateUUID } from "../utils/generateUUID";
import { generateHash, verifyHash } from "../utils/hashManagement";
import { generateToken, verifyToken } from "../utils/tokenManagement";
import { okResponse } from "../utils/responseManagement";
import AuthError from "../errors/AuthErrors";

export default class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    const { username, password, passwordConfirm }: UserRegister = req.body;

    // Verificamos que la contraseña sea igual
    if (password !== passwordConfirm) {
      return next(AuthError.PasswordNotMatch);
    }

    // Generamos el uuid
    const UUID = generateUUID();

    // Almacenamos en la base de datos
    const status = await AuthModel.saveUser({
      uuid: UUID,
      username,
      password: generateHash(password),
    });

    if (status) {
      return okResponse(res, {
        status: 201,
        message: "User created",
        data: {
          uuid: UUID,
          username,
        },
      });
    }

    return next(AuthError.UserAlreadyExists);
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    const { username, password }: UserLogin = req.body;

    const user = await AuthModel.getUser(username);

    if (!user) {
      return next(AuthError.UserNotFound);
    }

    const status = verifyHash(password, user.password);

    if (status) {
      const token = generateToken({
        uuid: user.uuid,
        username: user.username,
      });

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.DEV == "true",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24 * 7,
      });
      return okResponse(res, {
        status: 200,
        message: "Login success",
        data: {
          uuid: user.uuid,
          username: user.username,
        },
      });
    }

    return next(AuthError.InvalidPassword);
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    const { uuid, username, password }: UserUpdate = req.body;
    if (username) {
      const status = await AuthModel.updateUsername(uuid, username);
      if (status) {
        return okResponse(res, { status: 200, message: "OK", data: {} });
      }
      return next(AuthError.UserNotFound);
    } else if (password) {
      const status = await AuthModel.updatePassword(
        uuid,
        generateHash(password)
      );
      if (status) {
        return okResponse(res, { status: 200, message: "OK", data: {} });
      }
      return next(AuthError.UserNotFound);
    }
    return next(AuthError.UserNotFound);
  }

  static async loginWithToken(req: Request, res: Response, next: NextFunction) {
    const { token } = req.cookies;

    if (!token) {
      return next(AuthError.InvalidToken);
    }

    const result = verifyToken(token);

    if (result.success && result.data) {
      return okResponse(res, {
        status: 200,
        message: "Login success",
        data: {
          uuid: result.data.uuid,
          username: result.data.username,
        },
      });
    } else {
      return next(AuthError.InvalidToken);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    const { uuid } = req.params;
    const status = await AuthModel.deleteUser(uuid);

    if (status) {
      return okResponse(res, { status: 200, message: "OK", data: {} });
    }

    return next(AuthError.UserNotFound);
  }
}
