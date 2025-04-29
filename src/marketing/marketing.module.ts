import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AdminEntity,
  CampaignEntity,
  SubscriberEntity,
} from './infrastructure/persistence/entities';
import { MarketingTokens } from './application/enum';
import { SubscribersTypeormRepository } from './infrastructure/persistence/repositories/subscribers.typeorm.repository';
import {
  AddSubscriberUseCase,
  AdminLoginUseCase,
  CountSubscribersUseCase,
  CreateCampaignsUseCase,
  DeleteCampaignUseCase,
  EditCampaignUseCase,
  GetAdminInfoUseCase,
  GetCampaignsUseCase,
  GetSubscribersUseCase,
} from './application/use-cases';
import { MarketingController } from './presentation/controllers';
import { CommonModule } from 'src/common/common.module';
import { AdminsTypeormRepository } from './infrastructure/persistence/repositories';
import { CmsController } from './presentation/controllers/cms.controller';
import { CampaignsTypeormRepository } from './infrastructure/persistence/repositories/campaigns.typorm.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([SubscriberEntity, AdminEntity, CampaignEntity]),
    CommonModule,
  ],
  controllers: [MarketingController, CmsController],
  providers: [
    {
      provide: MarketingTokens.SUBSCRIBERS_REPOSITORY,
      useClass: SubscribersTypeormRepository,
    },
    {
      provide: MarketingTokens.ADMINS_REPOSITORY,
      useClass: AdminsTypeormRepository,
    },
    {
      provide: MarketingTokens.CAMPAIGNS_REPOSITORY,
      useClass: CampaignsTypeormRepository,
    },
    AddSubscriberUseCase,
    AdminLoginUseCase,
    GetAdminInfoUseCase,
    GetSubscribersUseCase,
    CountSubscribersUseCase,
    CreateCampaignsUseCase,
    GetCampaignsUseCase,
    EditCampaignUseCase,
    DeleteCampaignUseCase,
  ],
})
export class MarketingModule {}
