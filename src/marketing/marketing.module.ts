import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriberEntity } from './infrastructure/persistence/entities';
import { Tokens } from './application/enum';
import { SubscriberTypeormRepository } from './infrastructure/persistence/repositories/subscriber.typeorm.repository';
import { AddSubscriberUseCase } from './application/use-cases';
import { MarketingController } from './presentation/controllers';

@Module({
  imports: [TypeOrmModule.forFeature([SubscriberEntity])],
  controllers: [MarketingController],
  providers: [
    {
      provide: Tokens.SUBSCRIBERS_REPOSITORY,
      useClass: SubscriberTypeormRepository,
    },
    AddSubscriberUseCase,
  ],
})
export class MarketingModule {}
