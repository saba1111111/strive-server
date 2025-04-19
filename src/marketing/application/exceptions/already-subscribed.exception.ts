import { HttpException, HttpStatus } from '@nestjs/common';

export class AlreadySubscribedException extends HttpException {
  constructor(email: string) {
    const errorMessage = `${email} is already subscribed!`;
    super(errorMessage, HttpStatus.CONFLICT);
  }
}
