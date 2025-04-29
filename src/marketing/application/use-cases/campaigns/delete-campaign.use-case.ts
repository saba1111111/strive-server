import { Inject, Injectable } from '@nestjs/common';
import { MarketingTokens } from '../../enum';
import { ICampaignsRepository } from '../../interfaces';
import { handleError } from 'src/common/application/utils';
import { TAdminWithoutSensitiveInfo } from '../../types';
import { CampaignValidator } from 'src/marketing/domain/services';

@Injectable()
export class DeleteCampaignUseCase {
  constructor(
    @Inject(MarketingTokens.CAMPAIGNS_REPOSITORY)
    private readonly campaignsRepository: ICampaignsRepository,
  ) {}

  public async execute(
    campaignId: number,
    admin: TAdminWithoutSensitiveInfo,
  ): Promise<boolean> {
    try {
      const campaign = await this.campaignsRepository.findOne(campaignId);
      CampaignValidator.validateCanMutate(campaign, campaignId);

      await this.campaignsRepository.delete(campaignId);

      console.info(`Admin ${admin.email} delete campaign ${campaignId}`, {
        campaign,
      });

      return true;
    } catch (error) {
      handleError(error);
    }
  }
}
