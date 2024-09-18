// Types
import { NextFunction, Request, Response } from "express";
import { Department } from "../types/department";

// Models
import DepartmentModel from "../model/departmentModel";
import DepartmentErrors from "../errors/departmentErrors";

export default class DepartmentController {
  static async getAllDepartments(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const uuid: string = req.params.uuid;
    const departments = await DepartmentModel.getAllDepartments(uuid);

    if (departments.length === 0) {
      return next(DepartmentErrors.NotFound);
    }

    return res.status(200).send({
      status: 202,
      success: true,
      message: "OK",
      data: departments,
    });
  }

  static async getDepartmentById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const id: string = req.params.id;
    const uuid: string = req.params.uuid;

    const department = await DepartmentModel.getDepartmentById(id, uuid);

    if (Object.keys(department).length === 0) {
      return next(DepartmentErrors.NotFound);
    }

    return res.status(200).send({
      status: 200,
      success: true,
      message: "OK",
      data: department,
    });
  }

  static async createDepartment(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const data: Department = req.body;

    if (!data) {
      return next(DepartmentErrors.InternalServerError);
    }

    data.id = crypto.randomUUID();
    const result = await DepartmentModel.createDepartment(data);

    if (!result) {
      return next(DepartmentErrors.InternalServerError);
    }

    return res.status(201).send({
      status: 201,
      success: true,
      message: "Department created",
      data: data,
    });
  }

  static async updateDepartment(
    req: Request,
    res: Response,
    next: NextFunction
  ) {}

  static async deleteDepartment(
    req: Request,
    res: Response,
    next: NextFunction
  ) {}
}
