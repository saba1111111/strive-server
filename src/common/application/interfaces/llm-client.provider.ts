import { TLlmGeneratedResponse } from '../types';
import { TLlmGenerateResponseRequest } from '../types/llm-generate-response-request.type';

export interface ILlmClientProvider {
  generateResponse(data: TLlmGenerateResponseRequest): Promise<TLlmGeneratedResponse>;
}
