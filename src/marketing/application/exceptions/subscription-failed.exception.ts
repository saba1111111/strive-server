import { HttpException, HttpStatus } from '@nestjs/common';

export class SubscriptionFailedException extends HttpException {
  constructor(email: string) {
    const errorMessage = `Failed to subscribe ${email}.`;
    super(errorMessage, HttpStatus.BAD_REQUEST);
  }
}
