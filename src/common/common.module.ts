import { Module } from '@nestjs/common';
import { SharedTokens } from './application/enum';
import { MailSenderService } from './infrastructure/messageSenderProviders';
import { BcryptService } from './infrastructure/bcrypt.service';
import { JwtService } from './infrastructure/custom-jwt.service';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: SharedTokens.MAIL_SENDER_PROVIDER,
      useClass: MailSenderService,
    },
    {
      provide: SharedTokens.HASH_SERVICE_PROVIDER,
      useClass: BcryptService,
    },
    {
      provide: SharedTokens.TOKEN_SERVICE_PROVIDER,
      useClass: JwtService,
    },
  ],
  exports: [
    SharedTokens.MAIL_SENDER_PROVIDER,
    SharedTokens.HASH_SERVICE_PROVIDER,
    SharedTokens.TOKEN_SERVICE_PROVIDER,
  ],
})
export class CommonModule {}
