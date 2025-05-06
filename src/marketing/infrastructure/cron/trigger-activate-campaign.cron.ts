import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { TriggerActivateCampaignUseCase } from 'src/marketing/application/use-cases';

@Injectable()
export class TriggerActivateCampaignCron {
  private readonly logger = new Logger(TriggerActivateCampaignCron.name);

  constructor(private readonly triggerActivateCampaignUseCase: TriggerActivateCampaignUseCase) {}

  @Cron('* * * * *') // every minute
  handleCron() {
    this.triggerActivateCampaignUseCase.execute();
  }
}
