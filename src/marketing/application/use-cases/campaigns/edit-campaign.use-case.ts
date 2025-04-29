import { Inject, Injectable } from '@nestjs/common';
import { TAdminWithoutSensitiveInfo, TEditCampaignQuery } from '../../types';
import { Campaign } from 'src/marketing/domain/model';
import { handleError } from 'src/common/application/utils';
import { MarketingTokens } from '../../enum';
import { ICampaignsRepository } from '../../interfaces';
import { CampaignValidator } from 'src/marketing/domain/services';

@Injectable()
export class EditCampaignUseCase {
  constructor(
    @Inject(MarketingTokens.CAMPAIGNS_REPOSITORY)
    private readonly campaignsRepository: ICampaignsRepository,
  ) {}

  public async execute(
    campaignId: number,
    data: TEditCampaignQuery,
    admin: TAdminWithoutSensitiveInfo,
  ): Promise<{ campaign: Campaign }> {
    try {
      const campaign = await this.campaignsRepository.findOne(campaignId);
      CampaignValidator.validateCanMutate(campaign, campaignId);

      const updatedCampaign = await this.campaignsRepository.edit(
        campaignId,
        data,
      );

      console.info(`Admin ${admin.email} updated campaign ${campaignId}`, {
        data,
      });

      return { campaign: updatedCampaign };
    } catch (error) {
      handleError(error);
    }
  }
}
