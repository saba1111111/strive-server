import { Inject, Injectable } from '@nestjs/common';
import { MarketingTokens } from '../../enum';
import { ICampaignsRepository, ISubscribersRepository } from '../../interfaces';
import { handleError } from 'src/common/application/utils';
import { CampaignStatus } from 'src/marketing/domain/enum';
import { SharedTokens } from 'src/common/application/enum';
import { IMessageSenderProvider } from 'src/common/application/interfaces';
import { Campaign } from 'src/marketing/domain/model';

@Injectable()
export class TriggerActivateCampaignUseCase {
  constructor(
    @Inject(MarketingTokens.CAMPAIGNS_REPOSITORY)
    private readonly campaignsRepository: ICampaignsRepository,
    @Inject(MarketingTokens.SUBSCRIBERS_REPOSITORY)
    private readonly subscribersRepository: ISubscribersRepository,
    @Inject(SharedTokens.MAIL_SENDER_PROVIDER)
    private readonly messageSenderProvider: IMessageSenderProvider,
  ) {}

  public async execute() {
    try {
      const activeCampaign = await this.campaignsRepository.findActiveCampaign();
      if (activeCampaign) {
        console.info('There is an active campaign.');
        return;
      }

      const campaignWhichNeedToStart = await this.campaignsRepository.findCampaignWhichNeedToStart();
      if (!campaignWhichNeedToStart) {
        console.info('No campaign which need to start');
        return;
      }

      // TODO For now instead of triggering event, process here (This is because we don't have redis for queue)
      await this.startCampaign(campaignWhichNeedToStart);

      return;
    } catch (error) {
      handleError(error);
    }
  }

  private async startCampaign(campaign: Campaign) {
    try {
      await this.campaignsRepository.edit(campaign.id, {
        status: CampaignStatus.InProgress,
      });

      let page = 1;
      const limit = 50;

      while (true) {
        const { items: subscribers } = await this.subscribersRepository.findAll({ page, limit });
        console.log('subscribers', subscribers);

        if (subscribers.length === 0) break;

        const emailPromises = subscribers.map((subscriber) =>
          this.messageSenderProvider.sendMessage(subscriber.email, campaign.publicTitle, campaign.publicMessage),
        );
        const results = await Promise.allSettled(emailPromises);
        results.forEach((result, index) => {
          const subscriber = subscribers[index];
          if (result.status === 'rejected') {
            console.error(`❌ Failed to send message to ${subscriber.email}:`, result.reason);
          }
        });

        page++;
      }

      await this.campaignsRepository.edit(campaign.id, {
        status: CampaignStatus.Finished,
      });
    } catch (error) {
      await this.campaignsRepository.edit(campaign.id, {
        status: CampaignStatus.ErrorOccurred,
      });
      throw error;
    }
  }
}
