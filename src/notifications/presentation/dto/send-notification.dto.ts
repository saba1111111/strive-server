import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { NotificationTriggers } from 'src/notifications/domain';

export class SendNotificationDto {
  @IsString()
  @ApiProperty({ example: 'dadafafaffafafafafafagdgdgdgdgdgd' })
  to: string;

  @ApiProperty({
    example: NotificationTriggers.LIMIT_EXCEEDED,
    enum: NotificationTriggers,
    enumName: 'NotificationTriggers',
    required: true,
  })
  @IsString()
  triggerEvent: NotificationTriggers;
}
