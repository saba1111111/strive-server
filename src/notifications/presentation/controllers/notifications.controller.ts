import { Body, Controller, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FailedResponseDto } from 'src/common/presentation/dto';
import { SendNotificationDto } from '../dto/send-notification.dto';
import { SendNotificationUseCase } from 'src/notifications/application/use-cases/send-notification.use-case';

@Controller('notifications')
@ApiTags('notifications')
export class NotificationsController {
  constructor(private readonly sendNotificationUseCase: SendNotificationUseCase) {}

  @Post()
  @ApiOperation({ summary: 'Send Notification!' })
  @ApiBody({ type: SendNotificationDto })
  @ApiCreatedResponse({
    description: 'Send notification successfully!',
    type: Boolean,
  })
  @ApiBadRequestResponse({
    description: 'Validation failed',
    type: FailedResponseDto,
  })
  public async addSubscriber(@Body() data: SendNotificationDto) {
    return this.sendNotificationUseCase.execute(data);
  }
}
