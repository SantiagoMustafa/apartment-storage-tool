import turso from "~/services/turso";
import { User } from "~/auth/types/user";

export default class AuthModel {
  static async saveUser(user: User): Promise<boolean> {
    return await turso
      .execute({
        sql: "INSERT INTO users (uuid, username, password) VALUES (?, ?, ?)",
        args: [user.uuid, user.username, user.password],
      })
      .then(({ rowsAffected }) => {
        if (rowsAffected !== 0) {
          return true;
        }
        return false;
      })
      .catch(() => {
        return false;
      });
  }

  static async getUser(username: string): Promise<User | null> {
    const { rows }: { rows: any[] } = await turso.execute({
      sql: "SELECT * FROM users WHERE username = ?",
      args: [username],
    });
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  }

  static async updateUsername(
    uuid: string,
    username: string
  ): Promise<boolean> {
    const { rowsAffected } = await turso.execute({
      sql: "UPDATE users SET username = ? WHERE uuid = ?",
      args: [username, uuid],
    });
    if (rowsAffected === 0) {
      return false;
    }
    return true;
  }

  static async updatePassword(
    uuid: string,
    password: string
  ): Promise<boolean> {
    const { rowsAffected } = await turso.execute({
      sql: "UPDATE users SET password = ? WHERE uuid = ?",
      args: [password, uuid],
    });
    if (rowsAffected === 0) {
      return false;
    }
    return true;
  }

  static async deleteUser(uuid: string): Promise<boolean> {
    const { rowsAffected } = await turso.execute({
      sql: "DELETE FROM users WHERE uuid = ?",
      args: [uuid],
    });
    if (rowsAffected === 0) {
      return false;
    }
    return true;
  }
}
