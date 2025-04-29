import { HttpException, HttpStatus } from '@nestjs/common';

export class CampaignNotFoundException extends HttpException {
  constructor(id: number) {
    const errorMessage = `Campaign with id ${id} not found.`;
    super(errorMessage, HttpStatus.NOT_FOUND);
  }
}
