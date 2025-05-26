import { LlmModels } from 'src/common/application/enum';

export type TAskModelsRequest = {
  models: LlmModels[];
  prompt: string;
};
