import { ApiProperty } from '@nestjs/swagger';

export class CountSubscribersResponseDto {
  @ApiProperty({
    description: 'Total number of subscribers',
    example: 150,
  })
  numberOfSubscribers: number;
}
