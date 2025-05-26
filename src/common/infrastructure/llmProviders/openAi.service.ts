import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenAiSdkService } from './openAi-sdk.service';

@Injectable()
export class OpenAiService extends OpenAiSdkService {
  constructor(private readonly configService: ConfigService) {
    super(configService.get<string>('OPENAI_API_KEY'), 'https://api.openai.com/v1');
  }
}
