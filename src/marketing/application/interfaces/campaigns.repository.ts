import { Campaign, CampaignWithAdminInfo } from 'src/marketing/domain/model';
import { TCreateCampaign, TEditCampaignQuery } from '../types';
import { TGetPaginatedDataQuery, TGetPaginatedDataResult } from 'src/common/application/types';

export interface ICampaignsRepository {
  findOne(id: number): Promise<Campaign>;
  create(campaign: TCreateCampaign): Promise<Campaign>;
  findAll(options: TGetPaginatedDataQuery): Promise<TGetPaginatedDataResult<CampaignWithAdminInfo>>;
  edit(id: number, campaignData: TEditCampaignQuery): Promise<Campaign>;
  delete(id: number): Promise<boolean>;
  findActiveCampaign(): Promise<Campaign>;
  findCampaignWhichNeedToStart(): Promise<Campaign>;
}
