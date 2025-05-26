import { Inject, Injectable, Logger } from '@nestjs/common';
import { LlmModels, SharedTokens } from 'src/common/application/enum';
import { ILlmClientProvider } from 'src/common/application/interfaces';
import { TAdminWithoutSensitiveInfo, TAskModelsRequest } from '../../types';
import { TLlmGeneratedResponse } from 'src/common/application/types';
import { TLlmGenerateResponseRequest } from 'src/common/application/types/llm-generate-response-request.type';
import { LlmMessageRoles } from 'src/common/application/enum';
import { AllModelsFailedException, WrongLlmModelException } from '../../exceptions';
import { MarketingTokens } from '../../enum';
import { ILlmResponsesRepository } from '../../interfaces';

@Injectable()
export class AskModelsUseCase {
  private readonly logger = new Logger(AskModelsUseCase.name);
  private readonly availableLLMProviders: Record<LlmModels, ILlmClientProvider>;

  constructor(
    @Inject(SharedTokens.LLM_CLIENT_OPENAI_PROVIDER)
    private readonly openAIProvider: ILlmClientProvider,
    @Inject(SharedTokens.LLM_CLIENT_DEEPSEEK_PROVIDER)
    private readonly deepSeekProvider: ILlmClientProvider,
    @Inject(MarketingTokens.LLM_RESPONSES_REPOSITORY)
    private readonly llmResponsesRepository: ILlmResponsesRepository,
  ) {
    this.availableLLMProviders = {
      [LlmModels.deepseekChat]: this.deepSeekProvider,
      [LlmModels.gpt4Point1nano]: this.openAIProvider,
    };
  }

  public async execute(data: TAskModelsRequest, admin: TAdminWithoutSensitiveInfo): Promise<TLlmGeneratedResponse[]> {
    for (const model of data.models) {
      if (!this.availableLLMProviders[model]) {
        this.logger.error(`No provider configured for model "${model}"`);
        throw new WrongLlmModelException(model);
      }
    }

    const requests = data.models.map((model) => {
      const provider = this.availableLLMProviders[model];
      const payload: TLlmGenerateResponseRequest = {
        model,
        messages: [{ role: LlmMessageRoles.system, content: data.prompt }],
      };
      return provider.generateResponse(payload);
    });
    const responses = await Promise.allSettled(requests);

    const result = responses.map((response) => {
      if (response.status === 'fulfilled') {
        return {
          id: response.value.id,
          message: response.value.message,
          model: response.value.model,
        };
      }
    });

    if (result.filter((response) => response).length === 0) {
      throw new AllModelsFailedException();
    }

    try {
      await this.llmResponsesRepository.addResponses(
        result.map((response) => ({
          adminId: admin.id,
          prompt: data.prompt,
          response: response.message,
          model: response.model,
        })),
      );
    } catch (error) {
      this.logger.error('Failed to save LLM responses', error);
    }

    return result;
  }
}
