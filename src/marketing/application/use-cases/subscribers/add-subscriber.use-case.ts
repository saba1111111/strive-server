import { Subscriber } from 'src/marketing/domain/model';
import { handleError } from 'src/common/application/utils';
import { Inject, Injectable } from '@nestjs/common';
import { MarketingTokens } from '../../enum';
import { ISubscribersRepository } from '../../interfaces';
import { AlreadySubscribedException, SubscriptionFailedException } from '../../../domain/exceptions';

@Injectable()
export class AddSubscriberUseCase {
  constructor(
    @Inject(MarketingTokens.SUBSCRIBERS_REPOSITORY)
    private readonly subscribersRepository: ISubscribersRepository,
  ) {}

  async execute(data: { email: string; phone?: string }): Promise<Subscriber> {
    try {
      const subscriber = await this.subscribersRepository.findOneByEmail(data.email);
      if (subscriber) {
        throw new AlreadySubscribedException(data.email);
      }

      const result = await this.subscribersRepository.save(data);

      if (!result) {
        throw new SubscriptionFailedException(data.email);
      }

      return result;
    } catch (error) {
      handleError(error);
    }
  }
}
