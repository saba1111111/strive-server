import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber } from 'class-validator';

export class SubscriberDto {
  @ApiProperty({ example: '2Tg2B@example.com' })
  @IsEmail()
  email: string;

  @IsNumber()
  @ApiProperty({ example: '1' })
  id: string;
}
