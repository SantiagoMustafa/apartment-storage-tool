import ErrorModel from "~/models/Error";

class NotFound extends ErrorModel {
  constructor() {
    super(404, "NOT_FOUND", "Recurso no encontrado");
  }
}

class InternalServerError extends ErrorModel {
  constructor() {
    super(500, "INTERNAL_SERVER_ERROR", "Error interno del servidor");
  }
}

export default class DepartmentErrors {
  static NotFound = new NotFound();
  static InternalServerError = new InternalServerError();
}
