import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { cert, initializeApp, getApps } from 'firebase-admin/app';
import { getMessaging } from 'firebase-admin/messaging';
import { IMessageSenderProvider } from 'src/common/application/interfaces';

@Injectable()
export class FirebasePushNotificationsService implements IMessageSenderProvider {
  private readonly logger = new Logger(FirebasePushNotificationsService.name);

  public constructor(private readonly configService: ConfigService) {
    const projectId = this.configService.get<string>('FIREBASE_PROJECT_ID');
    const privateKey = this.configService.get<string>('FIREBASE_PRIVATE_KEY');
    const clientEmail = this.configService.get<string>('FIREBASE_CLIENT_EMAIL');

    if (getApps().length === 0) {
      initializeApp({
        credential: cert({
          projectId,
          privateKey: privateKey.replace(/\\n/g, '\n'),
          clientEmail,
        }),
      });
      this.logger.log('Firebase Admin initialized.');
    }
  }

  async sendMessage(to: string, title: string, message: string, imageUrl?: string): Promise<boolean> {
    const payload = {
      token: to,
      notification: {
        title,
        body: message,
        imageUrl,
      },
      data: {
        icon: 'ic_notification',
      },
    };

    try {
      const response = await getMessaging().send(payload);
      this.logger.log(`Push notification sent: ${response}`);
      return true;
    } catch (error) {
      this.logger.error('Error sending push notification:', error);
      return false;
    }
  }
}
