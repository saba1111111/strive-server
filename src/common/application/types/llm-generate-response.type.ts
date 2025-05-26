import { LlmModels } from '../enum';

export type TLlmGeneratedResponse = {
  id: string;
  message: string;
  model: LlmModels;
};
