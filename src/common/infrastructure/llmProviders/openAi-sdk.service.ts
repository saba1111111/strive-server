import { ILlmClientProvider } from 'src/common/application/interfaces';
import OpenAI from 'openai';
import { TLlmGeneratedResponse } from 'src/common/application/types';
import { TLlmGenerateResponseRequest } from 'src/common/application/types/llm-generate-response-request.type';

export class OpenAiSdkService implements ILlmClientProvider {
  private client: OpenAI;
  private baseUrl = '';

  constructor(apiKey: string, baseUrl?: string) {
    this.baseUrl = baseUrl;
    this.client = new OpenAI({
      apiKey,
      baseURL: baseUrl,
    });
  }

  public async generateResponse(data: TLlmGenerateResponseRequest): Promise<TLlmGeneratedResponse> {
    try {
      const completion = await this.client.chat.completions.create({
        model: data.model,
        store: false,
        messages: data.messages,
      });

      return {
        id: completion.id,
        message: completion.choices[0].message.content,
        model: data.model,
      };
    } catch (error) {
      console.log(`LLM (${this.baseUrl}) API generateResponse error:`, error);
      throw error;
    }
  }
}
