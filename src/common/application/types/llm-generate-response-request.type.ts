import { LlmMessageRoles, LlmModels } from '../enum';

export type TLlmGenerateResponseRequest = {
  model: LlmModels;
  messages: { role: LlmMessageRoles; content: string }[];
};
