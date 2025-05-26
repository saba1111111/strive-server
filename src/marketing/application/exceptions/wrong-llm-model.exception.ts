import { HttpException, HttpStatus } from '@nestjs/common';

export class WrongLlmModelException extends HttpException {
  constructor(model: string) {
    const errorMessage = `Llm model ${model} is not supported.`;
    super(errorMessage, HttpStatus.BAD_REQUEST);
  }
}
