import { Subscriber } from 'src/marketing/domain/model';

export interface ISubscribersRepository {
  save(subscriber: {
    email: string;
    phone?: string;
  }): Promise<Subscriber | null>;

  findOneByEmail(email: string): Promise<Subscriber | null>;

  findAll(options: { page: number; limit: number }): Promise<{
    items: Subscriber[];
    total: number;
  }>;
}
