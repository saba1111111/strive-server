import { Inject, Injectable } from '@nestjs/common';
import { handleError } from 'src/common/application/utils';
import { ISubscribersRepository } from '../../interfaces';
import { MarketingTokens } from '../../enum';

@Injectable()
export class CountSubscribersUseCase {
  constructor(
    @Inject(MarketingTokens.SUBSCRIBERS_REPOSITORY)
    private readonly subscribersRepository: ISubscribersRepository,
  ) {}

  public async execute(): Promise<{ numberOfSubscribers: number }> {
    try {
      const count = await this.subscribersRepository.countAll();

      return { numberOfSubscribers: count };
    } catch (error) {
      handleError(error);
    }
  }
}
