import { InjectRepository } from '@nestjs/typeorm';
import { AdminEntity } from '../entities';
import { Repository } from 'typeorm';
import { IAdminsRepository } from 'src/marketing/application/interfaces';
import { Admin } from 'src/marketing/domain/model';

export class AdminsTypeormRepository implements IAdminsRepository {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly repo: Repository<AdminEntity>,
  ) {}

  public async findOneByEmail(email: string): Promise<Admin | null> {
    const entity = await this.repo
      .createQueryBuilder('admins')
      .addSelect('admins.password')
      .where('admins.email = :email', { email })
      .getOne();

    return entity ? this.mapEntityToModel(entity) : null;
  }

  public async findOneById(id: number): Promise<Admin | null> {
    const entity = await this.repo.findOneBy({ id });

    return entity ? this.mapEntityToModel(entity) : null;
  }

  private mapEntityToModel(entity: AdminEntity): Admin {
    return {
      id: entity.id,
      email: entity.email,
      password: entity.password,
    };
  }
}
