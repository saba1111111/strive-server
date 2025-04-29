import { Admin } from 'src/marketing/domain/model';

export type TAdminWithoutSensitiveInfo = Exclude<Admin, 'password'>;
