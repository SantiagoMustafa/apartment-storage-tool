// Types
import { Department } from "../types/department";

// Services
import turso from "~/services/turso";

export default class DepartmentModel {
  static async getAllDepartments(uuid: string): Promise<Department[]> {
    return await turso
      .execute({
        sql: "SELECT id, title, description, address_street, address_number, rent, expenses, link, environments, rooms FROM departments WHERE user_uuid = ?",
        args: [uuid],
      })
      .then(({ rows }) => {
        return rows as unknown as Department[];
      })
      .catch(() => {
        return [];
      });
  }

  static async getDepartmentById(
    id: string,
    uuid: string
  ): Promise<Department> {
    return await turso
      .execute({
        sql: "SELECT id, title, description, address_street, address_number, rent, expenses FROM departments WHERE id = ? AND user_uuid = ?",
        args: [id, uuid],
      })
      .then(({ rows }) => {
        return rows[0] as unknown as Department;
      })
      .catch(() => {
        return {} as Department;
      });
  }

  static async createDepartment({
    id,
    link,
    title,
    description,
    rooms,
    environments,
    address_street,
    address_number,
    rent,
    expenses,
    user_uuid,
  }: Department): Promise<boolean> {
    return await turso
      .execute({
        sql: "INSERT INTO departments (id, title, link, description, rooms, environments, address_street, address_number, rent, expenses, user_uuid) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        args: [
          id,
          title,
          link,
          description,
          Number.parseInt(rooms),
          Number.parseInt(environments),
          address_street,
          Number.parseInt(address_number),
          Number.parseInt(rent),
          Number.parseInt(expenses),
          user_uuid,
        ],
      })
      .then(({ rowsAffected }) => {
        if (rowsAffected === 0) {
          return false;
        }
        return true;
      })
      .catch((e) => {
        return false;
      });
  }

  //   Analizar que se puede actualizar de un departamento
  static async updateDepartment(
    id: string,
    uuid: string,
    department: Department
  ) {}

  static async deleteDepartment(id: string, uuid: string): Promise<boolean> {
    return await turso
      .execute({
        sql: "DELETE FROM departments WHERE id = ? AND user_uuid = ?",
        args: [id, uuid],
      })
      .then(({ rowsAffected }) => {
        if (rowsAffected === 0) {
          return false;
        }
        return true;
      })
      .catch(() => {
        return false;
      });
  }
}
