import { Inject, Injectable } from '@nestjs/common';
import { handleError } from 'src/common/application/utils';
import { MarketingTokens } from '../../enum';
import { ILlmResponsesRepository } from '../../interfaces';

@Injectable()
export class GetLlmModelsResponsesUseCase {
  constructor(
    @Inject(MarketingTokens.LLM_RESPONSES_REPOSITORY)
    private readonly llmModelsResponsesRepository: ILlmResponsesRepository,
  ) {}

  public async execute(data: { page: number; limit: number }) {
    const { page, limit } = data;

    try {
      const { items, total } = await this.llmModelsResponsesRepository.findAll({
        page,
        limit,
      });

      return { responses: items, total, page, limit };
    } catch (error) {
      handleError(error);
    }
  }
}
