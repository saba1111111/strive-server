import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { NotificationsController } from './presentation/controllers/notifications.controller';
import { SendNotificationUseCase } from './application/use-cases/send-notification.use-case';

@Module({
  imports: [CommonModule],
  controllers: [NotificationsController],
  providers: [
    // useCases
    SendNotificationUseCase,
  ],
})
export class NotificationsModule {}
