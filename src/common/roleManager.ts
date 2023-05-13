import { RolesBuilder } from 'nest-access-control';
import { Role } from './types';

export const RBCA_POLICY: RolesBuilder = new RolesBuilder();

const CLIENT: Role = 'CLIENT';
const BARBER: Role = 'BARBER';
const ADMIN: Role = 'ADMIN';

export const ROLES: Role[] = [CLIENT, BARBER, ADMIN];

export const userDataResource = 'userData';
export const userRoleResource = 'userRole';
export const barberDataResource = 'barberData';
export const createAdminClaim = 'createAdminClaim';
export const createBarberClaim = 'createBarberClaim';
export const allReadClaims = 'allReadsClaim';

RBCA_POLICY.grant(CLIENT)
  .readAny(allReadClaims)
  .readOwn(userDataResource)
  .updateOwn(userDataResource)
  .deleteOwn(userDataResource)
  .grant(BARBER)
  .extend('CLIENT')
  .read(userRoleResource)
  .grant(ADMIN)
  .extend('BARBER')
  .read(userDataResource)
  .update(userDataResource)
  .delete(userDataResource)
  .update(userRoleResource)
  .create(barberDataResource)
  .create(createBarberClaim)
  .create(createAdminClaim);
