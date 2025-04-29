import { ApiProperty } from '@nestjs/swagger';
import { BasePaginationResultDto } from 'src/common/presentation/dto';
import { CampaignDto } from './campaign.dto';

export class GetCampaignsResponseDto extends BasePaginationResultDto {
  @ApiProperty({
    type: [CampaignDto],
    description: 'List of subscribers for this page',
  })
  campaigns: CampaignDto[];
}
