import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ArrayMinSize, IsEnum, IsString, IsNotEmpty } from 'class-validator';
import { LlmModels } from 'src/common/application/enum';

export class AskModelsDto {
  @ApiProperty({
    description: 'List of LLM model identifiers to query',
    enum: LlmModels,
    isArray: true,
    required: true,
  })
  @IsArray()
  @ArrayMinSize(1, { message: 'At least one model must be specified' })
  @IsEnum(LlmModels, { each: true, message: 'Each value must be a valid LlmModel' })
  models: LlmModels[];

  @ApiProperty({
    description: 'The prompt text to send to the language model',
    type: String,
    required: true,
  })
  @IsString()
  @IsNotEmpty({ message: 'Prompt must not be empty' })
  prompt: string;
}
