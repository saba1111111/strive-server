import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarketingModule } from './marketing/marketing.module';
import {
  AdminEntity,
  CampaignEntity,
  LlmResponseEntity,
  SubscriberEntity,
} from './marketing/infrastructure/persistence/entities';
import { HealthController } from './health.controller';
import { TerminusModule } from '@nestjs/terminus';
import { JwtModule } from '@nestjs/jwt';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TerminusModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [],
      useFactory: (cfg: ConfigService) => ({
        type: 'postgres',
        host: cfg.get('POSTGRES_HOST'),
        port: +cfg.get<number>('POSTGRES_PORT'),
        username: cfg.get('POSTGRES_USER'),
        password: cfg.get('POSTGRES_PASSWORD'),
        database: cfg.get('POSTGRES_DB'),
        entities: [SubscriberEntity, AdminEntity, CampaignEntity, LlmResponseEntity],
        synchronize: false,
        migrations: [__dirname + '/../migrations/*{.ts,.js}'],
        migrationsRun: true,
      }),
      inject: [ConfigService],
    }),
    MarketingModule,
    JwtModule.register({
      global: true,
    }),
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
