import * as bcrypt from 'bcrypt';
export async function hashPassword(password: string, salts: number) {
  const hashedPassword = await bcrypt.hash(password, salts);
  return hashPassword;
}
