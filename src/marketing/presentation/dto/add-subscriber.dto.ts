import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class AddSubscriberDto {
  @ApiProperty({ example: '2Tg2B@example.com' })
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: '+995599999999' })
  phone?: string;
}
