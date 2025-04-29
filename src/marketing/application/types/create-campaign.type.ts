export type TCreateCampaign = {
  internalName: string;
  internalDescription: string;
  publicTitle: string;
  publicMessage: string;
  startAt: Date;
};

export type TCreateCampaignRepository = TCreateCampaign & {
  endAt?: Date;
  adminId: number;
};
