import { ApiProperty } from '@nestjs/swagger';
import { CampaignDto } from './campaign.dto';

export class CreateCampaignResponseDto {
  @ApiProperty({
    type: CampaignDto,
    description: 'The newly created campaign',
  })
  campaign: CampaignDto;
}
