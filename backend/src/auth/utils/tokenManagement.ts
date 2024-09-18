import jwt from "jsonwebtoken";

export function generateToken(payload: Payload): string {
  return jwt.sign(payload, process.env.JWT_SECRET!);
}

export function verifyToken(token: string): TokenValidation {
  const result = jwt.verify(token, process.env.JWT_SECRET!) as Payload;
  if (result) {
    return {
      success: true,
      code: "OK",
      message: "Se han verificado los datos del token",
      data: result,
    };
  } else {
    return {
      success: false,
      code: "INVALID_TOKEN",
      message: "Token no válido",
    };
  }
}

interface Payload {
  uuid: string;
  username: string;
}

interface TokenValidation {
  success: boolean;
  code: string;
  message: string;
  data?: Payload;
}
