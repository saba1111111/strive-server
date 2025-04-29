import { HttpException, HttpStatus } from '@nestjs/common';

export class AlreadyStartedCampaignCanNotMutateException extends HttpException {
  constructor(campaignName: string, currentStatus: string) {
    const errorMessage = `Campaign ${campaignName} with status ${currentStatus} can not be mutated.`;
    super(errorMessage, HttpStatus.CONFLICT);
  }
}
