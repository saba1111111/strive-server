import { TGetPaginatedDataQuery } from 'src/common/application/types';
import { TSaveLlmResponseRequest } from '../types';
import { LlmResponseWithAdminInfo } from 'src/marketing/domain/model/llm-response.model';

export interface ILlmResponsesRepository {
  addResponses(data: TSaveLlmResponseRequest[]): Promise<boolean>;
  findAll(options: TGetPaginatedDataQuery): Promise<{ items: LlmResponseWithAdminInfo[]; total: number }>;
}
