import * as token from "jsonwebtoken";
import * as bcrypt from "bcrypt";

const saltRounds = 10;

export async function hash(password: string): Promise<string> {
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
}

export async function compare(password: string, storedHash: string): Promise<boolean> {
  const result = await bcrypt.compare(password, storedHash);
  return result;
}
