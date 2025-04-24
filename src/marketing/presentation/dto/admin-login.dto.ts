import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class AdminLoginDto {
  @ApiProperty({ example: '2Tg2B@example.com' })
  @IsEmail()
  email: string;

  @IsString()
  @ApiProperty({ example: 'securePassword' })
  password: string;
}
