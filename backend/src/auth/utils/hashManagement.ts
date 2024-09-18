import { compareSync, hashSync } from "bcrypt";

export function generateHash(password: string): string {
  return hashSync(password, 10);
}

export function verifyHash(password: string, hash: string): boolean {
  return compareSync(password, hash);
}
