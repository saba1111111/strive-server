import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenAiSdkService } from './openAi-sdk.service';

@Injectable()
export class DeepSeekService extends OpenAiSdkService {
  constructor(private readonly configService: ConfigService) {
    super(configService.get<string>('DEEPSEEK_API_KEY'), 'https://api.deepseek.com/v1');
  }
}
