import { CampaignStatus } from '../enum';
import {
  AlreadyStartedCampaignCanNotMutateException,
  CampaignNotFoundException,
} from '../exceptions';
import { Campaign } from '../model';

export class CampaignValidator {
  static validateCanMutate(campaign: Campaign, campaignId: number): void {
    if (!campaign) {
      throw new CampaignNotFoundException(campaignId);
    }

    if (campaign.status !== CampaignStatus.NotStarted) {
      throw new AlreadyStartedCampaignCanNotMutateException(
        campaign.internalName,
        campaign.status,
      );
    }
  }
}
