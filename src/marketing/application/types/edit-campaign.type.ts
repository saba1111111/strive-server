import { CampaignStatus } from 'src/marketing/domain/enum';
import { TCreateCampaign } from './create-campaign.type';

export type TEditCampaignQuery = Partial<TCreateCampaign & { status: CampaignStatus }>;
