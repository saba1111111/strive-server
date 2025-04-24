import { Admin } from 'src/marketing/domain/model';

export interface IAdminsRepository {
  findOneByEmail(email: string): Promise<Admin | null>;
}
