import { Response } from "express";
import { BadResponse, OkResponse } from "../types/response";

export function okResponse(
  res: Response,
  { status, message, data }: OkResponse
) {
  return res.status(status).send({
    status,
    success: true,
    message,
    data,
  });
}
export function badResponse(
  res: Response,
  { status, errorCode, message }: BadResponse
) {
  return res.status(status).send({
    status,
    success: false,
    message,
    code: errorCode,
  });
}
