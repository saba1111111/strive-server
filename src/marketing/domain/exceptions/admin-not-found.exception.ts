import { HttpException, HttpStatus } from '@nestjs/common';

export class AdminNotFoundException extends HttpException {
  constructor(email: string) {
    const errorMessage = `Admin with email ${email} not found.`;
    super(errorMessage, HttpStatus.NOT_FOUND);
  }
}
