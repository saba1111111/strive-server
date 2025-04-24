import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AdminEntity,
  SubscriberEntity,
} from './infrastructure/persistence/entities';
import { MarketingTokens } from './application/enum';
import { SubscribersTypeormRepository } from './infrastructure/persistence/repositories/subscribers.typeorm.repository';
import {
  AddSubscriberUseCase,
  AdminLoginUseCase,
} from './application/use-cases';
import { MarketingController } from './presentation/controllers';
import { CommonModule } from 'src/common/common.module';
import { AdminsTypeormRepository } from './infrastructure/persistence/repositories';
import { AdminsController } from './presentation/controllers/admins.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([SubscriberEntity, AdminEntity]),
    CommonModule,
  ],
  controllers: [MarketingController, AdminsController],
  providers: [
    {
      provide: MarketingTokens.SUBSCRIBERS_REPOSITORY,
      useClass: SubscribersTypeormRepository,
    },
    {
      provide: MarketingTokens.ADMINS_REPOSITORY,
      useClass: AdminsTypeormRepository,
    },
    AddSubscriberUseCase,
    AdminLoginUseCase,
  ],
})
export class MarketingModule {}
