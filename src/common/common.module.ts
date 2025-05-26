import { Module } from '@nestjs/common';
import { SharedTokens } from './application/enum';
import { MailSenderService } from './infrastructure/messageSenderProviders';
import { BcryptService } from './infrastructure/bcrypt.service';
import { JwtService } from './infrastructure/custom-jwt.service';
import { DeepSeekService, OpenAiService } from './infrastructure/llmProviders';

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
    {
      provide: SharedTokens.LLM_CLIENT_OPENAI_PROVIDER,
      useClass: OpenAiService,
    },
    {
      provide: SharedTokens.LLM_CLIENT_DEEPSEEK_PROVIDER,
      useClass: DeepSeekService,
    },
  ],
  exports: [
    SharedTokens.MAIL_SENDER_PROVIDER,
    SharedTokens.HASH_SERVICE_PROVIDER,
    SharedTokens.TOKEN_SERVICE_PROVIDER,
    SharedTokens.LLM_CLIENT_OPENAI_PROVIDER,
    SharedTokens.LLM_CLIENT_DEEPSEEK_PROVIDER,
  ],
})
export class CommonModule {}
