import { InjectRepository } from '@nestjs/typeorm';
import { ISubscribersRepository } from 'src/marketing/application/interfaces';
import { Subscriber } from 'src/marketing/domain/model';
import { SubscriberEntity } from '../entities';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SubscribersTypeormRepository implements ISubscribersRepository {
  constructor(
    @InjectRepository(SubscriberEntity)
    private readonly repo: Repository<SubscriberEntity>,
  ) {}

  public async save(subscriber: {
    email: string;
    phone?: string;
  }): Promise<Subscriber | null> {
    const result = await this.repo.save(subscriber);

    return result ? this.mapEntityToModel(result) : null;
  }

  public async findOneByEmail(email: string): Promise<Subscriber | null> {
    const result = await this.repo.findOneBy({ email });

    return result ? this.mapEntityToModel(result) : null;
  }

  public async findAll({
    page,
    limit,
  }: {
    page: number;
    limit: number;
  }): Promise<{ items: Subscriber[]; total: number }> {
    const [entities, total] = await this.repo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    const items = entities.map((e) => this.mapEntityToModel(e));
    return { items, total };
  }

  public async countAll(): Promise<number> {
    return this.repo.count();
  }

  private mapEntityToModel(entity: SubscriberEntity): Subscriber {
    return {
      id: entity.id,
      email: entity.email,
      phone: entity.phone,
      subscribedAt: entity.createdAt,
    };
  }
}
