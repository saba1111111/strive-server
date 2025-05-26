import { HttpException, HttpStatus } from '@nestjs/common';

export class AllModelsFailedException extends HttpException {
  constructor() {
    const errorMessage = `All models failed to generate response.`;
    super(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
