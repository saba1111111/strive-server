import { ApiProperty } from '@nestjs/swagger';

export class AddSubscriberResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: '2Tg2B@example.com' })
  email: string;

  @ApiProperty({ example: '+995599999999' })
  phone?: string;

  @ApiProperty({ example: '2022-01-01T00:00:00.000Z' })
  subscribedAt: Date;
}
