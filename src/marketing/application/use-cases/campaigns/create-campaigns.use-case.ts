import { Inject, Injectable } from '@nestjs/common';
import { MarketingTokens } from '../../enum';
import { ICampaignsRepository } from '../../interfaces';
import {
  TAdminWithoutSensitiveInfo,
  TCreateCampaign,
  TCreateCampaignRepository,
} from '../../types';
import { handleError } from 'src/common/application/utils';
import { CampaignWithAdminInfo } from 'src/marketing/domain/model';

@Injectable()
export class CreateCampaignsUseCase {
  constructor(
    @Inject(MarketingTokens.CAMPAIGNS_REPOSITORY)
    private readonly campaignsRepository: ICampaignsRepository,
  ) {}

  public async execute(
    campaign: TCreateCampaign,
    admin: TAdminWithoutSensitiveInfo,
  ): Promise<{ campaign: CampaignWithAdminInfo }> {
    try {
      const fullCampaignData: TCreateCampaignRepository = {
        ...campaign,
        startAt: campaign.startAt,
        adminId: admin.id,
      };

      const newCampaign =
        await this.campaignsRepository.create(fullCampaignData);

      return {
        campaign: {
          ...newCampaign,
          adminEmail: admin.email,
        },
      };
    } catch (error) {
      handleError(error);
    }
  }
}
