export const jwtExpireTime = 60 * 15;
export const refreshTokenExpiresTime = 60 * 60 * 24 * 7;
export const jwtSecret = process.env.JWT_SECRET;
export const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;
