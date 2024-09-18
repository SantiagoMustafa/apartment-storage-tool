import { Router } from "express";
import DepartmentController from "./controller/departmentController";

export const department = Router();

department.get("/:uuid", DepartmentController.getAllDepartments);
department.get("/:uuid/:id", DepartmentController.getDepartmentById);
department.post("/", DepartmentController.createDepartment);
