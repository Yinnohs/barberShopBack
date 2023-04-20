import * as bcrypt from 'bcrypt';
export async function hashPassword(password: string, salts: number) {
  const hashedPassword = await bcrypt.hash(password, salts);
  return hashedPassword;
}

export async function checkPassword(
  password: string,
  hashedDbPassword: string,
) {
  const isValidPassword = await bcrypt.compare(password, hashedDbPassword);
  return isValidPassword;
}
