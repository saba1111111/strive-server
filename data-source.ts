import { DataSource } from 'typeorm';
import 'dotenv/config';
import {
  AdminEntity,
  CampaignEntity,
  SubscriberEntity,
} from './src/marketing/infrastructure/persistence/entities';

export default new DataSource({
  type: 'postgres',
  host:
    process.env.node_env === 'local' ? 'localhost' : process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [SubscriberEntity, AdminEntity, CampaignEntity],
  migrations: ['migrations/*.ts'],
  synchronize: false,
  logging: false,
});
