import { Inject, Injectable } from '@nestjs/common';
import { handleError } from 'src/common/application/utils';
import { MarketingTokens } from '../../enum';
import { ICampaignsRepository } from '../../interfaces';

@Injectable()
export class GetCampaignsUseCase {
  constructor(
    @Inject(MarketingTokens.CAMPAIGNS_REPOSITORY)
    private readonly campaignsRepository: ICampaignsRepository,
  ) {}

  public async execute(data: { page: number; limit: number }) {
    const { page, limit } = data;

    try {
      const { items, total } = await this.campaignsRepository.findAll({
        page,
        limit,
      });

      return { campaigns: items, total, page, limit };
    } catch (error) {
      handleError(error);
    }
  }
}
