import { LlmModels } from 'src/common/application/enum';

export type TSaveLlmResponseRequest = {
  adminId: number;
  prompt: string;
  response: string;
  model: LlmModels;
};
