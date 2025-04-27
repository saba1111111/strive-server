import { ApiProperty } from '@nestjs/swagger';
import { SubscriberDto } from './subscriber.dto';

export class GetSubscribersResponseDto {
  @ApiProperty({
    type: [SubscriberDto],
    description: 'List of subscribers for this page',
  })
  subscribers: SubscriberDto[];

  @ApiProperty({
    description: 'Total number of subscribers',
    example: 150,
  })
  total: number;

  @ApiProperty({
    description: 'Current page number',
    example: 1,
  })
  page: number;

  @ApiProperty({
    description: 'Maximum number of items returned per page',
    example: 20,
  })
  limit: number;
}
