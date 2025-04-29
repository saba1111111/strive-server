import { CampaignStatus } from '../enum';

export class Campaign {
  id: number;
  internalName: string;
  internalDescription: string;
  publicTitle: string;
  publicMessage: string;
  startAt: Date;
  endAt: Date;
  adminId: number;
  status: CampaignStatus;
}

export class CampaignWithAdminInfo extends Campaign {
  adminEmail: string;
}
