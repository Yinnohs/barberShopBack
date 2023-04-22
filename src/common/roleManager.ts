import { RolesBuilder } from 'nest-access-control';
import { Role } from './types';

export const RBCA_POLICY: RolesBuilder = new RolesBuilder();

const CLIENT: Role = 'CLIENT';
const BARBER: Role = 'BARBER';
const ADMIN: Role = 'ADMIN';

RBCA_POLICY.grant(CLIENT)
  .readOwn('userData')
  .updateOwn('userData')
  .grant(BARBER)
  .extend('CLIENT')
  .read('UserRole')
  .grant(ADMIN)
  .extend('BARBER')
  .read('userData')
  .update('userData')
  .delete('userData')
  .update('userRole')
  .create('createBarber');
