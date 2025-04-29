import { Inject, Injectable } from '@nestjs/common';
import { handleError } from 'src/common/application/utils';
import { ISubscribersRepository } from '../../interfaces';
import { MarketingTokens } from '../../enum';

@Injectable()
export class GetSubscribersUseCase {
  constructor(
    @Inject(MarketingTokens.SUBSCRIBERS_REPOSITORY)
    private readonly subscribersRepository: ISubscribersRepository,
  ) {}

  public async execute(data: { page: number; limit: number }) {
    const { page, limit } = data;

    try {
      const { items, total } = await this.subscribersRepository.findAll({
        page,
        limit,
      });

      return { subscribers: items, total, page, limit };
    } catch (error) {
      handleError(error);
    }
  }
}
