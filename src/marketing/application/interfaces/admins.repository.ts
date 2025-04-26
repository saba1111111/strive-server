import { Admin } from 'src/marketing/domain/model';

export interface IAdminsRepository {
  findOneByEmail(email: string): Promise<Admin | null>;
  findOneById(id: number): Promise<Exclude<Admin, 'password'> | null>;
}
