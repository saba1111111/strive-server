import { ApiProperty } from '@nestjs/swagger';
import { SubscriberDto } from './subscriber.dto';
import { BasePaginationResultDto } from 'src/common/presentation/dto';

export class GetSubscribersResponseDto extends BasePaginationResultDto {
  @ApiProperty({
    type: [SubscriberDto],
    description: 'List of subscribers for this page',
  })
  subscribers: SubscriberDto[];
}
